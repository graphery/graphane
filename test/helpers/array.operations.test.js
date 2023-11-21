import { test, expect } from '@playwright/test';

import {
  operations
} from '../../src/helpers/array.operations.js';

const name = 'lib.array.operations';

test.describe(name, () => {

  test('array with numeric values', () => {
    const a = operations([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    expect(a.$min()).toBe(1);
    expect(a.$max()).toBe(10);
    expect(a.$count()).toBe(10);
    expect(a.$sum()).toBe(55);
    expect(a.$avg()).toBe(5.5);
    expect(a.$distinct()).toStrictEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  });

  test('array with duplicates', () => {
    const a = operations([1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10]);
    expect(a.$min()).toBe(1);
    expect(a.$max()).toBe(10);
    expect(a.$count()).toBe(20);
    expect(a.$sum()).toBe(110);
    expect(a.$avg()).toBe(5.5);
    expect(a.$distinct()).toStrictEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  });

  test('array with objects', () => {
    const b = operations([
      {x : {n : 1}},
      {x : {n : 2}},
      {x : {n : 3}},
      {x : {n : 4}},
      {x : {n : 5}},
      {x : {n : 6}},
      {x : {n : 7}},
      {x : {n : 8}},
      {x : {n : 9}},
      {x : {n : 10}}
    ]);
    expect(b.$min('x.n')).toBe(1);
    expect(b.$max('x.n')).toBe(10);
    expect(b.$avg('x.n')).toBe(5.5);
    expect(b.$count('x.n')).toBe(10);
    expect(b.$sum('x.n')).toBe(55);
    expect(b.$distinct('x.n')).toStrictEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  });

  test('array with objects with different keys', () => {
    const b = operations([
      {x : {n : 1}},
      {x : {n : 2}},
      {x : {n : 3}},
      {x : {n : 4}},
      {x : {n : 5}},
      {x : {n : 6}},
      {x : {n : 7}},
      {x : {n : 8}},
      {x : {n : 9}},
      {x : {y : 10}}, // different key
    ]);
    expect(b.$min('x.n')).toBe(1);
    expect(b.$max('x.n')).toBe(9);
    expect(b.$avg('x.n')).toBe(5);
    expect(b.$count('x.n')).toBe(9);
    expect(b.$sum('x.n')).toBe(45);
    expect(b.$distinct('x.n')).toStrictEqual([1, 2, 3, 4, 5, 6, 7, 8, 9]);
  });

  test('call with specific array', () => {
    const a = operations();
    expect(a.$min([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])).toBe(1);
    expect(a.$max([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])).toBe(10);
    expect(a.$count([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])).toBe(10);
    expect(a.$sum([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])).toBe(55);
    expect(a.$avg([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])).toBe(5.5);
    expect(a.$distinct([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])).toStrictEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  });

  test('call with specific array with objects', () => {
    const data = [
      {x : {n : 1}},
      {x : {n : 2}},
      {x : {n : 3}},
      {x : {n : 4}},
      {x : {n : 5}},
      {x : {n : 6}},
      {x : {n : 7}},
      {x : {n : 8}},
      {x : {n : 9}},
      {x : {y : 10}},
    ];
    const b = operations();
    expect(b.$min(data, 'x.n')).toBe(1);
    expect(b.$max(data, 'x.n')).toBe(9);
    expect(b.$avg(data, 'x.n')).toBe(5);
    expect(b.$count(data, 'x.n')).toBe(9);
    expect(b.$sum(data, 'x.n')).toBe(45);
    expect(b.$distinct(data, 'x.n')).toStrictEqual([1, 2, 3, 4, 5, 6, 7, 8, 9]);
  });

  test('overwrite methods', () => {
    const data = {
      $min() {
        return 'min'
      },
      $max() {
        return 'max'
      }
    };
    operations(data);
    expect(data.$min()).toBe('min');
    expect(data.$max()).toBe('max');
  });

});
