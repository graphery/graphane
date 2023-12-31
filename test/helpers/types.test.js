import { test, expect } from '@playwright/test';

import {
  isObject, isString, isFunction, isNumber, isUndefined, isSymbol, isBoolean, isArray, isDate,
  isNull, array2attribute, attribute2array, attribute2arrayObject, attribute2object,
  object2attribute, str2value, isLikeArray, isLikeObject, csvStr2obj, jsStr2obj
} from '../../src/helpers/types.js';

const name = 'lib.types';

test.describe(name, () => {

  test('isObject', () => {
    expect(isObject({})).toBe(true);
    expect(isObject('')).toBe(false);
  });
  test('isString', () => {
    expect(isString('')).toBe(true);
    expect(isString({})).toBe(false);
  });
  test('isFunction', () => {
    expect(isFunction(function () {
    })).toBe(true);
    expect(isFunction({})).toBe(false);
  });
  test('isNumber', () => {
    expect(isNumber(10)).toBe(true);
    expect(isNumber(NaN)).toBe(false);
    expect(isNumber('10')).toBe(false);
  });
  test('isUndefined', () => {
    expect(isUndefined(undefined)).toBe(true);
    expect(isUndefined(null)).toBe(false);
  });
  test('isSymbol', () => {
    expect(isSymbol(Symbol())).toBe(true);
    expect(isSymbol({})).toBe(false);
  });
  test('isBoolean', () => {
    expect(isBoolean(true)).toBe(true);
    expect(isBoolean('true')).toBe(false);
  });
  test('isArray', () => {
    expect(isArray([])).toBe(true);
    expect(isArray({})).toBe(false);
  });
  test('isDate', () => {
    expect(isDate(new Date())).toBe(true);
    expect(isDate(new Date('wrong'))).toBe(false);
    expect(isDate('')).toBe(false);
  });
  test('isNull', () => {
    expect(isNull(null)).toBe(true);
    expect(isNull('')).toBe(false);
  });

  test('object2attribute', () => {
    const obj = {a : 1, b : 2, c : true, f : 'hello'};
    const str = object2attribute(obj);
    expect(str).toBe('a: 1; b: 2; c: true; f: hello');
  });
  test('attribute2object', () => {
    const str = 'a: 1; b: 2px; c: true; f: hello';
    const obj = attribute2object(str);
    expect(obj.a).toBe(1);
    expect(obj.b).toBe('2px');
    expect(obj.c).toBe(true);
    expect(obj.f).toBe('hello');
  });
  test('attribute2object separators', () => {
    const str = 'separator_a: ";"; separator_b:\',\'';
    const obj = attribute2object(str);
    expect(obj.separator_a).toBe(';');
    expect(obj.separator_b).toBe(',');
  });
  test('attribute2array', () => {
    const str = '1; 2px; true; hello';
    const obj = attribute2array(str);
    expect(obj[0]).toBe(1);
    expect(obj[1]).toBe('2px');
    expect(obj[2]).toBe(true);
    expect(obj[3]).toBe('hello');
  });
  test('attribute2array with subarray', () => {
    const str = '[1; 2px][true; hello]';
    const obj = attribute2array(str);
    expect(obj[0][0]).toBe(1);
    expect(obj[0][1]).toBe('2px');
    expect(obj[1][0]).toBe(true);
    expect(obj[1][1]).toBe('hello');
  });
  test('array2attribute', () => {
    const obj = [1, '2px', true, 'hello'];
    const str = array2attribute(obj);
    expect(str).toBe('1, 2px, true, hello');
  });
  test('array2attribute with subarray', () => {
    const obj = [[1, '2px'], [true, 'hello']];
    const str = array2attribute(obj);
    expect(str).toBe('[1, 2px], [true, hello]');
  });
  test('attribute2array with subarray with object', () => {
    const str = '[a: 1, b: 2px],[a: true, b: hello]';
    const obj = attribute2arrayObject(str);
    expect(obj[0].a).toBe(1);
    expect(obj[0].b).toBe('2px');
    expect(obj[1].a).toBe(true);
    expect(obj[1].b).toBe('hello');
  });

  test('str2value', () => {
    expect(str2value('"a"')).toBe('a',);
    expect(str2value('"a"', undefined, true)).toBe('"a"',);
    expect(str2value('\'a\'')).toBe('a',);
    expect(str2value('\'a\'', undefined, true)).toBe('"a"',);
    expect(str2value('true')).toBe(true,);
    expect(str2value('true', 'boolean')).toBe(true,);
    expect(str2value('true', undefined)).toBe(true);
    expect(str2value('false')).toBe(false,);
    expect(str2value('false', 'boolean')).toBe(false,);
    expect(str2value('false', undefined, true)).toBe(false,);
    expect(str2value('0', 'boolean')).toBe(false,);
    expect(str2value('', 'boolean')).toBe(false,);
    expect(str2value('1', 'boolean')).toBe(true,);
    expect(str2value('1024')).toBe(1024,);
    expect(str2value('1024', undefined, true)).toBe(1024,);
    expect(str2value('10.24')).toBe(10.24,);
    expect(str2value('10.24', undefined, true)).toBe(10.24,);
  });

  test('isLikeObject', () => {
    expect(isLikeObject(`{a: 1, b: true, c: "c"}`)).toBe(true);
    expect(isLikeObject(`{\r\n\ta: 1,\r\n\tb: true,\r\n\tc: 'c'}`)).toBe(true);
    expect(isLikeObject('{')).toBe(false);
    expect(isLikeObject('[]')).toBe(false);
  });
  test('isLikeArray', () => {
    expect(isLikeArray('[1,true,["c"]]')).toBe(true);
    expect(isLikeArray('[\r\n1,\r\ntrue,\r\n[\r\n\t"c"\r\n\t]\r\n]\r\n')).toBe(true);
    expect(isLikeArray('[')).toBe(false);
    expect(isLikeArray('{}')).toBe(false);
  });

  test('csvStr2obj simple', () => {
    const str = `
a,b,c
1,2,3
d,e,"f,g"
`;
    expect(csvStr2obj(str)).toStrictEqual([{a : 1, b : 2, c : 3}, {a : 'd', b : 'e', c : 'f,g'}])
  });


  test('csvStr2obj Excel', () => {
    const str = `
"a";"b";"c"
1;2;3
"d";"e";"f;"
`;
    expect(csvStr2obj(str)).toStrictEqual([{a : 1, b : 2, c : 3}, {a : 'd', b : 'e', c : 'f;'}])
  });

  test('jsStr2obj', () => {
    const str = `[{a:1,b:2,c:3},{a:'d',b:'e',c:'f;'}]`;
    expect(jsStr2obj(str)).toStrictEqual([{a : 1, b : 2, c : 3}, {a : 'd', b : 'e', c : 'f;'}])
  });

});
