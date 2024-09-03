import { test, expect } from '@playwright/test';

import {
  createFunction,
  getFunctions
} from '../../src/helpers/function.create.js';

const name = 'lib.function.create';

test.describe(name, () => {

  test('simple function', () => {
    const args = [];
    const code = `
      return 10;
    `;
    const fn   = createFunction(args, code);
    expect(typeof fn).toBe('function');
    expect(fn()).toBe(10);
  });

  test('function with parameters', () => {
    const args = ['a', 'b'];
    const code = `
      return a + b;
    `;
    const fn   = createFunction(args, code);
    expect(typeof fn).toBe('function');
    expect(fn(4,6)).toBe(10);
  });

  test('get functions', () => {
    const globals = {'a': 4, 'b': 6};
    const code = `
      function sum() {
        return a + b;
      }
      function res() {
        return a - b;
      }
      function mul() {
        return a * b;
      }
      function div() {
        return a / b;
      }
    `;
    const calc   = getFunctions(globals, code);
    expect(typeof calc).toBe('object');
    expect(typeof calc.sum).toBe('function');
    expect(typeof calc.res).toBe('function');
    expect(typeof calc.mul).toBe('function');
    expect(typeof calc.div).toBe('function');
    expect(calc.sum()).toBe(10);
    expect(calc.res()).toBe(-2);
    expect(calc.mul()).toBe(24);
    expect(calc.div()).toBe(4/6);
  });

  test('get functions with anonymous', () => {
    const code = `
      const x = function x2 () { }; 
      const y = function () { }; 
      const z = Array(2).fill(0).map(function () {
           return 1 
         }); 
      function check() { 
         return z; 
      }`;
    const test   = getFunctions({}, code);
    expect(typeof test).toBe('object');
    expect(typeof test.x).toBe('undefined');
    expect(typeof test.y).toBe('undefined');
    expect(typeof test.z).toBe('undefined');
    expect(typeof test.check).toBe('function');
    expect(test.check()).toEqual([1,1]);
  });

  test('get functions with confused names', () => {
    const code = `
       /*
       function 0check (invalid)
       */
       // the function check
       function functionCheck () {
       }
       function _check$ () {
       }
       function checkѿ(){
       }
    `;
    const test   = getFunctions({}, code);
    expect(typeof test.check).toBe('undefined');
    expect(typeof test.functionCheck).toBe('function');
    expect(typeof test._check$).toBe('function');
    expect(typeof test.checkѿ).toBe('function');
  });


});
