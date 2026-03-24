import { describe, expect, test } from 'vitest';
import {Queue} from "../../src/crawler/queue.ts";

const objs = new Queue<string>();

describe('queue', () => {
  test('Enqueue', () => {
    objs.enqueue("check 1");
    objs.enqueue("check 2");

    expect(objs.size).toEqual(2);
  });

  test('Dequeue', () => {
    objs.dequeue();
    objs.dequeue();
    
    expect(objs.size).toEqual(0);
  });

  test('Mentioning Size', () => {
    expect(objs.size).toEqual(0);
  });

  test('Confirming Element availability', () => {
    expect(objs.isEmpty()).toBe(true);
  });
});


