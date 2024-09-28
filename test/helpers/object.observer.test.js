import { test, expect } from '@playwright/test';

import {
  objectObserver
} from '../../src/helpers/object.observer.js';

const name = 'lib.object.observe';

test.describe(name, () => {

  test('change object property', () => {
    let tested = false;
    const data = objectObserver({a: 1}, (...args) => {
      expect(data.a).toBe(2);
      tested = true;
    });
    data.a = 2;
    expect(tested).toBe(true);
  });

  test('change array element', () => {
    let tested = false;
    const data = objectObserver([1], (...args) => {
      expect(data[0]).toBe(2);
      tested = true;
    });
    data[0] = 2;
    expect(tested).toBe(true);
  });

  test('add object property', () => {
    let tested = false;
    const data = objectObserver({a: 1}, (...args) => {
      expect(data.b).toBe(2);
      tested = true;
    });
    data.b = 2;
    expect(tested).toBe(true);
  });

  test('add array element', () => {
    let tested = false;
    const data = objectObserver([1], (...args) => {
      expect(data[1]).toBe(2);
      tested = true;
    });
    data.push(2);
    expect(tested).toBe(true);
  });

  test('remove object property', () => {
    let tested = false;
    const data = objectObserver({a: 1, b: 2}, (...args) => {
      expect(data.b).toBe(undefined);
      tested = true;
    });
    delete data.b;
    expect(tested).toBe(true);
  });

  test('remove array element', () => {
    let tested = false;
    const data = objectObserver([1, 2], (...args) => {
      expect(data[1]).toBe(undefined);
      tested = true;
    });
    data.pop();
    expect(tested).toBe(true);
  });

  test('change nested object property', () => {
    let tested = false;
    const data = objectObserver({o: {a: 1}}, (...args) => {
      expect(data.o.a).toBe(2);
      tested = true;
    });
    data.o.a = 2;
    expect(tested).toBe(true);
  });

  test('change nested array element', () => {
    let tested = false;
    const data = objectObserver({a: [1]}, (...args) => {
      expect(data.a[0]).toBe(2);
      tested = true;
    });
    data.a[0] = 2;
    expect(tested).toBe(true);
  });

  test('add nested object property', () => {
    let tested = false;
    const data = objectObserver({o: {a: 1}}, (...args) => {
      expect(data.o.b).toBe(2);
      tested = true;
    });
    data.o.b = 2;
    expect(tested).toBe(true);
  });

  test('add nested array element', () => {
    let tested = false;
    const data = objectObserver([[1]], (...args) => {
      expect(data[0][1]).toBe(2);
      tested = true;
    });
    data[0].push(2);
    expect(tested).toBe(true);
  });

  test('remove nested object property', () => {
    let tested = false;
    const data = objectObserver({o: {a: 1, b: 2}}, (...args) => {
      expect(data.o.b).toBe(undefined);
      tested = true;
    });
    delete data.o.b;
    expect(tested).toBe(true);
  });

  test('remove nested array element', () => {
    let tested = false;
    const data = objectObserver([[1, 2]], (...args) => {
      expect(data[0][1]).toBe(undefined);
      tested = true;
    });
    data[0].pop();
    expect(tested).toBe(true);
  });

  test('change object date property', () => {
    let tested = false;
    const data = objectObserver({a: new Date(2000,1,1)}, (...args) => {
      expect(data.a.getDate()).toBe(2);
      tested = true;
    });
    data.a.setDate(2);
    expect(tested).toBe(true);
  });

  test('change array date element', () => {
    let tested = false;
    const data = objectObserver([new Date(2000,1,1)], (...args) => {
      expect(data[0].getMonth()).toBe(2);
      tested = true;
    });
    data[0].setMonth(2);
    expect(tested).toBe(true);
  });

  test('change object Symbol property', () => {
    let tested = false;
    const k = Symbol();
    const data = objectObserver({[k]: 1}, (...args) => {
      expect(data[k]).toBe(2);
      tested = true;
    });
    data[k] = 2;
    expect(tested).toBe(true);
  });

  test('set the same value', () => {
    let changed = false;
    const data = objectObserver({a: 1}, (...args) => {
      changed = true;
    });
    data.a = 1;
    expect(changed).toBe(false);
    data.a = 2;
    expect(changed).toBe(true);
  });

  test('stop and start observer', () => {
    let tested = false;
    const data = objectObserver({a: 1}, (...args) => {
      tested = true;
    });
    objectObserver.stop();
    data.a = 2;
    objectObserver.start();
    expect(tested).toBe(false);
  });

  test('try to observe without callback', () => {
    const obj = {a:1}
    const data = objectObserver(obj);
    expect(data).toBe(obj);
  });

  test('try to observe a number', () => {
    const data = objectObserver(1, () => void(0));
    expect(data).toBe(1);
  });

  test('try to observe a string', () => {
    const data = objectObserver('s', () => void(0));
    expect(data).toBe('s');
  });

  test('try to observe a boolean', () => {
    const data = objectObserver(false, () => void(0));
    expect(data).toBe(false);
  });

  test('try to observe a null', () => {
    const data = objectObserver(null, () => void(0));
    expect(data).toBe(null);
  });


});
