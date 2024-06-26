/* eslint-disable max-nested-callbacks */
/* eslint-disable max-lines-per-function */
"use strict";

const { Todo, TodoList } = require("../lib/todolist.js");

describe("TodoList", () => {
  let
    /** @type {Todo} */          todo1,
    /** @type {Todo} */          todo2,
    /** @type {Todo} */          todo3,
    /** @type {Array.<Todo>} */  todos,
    /** @type {TodoList} */      list;

  beforeEach(() => {
    todo1 = new Todo("Buy milk");
    todo2 = new Todo("Clean room");
    todo3 = new Todo("Go to the gym");

    todos = [todo1, todo2, todo3];

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
      expect(list.toArray()).toEqual(todos);
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
        todos.forEach((todo) => {
          todos.forEach((todo) => todo.markDone());
          todo.markUndone();
          expect(list.isDone()).toBe(false);
        });
      });

      test("1 Todo done; all others not done", () => {
        todos.forEach((todo) => {
          todos.forEach((todo) => todo.markUndone());
          todo.markDone();
          expect(list.isDone()).toBe(false);
        });
      });
    });

    test("3-Todo list -> returns true if all Todos are done", () => {
      todos.forEach((todo) => todo.markDone());
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

  describe("TodoList.itemAt()", () => {
    test("throws ReferenceError if index is out of bounds", () => {
      expect(() => list.itemAt(-1)).toThrow(ReferenceError);
      expect(() => list.itemAt(list.size())).toThrow(ReferenceError);
      expect(() => list.itemAt(9)).toThrow(ReferenceError);
    });

    test("returns reference to Todo at given index", () => {
      todos.forEach((todo, index) => {
        expect(list.itemAt(index)).toBe(todo);
      });
    });
  });

  describe("TodoList.markDoneAt()", () => {
    test("throws ReferenceError if index is out of bounds", () => {
      expect(() => list.markDoneAt(-1)).toThrow(ReferenceError);
      expect(() => list.markDoneAt(list.size())).toThrow(ReferenceError);
      expect(() => list.markDoneAt(9)).toThrow(ReferenceError);
    });

    test('marks Todo at given index as "done"', () => {
      for (let index = 0; index < list.size(); index += 1) {
        list.markDoneAt(index);
        expect(list.itemAt(index).isDone()).toBe(true);
      }
    });

    test('marks only the Todo at given index as "done"', () => {
      todos.forEach((_, index) => {
        todos.forEach((todo) => todo.markUndone());
        list.markDoneAt(index);
        expect(list.toArray().filter((todo) => todo.isDone()).length).toBe(1);
      });
    });
  });

  describe("TodoList.markUndoneAt()", () => {
    test("throws ReferenceError if index is out of bounds", () => {
      expect(() => list.markUndoneAt(-1)).toThrow(ReferenceError);
      expect(() => list.markUndoneAt(list.size())).toThrow(ReferenceError);
      expect(() => list.markUndoneAt(9)).toThrow(ReferenceError);
    });

    test('marks Todo at given index as "undone"', () => {
      for (let index = 0; index < list.size(); index += 1) {
        todos.forEach((todo) => todo.markDone());
        list.markUndoneAt(index);
        expect(list.itemAt(index).isDone()).toBe(false);
      }
    });

    test('marks only the Todo at given index as "undone"', () => {
      todos.forEach((_, index) => {
        todos.forEach((todo) => todo.markDone());
        list.markUndoneAt(index);
        expect(list.toArray().filter((todo) => !todo.isDone()).length).toBe(1);
      });
    });
  });

  describe("TodoList.markDone()", () => {
    test('marks the Todo as "done" when there is one with the given title', () => {
      todos.forEach((todo) => {
        list.markDone(todo.getTitle());
        expect(todo.isDone()).toBe(true);
      });
    });

    test("does nothing when there is no Todo with the given title", () => {
      expect(() => (new TodoList("empty list")).markDone("doesn't exist")).not.toThrow();
      expect(() => list.markDone("doesn't exist")).not.toThrow();
      expect((new TodoList("empty list")).markDone("doesn't exist")).toBeUndefined();
      expect(list.markDone("doesn't exist")).toBeUndefined();
    });

    test("marks the first Todo found when there are > 1 with the given title", () => {
      let todo4 = new Todo(todo1.getTitle());
      list.add(todo4);
      list.markDone(todo1.getTitle());
      expect(todo1.isDone()).toBe(true);
      expect(todo4.isDone()).toBe(false);
    });
  });

  describe("TodoList.markAllDone()", () => {
    test("does nothing on empty TodoList", () => {
      expect(() => (new TodoList("empty list")).markAllDone()).not.toThrow();
      expect((new TodoList("empty list")).markAllDone()).toBeUndefined();
    });

    test('marks all Todo items as "done"', () => {
      list.markAllDone();
      expect(todos.every((todo) => todo.isDone())).toBe(true);
    });
  });

  describe("TodoList.markAllUndone()", () => {
    test("does nothing on empty TodoList", () => {
      expect(() => (new TodoList("empty list")).markAllUndone()).not.toThrow();
      expect((new TodoList("empty list")).markAllUndone()).toBeUndefined();
    });

    test('marks all Todo items as "not done"', () => {
      list.markAllUndone();
      expect(todos.every((todo) => !todo.isDone())).toBe(true);
    });
  });

  describe("TodoList.removeAt()", () => {
    test("throws ReferenceError if index is out of bounds", () => {
      expect(() => list.removeAt(-1)).toThrow(ReferenceError);
      expect(() => list.removeAt(list.size())).toThrow(ReferenceError);
      expect(() => list.removeAt(9)).toThrow(ReferenceError);
    });

    test("returns the Todo item at the given index", () => {
      const size = list.size();

      for (let index = 0; index < size; index += 1) {
        expect(list.removeAt(0)).toBe(todos[index]);
      }
    });

    test("removes the Todo item at the given index", () => {
      const size = list.size();

      for (let count = 1; count <= size; count += 1) {
        let todo = list.removeAt(0);
        expect(list.toArray()).not.toContain(todo);
      }
    });
  });

  describe("TodoList.toString()", () => {
    test("all Todos undone -> returns correct string representation", () => {
      expect(list.toString()).toBe(
      // eslint-disable-next-line indent
`---- Today's Todos ----
[ ] Buy milk
[ ] Clean room
[ ] Go to the gym
`
      );
    });

    test("first Todo done -> returns correct string representation", () => {
      list.markDoneAt(0);
      expect(list.toString()).toBe(
      // eslint-disable-next-line indent
`---- Today's Todos ----
[X] Buy milk
[ ] Clean room
[ ] Go to the gym
`
      );
    });

    test("second Todo done -> returns correct string representation", () => {
      list.markDoneAt(1);
      expect(list.toString()).toBe(
      // eslint-disable-next-line indent
`---- Today's Todos ----
[ ] Buy milk
[X] Clean room
[ ] Go to the gym
`
      );
    });

    test("all Todos done -> returns correct string representation", () => {
      list.markAllDone();
      expect(list.toString()).toBe(
      // eslint-disable-next-line indent
`---- Today's Todos ----
[X] Buy milk
[X] Clean room
[X] Go to the gym
`
      );
    });
  });

  describe("TodoList callback methods", () => {
    let callback;

    beforeEach(() => {
      callback = jest.fn(() => true);
    });

    describe("TodoList.forEach()", () => {
      test("calls the provided callback exactly size() number of times", () => {
        const size = list.size();
        list.forEach(callback);
        expect(callback).toHaveBeenCalledTimes(size);
      });

      test("calls the provided callback with the correct arguments", () => {
        list.forEach(callback);
        todos.forEach((todo, index) => {
          expect(callback).toHaveBeenNthCalledWith(
            index + 1,
            todo,
            index,
          );
        });
      });
    });

    describe("TodoList.filter()", () => {
      test("returns a TodoList object", () => {
        expect(list.filter(callback)).toEqual(expect.any(TodoList));
      });

      test("returns an equivalent TodoList, given a non-filtering callback", () => {
        expect(list.filter(callback)).toEqual(list);
      });

      test("returns an empty TodoList, given an all-filtering callback", () => {
        expect(list.filter(() => false)).toEqual(new TodoList("Today's Todos"));
      });

      test("returns a filtered TodoList, given a conditionally filtering callback", () => {
        todo2.markDone();
        let otherList = new TodoList("Today's Todos");
        expect(list.filter((todo) => todo.isDone())).not.toEqual(otherList);
        otherList.add(todo2);
        expect(list.filter((todo) => todo.isDone())).toEqual(otherList);
      });

      test("returns a TodoList with shallow copied Todo items", () => {
        list.filter(callback).forEach((todo) => {
          expect(todos).toContain(todo);
        });
      });

      test("calls the provided callback exactly size() number of times", () => {
        const size = list.size();
        list.filter(callback);
        expect(callback).toHaveBeenCalledTimes(size);
      });

      test("calls the provided callback with the correct arguments", () => {
        list.filter(callback);
        todos.forEach((todo, index) => {
          expect(callback).toHaveBeenNthCalledWith(
            index + 1,
            todo,
            index,
          );
        });
      });
    });
  });

  describe("TodoList.findByTitle()", () => {
    test("returns the Todo when there is one with the given title", () => {
      expect(list.findByTitle(todo1.getTitle())).toBe(todo1);
      expect(list.findByTitle(todo2.getTitle())).toBe(todo2);
      expect(list.findByTitle(todo3.getTitle())).toBe(todo3);
    });

    test("returns undefined when there is no Todo with the given title", () => {
      expect((new TodoList("empty list")).findByTitle("doesn't exist")).toBeUndefined();
      expect(list.findByTitle("doesn't exist")).toBeUndefined();
    });

    test("returns the first Todo found when there are > 1 with the given title", () => {
      let todo4 = new Todo(todo1.getTitle());
      list.add(todo4);
      expect(list.findByTitle(todo1.getTitle())).toBe(todo1);
      expect(list.findByTitle(todo1.getTitle())).not.toBe(todo4);
    });
  });

  describe("TodoList.allDone()", () => {
    describe('when no Todos are "done"', () => {
      test("returns an empty TodoList", () => {
        expect((new TodoList("empty list")).allDone()).toEqual(new TodoList("empty list"));
        expect(list.allDone()).toEqual(new TodoList("Today's Todos"));
      });
    });

    describe('when all Todos are "done"', () => {
      beforeEach(() => list.markAllDone());

      test("returns an equivalent TodoList", () => {
        expect(list.allDone()).toEqual(list);
      });

      test("returns a shallow copy", () => {
        let otherList = new TodoList("Today's Todos");
        todos.forEach((todo) => otherList.add(todo));
        expect(list.allDone()).not.toBe(list);
        expect(list.allDone()).toEqual(otherList);
      });
    });

    describe('when some Todos are "done" and some "not done"', () => {
      test('returns a TodoList with only the "done" Todos', () => {
        let otherList = new TodoList("Today's Todos");
        todo2.markDone();
        todos
          .filter((todo) => todo.isDone())
          .forEach((todo) => otherList.add(todo));
        expect(list.allDone()).toEqual(otherList);
      });
    });
  });

  describe("TodoList.allNotDone()", () => {
    describe('when no Todos are "done"', () => {
      test("returns an equivalent TodoList", () => {
        expect((new TodoList("empty list")).allNotDone()).toEqual(new TodoList("empty list"));
        expect(list.allNotDone()).toEqual(list);
      });

      test("returns a shallow copy", () => {
        let otherList = new TodoList("Today's Todos");
        todos.forEach((todo) => otherList.add(todo));
        expect(list.allNotDone()).not.toBe(list);
        expect(list.allNotDone()).toEqual(otherList);
      });
    });

    describe('when all Todos are "done"', () => {
      test("returns an empty TodoList", () => {
        list.markAllDone();
        expect(list.allNotDone()).toEqual(new TodoList("Today's Todos"));
      });
    });

    describe('when some Todos are "done" and some "not done"', () => {
      test('returns a TodoList with only the "not done" Todos', () => {
        let otherList = new TodoList("Today's Todos");
        todo2.markDone();
        todos
          .filter((todo) => !todo.isDone())
          .forEach((todo) => otherList.add(todo));
        expect(list.allNotDone()).toEqual(otherList);
      });
    });
  });
});
