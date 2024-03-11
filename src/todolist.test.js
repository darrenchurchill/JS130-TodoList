/* eslint-disable max-lines-per-function */
"use strict";

const { Todo, TodoList } = require("./todolist.js");

describe("TodoList", () => {
  let
    /** @type {Todo} */      todo1,
    /** @type {Todo} */      todo2,
    /** @type {Todo} */      todo3,
    /** @type {TodoList} */  list;

  beforeEach(() => {
    todo1 = new Todo("Buy milk");
    todo2 = new Todo("Clean room");
    todo3 = new Todo("Go to the gym");

    list = new TodoList("Today's Todos");
    list.add(todo1);
    list.add(todo2);
    list.add(todo3);
  });

  describe("TodoList.size()", () => {
    test("list has a size of 3", () => {
      expect(list.size()).toBe(3);
    });
  });

  describe("TodoList.toArray()", () => {
    test("empty TodoList returns empty array", () => {
      expect((new TodoList("Empty List").toArray())).toEqual([]);
    });

    test("3-Todo list returns array with 3 Todos", () => {
      expect(list.toArray()).toEqual([todo1, todo2, todo3]);
    });
  });

  describe("TodoList.first()", () => {
    test("empty TodoList returns undefined", () => {
      expect((new TodoList("Empty List").first())).toBeUndefined();
    });

    test("3-Todo list returns first Todo", () => {
      expect(list.first()).toEqual(todo1);
    });
  });
});
