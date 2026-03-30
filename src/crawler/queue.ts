class DoublyNode<T> {
  value: T;
  next: DoublyNode<T> | null;
  prev: DoublyNode<T> | null;

  constructor(value: T) {
    this.next = null;
    this.prev = null;
    this.value = value;
  }
}

export class Queue<T> {
  private head: DoublyNode<T> | null = null;
  private tail: DoublyNode<T> | null = null;
  size: number = 0;

  // Appending to the end of the queue
  enqueue(link: T): void {
    const newLink = new DoublyNode(link);

    if (!this.head) {
      this.head = this.tail = newLink;
      this.increaseSize();
      return;
    }

    if (this.tail) {
      this.tail.next = newLink;
      newLink.prev = this.tail;
      this.tail = newLink;
      this.increaseSize();
      return;
    }
  }

  // Shifting / Removing the first element in the queue
  dequeue(): T | undefined {
    if (!this.head) return undefined;

    const removedValue = this.head.value;

    if (this.head === this.tail) {
      this.head = this.tail = null;
    } else {
      this.head = this.head.next;
      if (this.head) {
        this.head.prev = null;
      }
    }

    this.decreaseSize();
    return removedValue;
  }

  isEmpty(): boolean {
    if (!this.head || !this.tail) {
      return true;
    } else {
      return false;
    }
  }

  private increaseSize(): void {
    this.size += 1;
    return;
  }

  private decreaseSize(): void {
    this.size -= 1;
    return;
  }
}
