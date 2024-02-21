/**
 * JS130 Lesson 1
 * TodoList Class
 *
 * `TodoList` contains a collection (an array) of `Todo` objects.
 */

/**
 * The `Todo` class represents a todo item and its associated data:
 * - the todo title
 * - a flag representing the todo's "done" state (done or not done)
 */
class Todo {
  static DONE_MARKER = "X";
  static UNDONE_MARKER = " ";

  constructor(title) {
    this.title = title;
    this.done = false;
  }

  toString() {
    let marker = this.isDone() ? Todo.DONE_MARKER : Todo.UNDONE_MARKER;
    return `[${marker}] ${this.title}`;
  }

  markDone() {
    this.done = true;
  }

  markUndone() {
    this.done = false;
  }

  isDone() {
    return this.done;
  }

  getTitle() {
    return this.title;
  }
}

