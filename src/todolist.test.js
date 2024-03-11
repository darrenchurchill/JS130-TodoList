/* eslint-disable max-nested-callbacks */
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

  describe("TodoList.pop()", () => {
    test("empty TodoList returns undefined", () => {
      expect((new TodoList("Empty List").pop())).toBeUndefined();
    });

    test("3-Todo list -> no remaining Todos returns undefined", () => {
      const size = list.size();
      for (let _ = 0; _ < size; _ += 1) list.pop();
      expect(list.pop()).toBeUndefined();
    });

    test("3-Todo list -> always returns last Todo item", () => {
      expect(list.pop()).toEqual(todo3);
      expect(list.pop()).toEqual(todo2);
      expect(list.pop()).toEqual(todo1);
    });
  });

  describe("TodoList.isDone()", () => {
    test("empty TodoList returns true", () => {
      expect((new TodoList("Empty List").isDone())).toBe(true);
    });

    describe("3-Todo list -> returns false if any Todos aren't done", () => {
      test("1 Todo not done; all others done", () => {
        let todos = [todo1, todo2, todo3];

        todos.forEach((todo) => {
          todos.forEach((todo) => todo.markDone());
          todo.markUndone();
          expect(list.isDone()).toBe(false);
        });
      });

      test("1 Todo done; all others not done", () => {
        let todos = [todo1, todo2, todo3];

        todos.forEach((todo) => {
          todos.forEach((todo) => todo.markUndone());
          todo.markDone();
          expect(list.isDone()).toBe(false);
        });
      });
    });

    test("3-Todo list -> returns true if all Todos are done", () => {
      [todo1, todo2, todo3].forEach((todo) => todo.markDone());
      expect(list.isDone()).toBe(true);
    });
  });

  describe("TodoList.add()", () => {
    test("throws TypeError if item is not a Todo", () => {
      expect(() => list.add("not a todo")).toThrow(TypeError);
      expect(() => list.add(1)).toThrow(TypeError);
      expect(() => list.add({})).toThrow(TypeError);
      expect(() => list.add(new TodoList("empty list"))).toThrow(TypeError);
    });
  });
});
