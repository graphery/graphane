import { test, expect } from '@playwright/test';

import {
  isValidIdentifier
} from '../../src/helpers/identifier.js';

const name = 'lib.identifier';

test.describe(name, () => {

  test('is a function', () => {
    expect(typeof isValidIdentifier).toBe('function');
  });

  test('number', () => {
    expect(isValidIdentifier(1)).toBe(false);
  });

  test('reserved word', () => {
    expect(isValidIdentifier('for')).toBe(false);
  });

  test('with space', () => {
    expect(isValidIdentifier('a b')).toBe(false);
  });

  test('function', () => {
    expect(isValidIdentifier(function x() {})).toBe(false);
  });

  test('object', () => {
    expect(isValidIdentifier({})).toBe(false);
  });

  test('character', () => {
    expect(isValidIdentifier('a')).toBe(true);
  });

  test('_', () => {
    expect(isValidIdentifier('a')).toBe(true);
  });

  test('$', () => {
    expect(isValidIdentifier('a')).toBe(true);
  });

});
