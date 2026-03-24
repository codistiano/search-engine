import { describe, expect, test } from 'vitest';
import {Queue} from "./queue.ts";

const objs = new Queue<string>();

describe('queue', () => {
  test('Enqueue', () => {
    objs.enqueue("check 1");
    objs.enqueue("check 2");

    expect(objs.size).toBe(2);
  });

  test('Dequeue', () => {
    objs.dequeue();
    objs.dequeue();

    expect(objs.size).toBe(1);
  });

  test('Mentioning Size', () => {
    expect(objs.size).toBe(0);
  });

  test('Confirming Element availability', () => {
    expect(objs.isEmpty()).toBe(0);
  });
});


