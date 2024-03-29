/**
 * JS130 Lesson 1
 * TodoList Class
 *
 * `TodoList` contains a collection (an array) of `Todo` objects.
 */
"use strict";

const Todo = require("./todo.js");

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
   * @throws {ReferenceError} if the index is not valid
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
   * @throws {ReferenceError} if the index is not valid
   */
  markDoneAt(index) {
    this.itemAt(index).markDone();
  }

  /**
   * Mark the item at `index` as undone.
   * @param {number} index the item's index in the list
   * @throws {ReferenceError} if the index is not valid
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
   * @throws {ReferenceError} if the index is not valid
   */
  removeAt(index) {
    this._validateIndex(index);
    return this.todos.splice(index, 1)[0];
  }

  /**
   * Execute the provided function once for each todo list item.
   * @param {Function} callback the function to execute for each item in the
   * todo list. The function is called as `callback(todoItem, index)`.
   */
  forEach(callback) {
    this.todos.forEach((todo, index) => callback(todo, index));
  }

  /**
   * Return a shallow copy of this list, containing only the `Todo` items that
   * pass the test implemented in `callback`.
   * @param {Function} callback the function to execute once for each item in
   * the list. It should return a truthy value to include the item in the
   * resulting list. The function is called as `callback(todoItem, index)`.
   * @returns {TodoList} a shallow copy of this list containing only the items
   * that passed `callback`'s test.
   */
  filter(callback) {
    let result = new TodoList(this.title);

    this.forEach((todo, index) => {
      if (callback(todo, index)) result.add(todo);
    });

    return result;
  }

  /**
   * Return the first `Todo` whose title matches the given string title.
   * @param {string} title the `Todo` title to search for
   * @returns {Todo} the first `Todo` with the given title, or `undefined` if
   * no `Todo` is found.
   */
  findByTitle(title) {
    return this.filter((todo) => todo.getTitle() === title).first();
  }

  /**
   * Return a shallow copy of this list containing only the "done" items.
   * @returns {TodoList} a shallow copy of this list containing only the "done"
   * `Todo`s
   */
  allDone() {
    return this.filter((todo) => todo.isDone());
  }

  /**
   * Return a shallow cope of this list containing only the "not done" items.
   * @returns {TodoList} a shallow copy of this list containing only the "not
   * done" `Todo`s
   */
  allNotDone() {
    return this.filter((todo) => !todo.isDone());
  }

  /**
   * Mark the first `Todo` whose title matches the given string title as "done".
   * Do nothing if there are no matching `Todo`s in this list.
   * @param {string} title the title of the `Todo` to mark as "done"
   */
  markDone(title) {
    let found = this.findByTitle(title);
    if (found !== undefined) found.markDone();
  }

  /**
   * Mark all items in this list as "done".
   */
  markAllDone() {
    this.forEach((todo) => todo.markDone());
  }

  /**
   * Mark all items in this list as "not done".
   */
  markAllUndone() {
    this.forEach((todo) => todo.markUndone());
  }

  /**
   * Return a shallow copy of this list as an `Array`.
   * @returns {Array.<Todo>} a shallow copy of this list's `Todo`s as an `Array`
   */
  toArray() {
    let result = [];
    this.forEach((todo) => result.push(todo));
    return result;
  }
}

module.exports = {
  Todo,
  TodoList,
};
