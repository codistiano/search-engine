import { describe, beforeAll, expect, test } from 'vitest';
import {Queue} from "../../src/crawler/queue.ts";

describe('queue', () => {
  let objs: Queue<string>;

  beforeAll(() => {
    objs = new Queue<string>();
  });
  
  test('Enqueue 5 items', () => {
    objs.enqueue("Check 1");
    objs.enqueue("Check 2");
    objs.enqueue("Check 3");
    objs.enqueue("Check 4");
    objs.enqueue("Check 5");

    expect(objs.size).toBe(5)
  });

  test('Dequeue some items', () => {
    objs.dequeue();
    objs.dequeue();
    objs.dequeue();
    objs.dequeue();

    expect(objs.size).toBe(1);
  });
  
  test('Dequeuing and checking emptiness', () => {
    objs.dequeue();

    expect(objs.isEmpty()).toBe(true);
  });
});


