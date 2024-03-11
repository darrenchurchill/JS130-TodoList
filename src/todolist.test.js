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

  describe("TodoList.last()", () => {
    test("empty TodoList returns undefined", () => {
      expect((new TodoList("Empty List").last())).toBeUndefined();
    });

    test("3-Todo list returns last Todo", () => {
      expect(list.last()).toEqual(todo3);
    });
  });

  describe("TodoList.shift()", () => {
    test("empty TodoList returns undefined", () => {
      expect((new TodoList("Empty List").shift())).toBeUndefined();
    });

    test("3-Todo list -> no remaining Todos returns undefined", () => {
      const size = list.size();
      for (let _ = 0; _ < size; _ += 1) list.shift();
      expect(list.shift()).toBeUndefined();
    });

    test("3-Todo list -> always returns first Todo item", () => {
      expect(list.shift()).toEqual(todo1);
      expect(list.shift()).toEqual(todo2);
      expect(list.shift()).toEqual(todo3);
    });
  });
});
