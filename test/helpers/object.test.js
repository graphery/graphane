import { test, expect } from '@playwright/test';

import {
  createOther, clone, walker, getProperty, Schema, equal
} from '../../src/helpers/objects.js';

const name = 'lib.object';

test.describe(name, () => {

  test('createOther', () => {
    const a = [1, 2, 3];
    const b = createOther(a);
    expect(Array.isArray(a)).toBe(true);
    expect(Array.isArray(b)).toBe(true);
  });
  test('clone array', () => {
    const a = [1, 2, 3];
    const b = clone(a);

    expect(Array.isArray(b)).toBe(true);
    expect(a[0] === b[0]).toBe(true);
    expect(a[1] === b[1]).toBe(true);
    expect(a[2] === b[2]).toBe(true);
    a[3] = 4;
    expect(a[3] !== b[3]).toBe(true);
  });
  test('clone array with objects', () => {
    const origin = [{a : 1}, {b : 2}, {c : 3}];
    const target = clone(origin);
    origin[0].a  = 2;
    expect(Array.isArray(target)).toBe(true);
    expect(origin[0].a !== target[0].a).toBe(true);
    expect(origin[0] !== target[0]).toBe(true);
    expect(origin[1].b === target[1].b).toBe(true);
    expect(origin[1] !== target[1]).toBe(true);
    expect(origin[2].c === target[2].c).toBe(true);
    expect(origin[2] !== target[2]).toBe(true);
    origin[3] = 4;
    expect(origin[3] !== target[3]).toBe(true);
  });
  test('clone deep object', () => {
    const origin = {a : {a : 1}, b : {b : 2}, c : {c : 3}};
    const target = clone(origin);
    origin.a.a   = 2;
    expect(origin.a.a !== target.a.a).toBe(true);
    expect(origin.a !== target.a).toBe(true);
    expect(origin.b.b === target.b.b).toBe(true);
    expect(origin.b.b !== target.b).toBe(true);
    expect(origin.c.c === target.c.c).toBe(true);
    expect(origin.c !== target.c).toBe(true);
    origin.d = 4;
    expect(origin.d !== target.d).toBe(true);
  });
  test('clone undefined', () => {
    const origin = undefined;
    const target = clone(origin);
    expect(origin === target).toBe(true);
    expect(typeof target === 'undefined').toBe(true);
    expect(target !== null).toBe(true);
  });
  test('Schema', () => {
    const schema = Schema({
      type       : Object,
      properties : {
        "a"         : {
          type : Number
        },
        "b"         : {
          type    : String,
          default : 2
        },
        "o"         : {
          type       : Object,
          properties : {
            a : {
              type    : String,
              default : 'a'
            },
            b : {
              type    : Boolean,
              default : 0
            }
          },
          default    : {}
        },
        n           : {
          type  : Array,
          items : {
            type : Number
          }
        },
        'z'         : {
          type  : Array,
          items : {
            type       : Object,
            properties : {
              "x" : {
                type : Number
              },
              "y" : {
                type    : Number,
                default : 10
              }
            }
          }
        },
        checkObject : {
          type       : Object,
          properties : {
            "x" : {
              type    : Number,
              default : 0
            },
            "y" : {
              type    : Number,
              default : 10
            }
          }
        },
        checkArray  : {
          type    : Array,
          default : []
        }
      }
    });
    let obj      = {
      a           : '1',
      n           : ['1', '2', '3'],
      z           : [{x : '1', y : '2'}, {x : '3'}],
      checkObject : 'hello',
      checkArray  : null
    };
    obj          = schema.normalize(obj);
    expect(typeof obj.a === 'number').toBe(true);
    expect(typeof obj.b === 'string').toBe(true);
    expect(typeof obj.o === 'object').toBe(true);
    expect(typeof obj.o.a === 'string').toBe(true);
    expect(typeof obj.o.b === 'boolean').toBe(true);
    expect(typeof obj.checkObject === 'object').toBe(true);
    expect(Array.isArray(obj.checkArray)).toBe(true);
    expect(obj.a === 1).toBe(true);
    expect(obj.b === '2').toBe(true);
    expect(obj.o.a === 'a').toBe(true);
    expect(obj.o.b === false).toBe(true);
    expect(obj.z[0].x === 1).toBe(true);
    expect(obj.z[0].y === 2).toBe(true);
    expect(obj.z[1].x === 3).toBe(true);
    expect(obj.z[1].y === 10).toBe(true);
    // test(obj);
  });
  test('walker', () => {
    const o      = {
      "a" : {
        "b" : {
          "c" : {
            "d" : [
              {e : 1},
              {f : 2}
            ]
          }
        }
      },
      g   : 2,
      h   : [1, 2, 3]
    }
    const result = [];
    walker(o, function (obj, key, value, root, keys) {
      result.push([keys.join('.'), value]);
    });
    for (let r of result) {
      expect(getProperty(o, r[0]) === r[1]).toBe(true);
    }
  });

  test.describe('equal', () => {
    test('must be a function', () => {
      expect(typeof equal).toBe('function');
    });
    test('should make strict comparison', () => {
      expect(equal("", "")).toBe(true);
      expect(!equal("Hello", "hello")).toBe(true);
      expect(equal("Hello", "Hello")).toBe(true);
      expect(equal(true, true)).toBe(true);
      expect(equal(false, false)).toBe(true);
      expect(!equal(true, false)).toBe(true);
      expect(!equal(true, 1)).toBe(true);
      expect(!equal(true, 0)).toBe(true);
      expect(!equal(true, "hello")).toBe(true);
      expect(!equal(true, '')).toBe(true);
      expect(!equal(false, 0)).toBe(true);
      expect(!equal(false, "")).toBe(true);
      expect(!equal(false, "hello")).toBe(true);
      expect(!equal(null, 0)).toBe(true);
      expect(equal(null, null)).toBe(true);
      expect(!equal(null, "null")).toBe(true);
      expect(equal(1, 1)).toBe(true);
      expect(!equal(1, 0)).toBe(true);
      expect(!equal(1, "1")).toBe(true);
      expect(!equal(1, "0")).toBe(true);
      expect(!equal(1.0001, 1.00009)).toBe(true);
      expect(equal(1.0001, 1.0001)).toBe(true);
      expect(!equal(1.0001, '1.00009')).toBe(true);
      expect(!equal(1.0001, '1.0001')).toBe(true);
      expect(equal(undefined, undefined)).toBe(true);
      expect(!equal(undefined, "")).toBe(true);
      expect(!equal(undefined, 1)).toBe(true);
      expect(!equal(undefined, false)).toBe(true);
      expect(!equal(undefined, null)).toBe(true);
      expect(!equal(undefined, {})).toBe(true);
    });
    test('NaN vs NaN should be true', () => {
      expect(equal(NaN, NaN)).toBe(true);
      expect(equal(NaN, NaN, {nonStrict : true})).toBe(true);
    });
    test('Date should be compared by its internal number', () => {
      const date1 = new Date();
      const date2 = date1;
      const date3 = new Date('2015-01-01');
      const date4 = new Date(date1.getTime());
      expect(equal(date1, date2)).toBe(true);
      expect(!equal(date1, date3)).toBe(true);
      expect(equal(date1, date4)).toBe(true);
    });
    test('Two simple objects should be compared by its properties', () => {
      const obj1 = {a : 0, b : 1, c : 3, d : 4, e : 5, f : 6, g : 7, h : 8, i : 9, j : 10, k : 11};
      const obj2 = obj1;
      const obj3 = {a : 1, b : 1, c : 3, d : 4, e : 5, f : 6, g : 7, h : 8, i : 9, j : 10, k : 11};
      const obj4 = {a : 0, b : 1, c : 3, d : 4, e : 5, f : 6, g : 7, h : 8, i : 9, j : 10, m : 11};
      const obj5 = {a : 0, b : 1, c : 3, d : 4, e : 5, f : 6, g : 7, h : 8, i : 9, j : 10, k : 11};
      expect(equal(obj1, obj2), " equal( obj1, obj2 )").toBe(true);
      expect(!equal(obj1, obj3), "!equal( obj1, obj3 )").toBe(true);
      expect(!equal(obj1, obj4), "!equal( obj1, obj4 )").toBe(true);
      expect(equal(obj1, obj5), " equal( obj1, obj5 )").toBe(true);
    });
    test('Two deep objects should be compared by its properties', () => {
      const nestedObject1 = {
        o1 : {a : 1, b : true, c : 'hello', d : {n : [99]}},
        o2 : [0, 1, 2, 3]
      };
      const nestedObject2 = nestedObject1;
      const nestedObject3 = {
        o1 : {a : 1, b : true, c : 'hello', d : {n : [100]}},
        o2 : [0, 1, 2, 3]
      };
      const nestedObject4 = {
        o1 : {a : 1, b : true, c : 'hello', d : {n : [99]}},
        o2 : [0, 1, 2, 3]
      };
      const nestedObject5 = Object.create(null);
      nestedObject5.o1    = {a : 1, b : true, c : 'hello'};
      nestedObject5.o1.d  = {n : [99]};
      nestedObject5.o2    = [0, 1, 2, 3];
      expect(equal(nestedObject1, nestedObject2), " equal( nestedObject1, nestedObject2 )").toBe(true);
      expect(!equal(nestedObject1, nestedObject3), "!equal( nestedObject1, nestedObject3 )").toBe(true);
      expect(equal(nestedObject1, nestedObject4), " equal( nestedObject1, nestedObject4 )").toBe(true);
      expect(equal(nestedObject1, nestedObject5), " equal( nestedObject1, nestedObject5 )").toBe(true);
    });
    test('Two simple arrays should be compared by its content', () => {
      const array1 = [0, 1, 3, 4, 5, 6, 7, 8, 9, 10, 11];
      const array2 = array1;
      const array3 = [0, 1, 3, 4, 5, 6, 7, 8, 9, 10, 10];
      const array4 = [0, 1, 3, 4, 5, 6, 7, 8, 9, 10];
      const array5 = [0, 1, 3, 4, 5, 6, 7, 8, 9, 10, 11];
      expect(equal(array1, array2)).toBe(true);
      expect(!equal(array1, array3)).toBe(true);
      expect(!equal(array1, array4)).toBe(true);
      expect(equal(array1, array5)).toBe(true);
      const tmpDate = new Date();
      const multi1  = [0, true, false, tmpDate, [0, 1, 2, 3], {a : 1}, 'hello', [[true, false], [{b : 2}, {b : 3}]]];
      const multi2  = multi1;
      const multi3  = [0, true, false, tmpDate, [0, 1, 2, 3], {a : 1}, 'hello', [[true, false], [{b : 2}, {b : 4}]]];
      const multi4  = [0, 1, 2, 3, 4, 5, 6, 7];
      const multi5  = [0, true, false, tmpDate, [0, 1, 2, 3], {a : 1}, 'hello', [[true, false], [{b : 2}, {b : 3}]]];
      expect(equal(multi1, multi2)).toBe(true);
      expect(!equal(multi1, multi3)).toBe(true);
      expect(!equal(multi1, multi4)).toBe(true);
      expect(equal(multi1, multi5)).toBe(true);
    });
    test('Two arrays should be compared by its content and properties', () => {
      const arrObj1    = [1, 2, 3, 4, 5];
      arrObj1.property = 'hello';
      const arrObj2    = [1, 2, 3, 4, 5];
      arrObj2.property = 'hello';
      const arrObj3    = [1, 2, 3, 4, 5];
      arrObj3.property = 'Bye';
      const arrObj4    = [1, 2, 3, 4, 5];
      expect(equal(arrObj1, arrObj2)).toBe(true);
      expect(!equal(arrObj1, arrObj3)).toBe(true);
      expect(!equal(arrObj1, arrObj4)).toBe(true);
    });
    test('Sparse array must be managed without problems', () => {
// jshint -W128
      const sparse1 = [0, , 3, , 5, , 7, , 9, , 11];
// jshint +W128
      const sparse2 = sparse1;
      const sparse3 = [0, 1, 3, 4, 5, 6, 7, 8, 9, 10];
      const sparse4 = [0, undefined, 3, undefined, 5, undefined, 7, undefined, 9, undefined, 11];
      const sparse5 = [0, 1, 3, 4, 5, 6, 7, 8, 9, 10, 11];
      delete sparse5[1];
      delete sparse5[3];
      delete sparse5[5];
      delete sparse5[7];
      delete sparse5[9];
      expect(equal(sparse1, sparse2)).toBe(true);
      expect(!equal(sparse1, sparse3)).toBe(true);
      expect(!equal(sparse1, sparse4)).toBe(true);
      expect(equal(sparse1, sparse5)).toBe(true);
    });
    test('An Array and an Array Like are equal', () => {
      const array10    = [0, 1, 2];
      const arrayLike1 = {'0' : 0, '1' : 1, '2' : 2};
      Object.defineProperty(arrayLike1, 'length', {
        enumerable   : false,
        configurable : false,
        writable     : true,
        value        : 3
      });
      const arrayLike2 = {'0' : 0, '1' : 1, '2' : 2, 'length' : 3};
      expect(equal(array10, arrayLike1)).toBe(true);
    });
    test('Object with enumerate and not enumerate properties', () => {
      const notEnumerable = {};
      Object.defineProperties(notEnumerable, {
        "a" : {value : 1, enumerable : false},
        "b" : {value : 2, enumerable : false},
        "c" : {value : 3, enumerable : false}
      });
      const empty      = {};
      const enumerable = {a : 1, b : 2, c : 3};
      expect(!equal(notEnumerable, enumerable)).toBe(true);
      expect(equal(notEnumerable, empty)).toBe(true);
      expect(!equal(enumerable, empty)).toBe(true);
    });
    test('Object with self reference (circular reference)', () => {
      const circular1 = {
        a : [1, 2, 3],
        b : new Date(2016, 11, 24),
        c : "Hello",
        d : {
          a : [1, 2, 3]
        }
      };
      circular1.e     = circular1;
      const circular2 = circular1;
      const circular3 = {
        a : [1, 2, 3],
        b : new Date(2016, 11, 24),
        c : "Hello",
        d : {
          a : [1, 2, 3]
        }
      };
      circular3.e     = circular3;
      const circular4 = {
        a : [1, 2, 3],
        b : new Date(2016, 11, 24),
        c : "Hello",
        d : {
          a : [1, 2, 3]
        },
        e : {}
      };
      expect(equal(circular1, circular2)).toBe(true);
      expect(equal(circular1, circular3)).toBe(true);
      expect(!equal(circular1, circular4)).toBe(true);
      const ref1  = {
        a : 1
      };
      const ref2  = {
        a : 1
      };
      const ref3  = {
        a : 1
      };
      ref1.parent = ref3;
      ref2.parent = ref1;
      ref3.parent = ref2;
      ref1.child  = ref2;
      ref2.child  = ref3;
      ref3.child  = ref1;
      expect(equal(ref1, ref2)).toBe(true);
    });
  });
});
