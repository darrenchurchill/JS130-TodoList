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

  /**
   * Create a new `Todo`.
   * @param {string} title this Todo's title
   */
  constructor(title) {
    this.title = title;
    this.done = false;
  }

  toString() {
    let marker = this.isDone() ? Todo.DONE_MARKER : Todo.UNDONE_MARKER;
    return `[${marker}] ${this.title}`;
  }

  /**
   * Mark this `Todo` as "done".
   */
  markDone() {
    this.done = true;
  }

  /**
   * Mark this `Todo` as "not done".
   */
  markUndone() {
    this.done = false;
  }

  /**
   * Return `true` if this `Todo` is "done".
   * @returns {boolean} `true` if this `Todo` is "done", `false` otherwise
   */
  isDone() {
    return this.done;
  }

  /**
   * Return this `Todo`'s title as a string.
   * @returns {string} this `Todo`'s title
   */
  getTitle() {
    return this.title;
  }
}

/**
 * The `TodoList` class represents a collection of Todo objects.
 * You can perform typical collection-oriented actions on a `TodoList` object,
 * including iteration and selection.
 */
class TodoList {
  /**
   * Create a new `TodoList`
   * @param {string} title the list title
   */
  constructor(title) {
    this.title = title;

    /** @type {Array.<Todo>} */
    this.todos = [];
  }

  toString() {
    let result = `---- ${this.title} ----\n`;

    this.todos.forEach((todo) => {
      result += `${todo}\n`;
    });

    return result;
  }

  /**
   * Add a `Todo` item to this list.
   * @param {Todo} todo the `Todo` item to add
   * @throws {TypeError} if `todo` is not a `Todo` value
   */
  add(todo) {
    if (!(todo instanceof Todo)) {
      throw new TypeError("todo must be a Todo object");
    }
    this.todos.push(todo);
  }

  /**
   * Get the size of this list.
   * @returns the number of `Todo`s in this list
   */
  size() {
    return this.todos.length;
  }

  /**
   * Get the first item in this list.
   * @returns {Todo} the first `Todo` item in this list, or `undefined` if the
   * list is empty.
   */
  first() {
    return this.todos[0];
  }

  /**
   * Get the last item in this list.
   * @returns {Todo} the last `Todo` item in this list, or `undefined` if the
   * list is empty.
   */
  last() {
    return this.todos[this.size() - 1];
  }

  /**
   * Get the list item at a given index.
   * @param {number} index the zero-based list index to access
   * @returns {Todo} the `Todo` item at the given index
   */
  itemAt(index) {
    this._validateIndex(index);
    return this.todos[index];
  }

  /**
   * Validate whether the given index is both:
   * - a number
   * - in bounds for this list.
   * @param {number} index the index to validate
   * @throws {ReferenceError} if the index is not valid
   */
  _validateIndex(index) {
    if (!Number.isInteger(index) || index < 0 || index >= this.size()) {
      throw new ReferenceError(`Invalid index: ${index}`);
    }
  }

  /**
   * Mark the item at `index` as done.
   * @param {number} index the item's index in the list
   */
  markDoneAt(index) {
    this.itemAt(index).markDone();
  }

  /**
   * Mark the item at `index` as undone.
   * @param {number} index the item's index in the list
   */
  markUndoneAt(index) {
    this.itemAt(index).markUndone();
  }

  /**
   * Return `true` if every item in this list is done.
   * @returns {boolean} `true` if every item in this list is done
   */
  isDone() {
    return this.todos.every((todo) => todo.isDone());
  }

  /**
   * Remove and return the first item in this list.
   * @returns {Todo} the first item in this list, or `undefined` if the list is
   * empty.
   */
  shift() {
    return this.todos.shift();
  }

  /**
   * Remove and return the last item in this list.
   * @returns {Todo} the last item in this list, or `undefined` if the list is
   * empty.
   */
  pop() {
    return this.todos.pop();
  }

  /**
   * Remove and return a list item at the given index.
   * @param {number} index the item's index in the list
   * @returns {Todo} the item removed
   */
  removeAt(index) {
    this._validateIndex(index);
    return this.todos.splice(index, 1)[0];
  }

  /**
   * Execute the provided function once for each todo list item.
   * @param {Function} callback the function to execute for each item in the
   * todo list.
   */
  forEach(callback) {
    this.todos.forEach(callback);
  }
}

