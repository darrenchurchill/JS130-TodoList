/* eslint-disable max-nested-callbacks */
/* eslint-disable max-lines-per-function */
"use strict";

const Todo = require("./todo.js");

describe("Todo", () => {
  /** @type {Todo} */
  let todo;

  beforeEach(() => {
    todo = new Todo("Buy milk");
  });

  describe("Todo.toString()", () => {
    test('a "not done" Todo returns the correct string representation', () => {
      expect(todo.toString()).toBe("[ ] Buy milk");
    });

    test('a "done" Todo returns the correct string representation', () => {
      todo.markDone();
      expect(todo.toString()).toBe("[X] Buy milk");
    });
  });

  describe("Todo.isDone()", () => {
    test('a Todo is created as "not done"', () => {
      expect(todo.isDone()).toBe(false);
    });
  });
});
