/**
 * JS130 Lesson 3
 * Todo Class
 */
"use strict";

/**
 * The `Todo` class represents a todo item and its associated data:
 * - the todo title
 * - a flag representing the todo's "done" state (done or not done)
 */
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var Todo = /*#__PURE__*/function () {
  /**
   * Create a new `Todo`.
   * @param {string} title this Todo's title
   */
  function Todo(title) {
    _classCallCheck(this, Todo);
    this.title = String(title);
    this.done = false;
  }
  return _createClass(Todo, [{
    key: "toString",
    value: function toString() {
      var marker = this.isDone() ? Todo.DONE_MARKER : Todo.UNDONE_MARKER;
      return "[".concat(marker, "] ").concat(this.title);
    }

    /**
     * Mark this `Todo` as "done".
     */
  }, {
    key: "markDone",
    value: function markDone() {
      this.done = true;
    }

    /**
     * Mark this `Todo` as "not done".
     */
  }, {
    key: "markUndone",
    value: function markUndone() {
      this.done = false;
    }

    /**
     * Return `true` if this `Todo` is "done".
     * @returns {boolean} `true` if this `Todo` is "done", `false` otherwise
     */
  }, {
    key: "isDone",
    value: function isDone() {
      return this.done;
    }

    /**
     * Return this `Todo`'s title as a string.
     * @returns {string} this `Todo`'s title
     */
  }, {
    key: "getTitle",
    value: function getTitle() {
      return this.title;
    }
  }]);
}();
_defineProperty(Todo, "DONE_MARKER", "X");
_defineProperty(Todo, "UNDONE_MARKER", " ");
module.exports = Todo;