class DoublyNode<T>{
  value: T;
  next: DoublyNode<T> | null;
  prev: DoublyNode<T> | null;
  
  constructor (value: string) {
    this.value = value;
  }
}

export class Queue {
  private head: DoublyNode<T> | null = null;
  private tail: DoublyNode<T> | null = null;
  private size: number = 0;

  // Appending to the end of the queue
  enqueue(link: string): void {
    const newLink = new DoublyNode(link);

    if (!this.head) {
      this.head = this.tail = newLink;
      this.increaseSize();
      return;
    };

    if (this.tail) {
      this.tail.next = newLink;
      newLink.prev = this.tail;
      this.tail = newLink;
      this.increaseSize();
      return;
    };
  };

  // Shifting / Removing the first element in the queue
  dequeue() {
    if (this.head === this.tail) {
      this.head = this.tail = null;
      this.decreaseSize();
      return;
    };

    if (this.head) {
      const headNext = this.head.next;
      this.head.next = null;
      this.head = headNext;
      this.head.prev = null;
      this.decreaseSize();
      return
    };
  };

  isEmpty(): number {
    if (!this.head || !this.tail) {
      return true;
    } else {
      return false;
    };
  };

  increaseSize(): void{
    this.size += 1;
    return;
  };

  decreaseSize(): void{
    this.size -= 1;
    return;
  };

  size(): number {
    return this.size;
  };
};

