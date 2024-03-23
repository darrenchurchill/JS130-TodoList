/**
 * JS130 Lesson 1
 * TodoList Class
 *
 * `TodoList` contains a collection (an array) of `Todo` objects.
 */
"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var Todo = require("./todo.js");

/**
 * The `TodoList` class represents a collection of Todo objects.
 * You can perform typical collection-oriented actions on a `TodoList` object,
 * including iteration and selection.
 */
var TodoList = /*#__PURE__*/function () {
  /**
   * Create a new `TodoList`
   * @param {string} title the list title
   */
  function TodoList(title) {
    _classCallCheck(this, TodoList);
    this.title = title;

    /** @type {Array.<Todo>} */
    this.todos = [];
  }
  return _createClass(TodoList, [{
    key: "toString",
    value: function toString() {
      var result = "---- ".concat(this.title, " ----\n");
      this.todos.forEach(function (todo) {
        result += "".concat(todo, "\n");
      });
      return result;
    }

    /**
     * Add a `Todo` item to this list.
     * @param {Todo} todo the `Todo` item to add
     * @throws {TypeError} if `todo` is not a `Todo` value
     */
  }, {
    key: "add",
    value: function add(todo) {
      if (!(todo instanceof Todo)) {
        throw new TypeError("todo must be a Todo object");
      }
      this.todos.push(todo);
    }

    /**
     * Get the size of this list.
     * @returns the number of `Todo`s in this list
     */
  }, {
    key: "size",
    value: function size() {
      return this.todos.length;
    }

    /**
     * Get the first item in this list.
     * @returns {Todo} the first `Todo` item in this list, or `undefined` if the
     * list is empty.
     */
  }, {
    key: "first",
    value: function first() {
      return this.todos[0];
    }

    /**
     * Get the last item in this list.
     * @returns {Todo} the last `Todo` item in this list, or `undefined` if the
     * list is empty.
     */
  }, {
    key: "last",
    value: function last() {
      return this.todos[this.size() - 1];
    }

    /**
     * Get the list item at a given index.
     * @param {number} index the zero-based list index to access
     * @returns {Todo} the `Todo` item at the given index
     * @throws {ReferenceError} if the index is not valid
     */
  }, {
    key: "itemAt",
    value: function itemAt(index) {
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
  }, {
    key: "_validateIndex",
    value: function _validateIndex(index) {
      if (!Number.isInteger(index) || index < 0 || index >= this.size()) {
        throw new ReferenceError("Invalid index: ".concat(index));
      }
    }

    /**
     * Mark the item at `index` as done.
     * @param {number} index the item's index in the list
     * @throws {ReferenceError} if the index is not valid
     */
  }, {
    key: "markDoneAt",
    value: function markDoneAt(index) {
      this.itemAt(index).markDone();
    }

    /**
     * Mark the item at `index` as undone.
     * @param {number} index the item's index in the list
     * @throws {ReferenceError} if the index is not valid
     */
  }, {
    key: "markUndoneAt",
    value: function markUndoneAt(index) {
      this.itemAt(index).markUndone();
    }

    /**
     * Return `true` if every item in this list is done.
     * @returns {boolean} `true` if every item in this list is done
     */
  }, {
    key: "isDone",
    value: function isDone() {
      return this.todos.every(function (todo) {
        return todo.isDone();
      });
    }

    /**
     * Remove and return the first item in this list.
     * @returns {Todo} the first item in this list, or `undefined` if the list is
     * empty.
     */
  }, {
    key: "shift",
    value: function shift() {
      return this.todos.shift();
    }

    /**
     * Remove and return the last item in this list.
     * @returns {Todo} the last item in this list, or `undefined` if the list is
     * empty.
     */
  }, {
    key: "pop",
    value: function pop() {
      return this.todos.pop();
    }

    /**
     * Remove and return a list item at the given index.
     * @param {number} index the item's index in the list
     * @returns {Todo} the item removed
     * @throws {ReferenceError} if the index is not valid
     */
  }, {
    key: "removeAt",
    value: function removeAt(index) {
      this._validateIndex(index);
      return this.todos.splice(index, 1)[0];
    }

    /**
     * Execute the provided function once for each todo list item.
     * @param {Function} callback the function to execute for each item in the
     * todo list. The function is called as `callback(todoItem, index)`.
     */
  }, {
    key: "forEach",
    value: function forEach(callback) {
      this.todos.forEach(function (todo, index) {
        return callback(todo, index);
      });
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
  }, {
    key: "filter",
    value: function filter(callback) {
      var result = new TodoList(this.title);
      this.forEach(function (todo, index) {
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
  }, {
    key: "findByTitle",
    value: function findByTitle(title) {
      return this.filter(function (todo) {
        return todo.getTitle() === title;
      }).first();
    }

    /**
     * Return a shallow copy of this list containing only the "done" items.
     * @returns {TodoList} a shallow copy of this list containing only the "done"
     * `Todo`s
     */
  }, {
    key: "allDone",
    value: function allDone() {
      return this.filter(function (todo) {
        return todo.isDone();
      });
    }

    /**
     * Return a shallow cope of this list containing only the "not done" items.
     * @returns {TodoList} a shallow copy of this list containing only the "not
     * done" `Todo`s
     */
  }, {
    key: "allNotDone",
    value: function allNotDone() {
      return this.filter(function (todo) {
        return !todo.isDone();
      });
    }

    /**
     * Mark the first `Todo` whose title matches the given string title as "done".
     * Do nothing if there are no matching `Todo`s in this list.
     * @param {string} title the title of the `Todo` to mark as "done"
     */
  }, {
    key: "markDone",
    value: function markDone(title) {
      var found = this.findByTitle(title);
      if (found !== undefined) found.markDone();
    }

    /**
     * Mark all items in this list as "done".
     */
  }, {
    key: "markAllDone",
    value: function markAllDone() {
      this.forEach(function (todo) {
        return todo.markDone();
      });
    }

    /**
     * Mark all items in this list as "not done".
     */
  }, {
    key: "markAllUndone",
    value: function markAllUndone() {
      this.forEach(function (todo) {
        return todo.markUndone();
      });
    }

    /**
     * Return a shallow copy of this list as an `Array`.
     * @returns {Array.<Todo>} a shallow copy of this list's `Todo`s as an `Array`
     */
  }, {
    key: "toArray",
    value: function toArray() {
      var result = [];
      this.forEach(function (todo) {
        return result.push(todo);
      });
      return result;
    }
  }]);
}();
module.exports = {
  Todo: Todo,
  TodoList: TodoList
};