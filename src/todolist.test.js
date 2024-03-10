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

  test("list has a size of 3", () => {
    expect(list.size()).toBe(3);
  });
});
