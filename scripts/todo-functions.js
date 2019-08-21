'use strict'

// Fetch existing todos from localStorage
const getSavedTodos = () => {
  const todosJSON = localStorage.getItem("todos");

  try {
    return todosJSON ? JSON.parse(todosJSON) : [];
  } catch(e) {
    return [];
  }

}

// Save todos to localStorage
const saveTodos = (todos) => {
  localStorage.setItem("todos", JSON.stringify(todos))
}

const sortTodo = (todos, sortBy) => {
  if (sortBy === 'byEdited') {
    return todos.sort((a, b) => {
      if (a.updatedAt > b.updatedAt) {
        return -1
      } else if (a.updatedAt < b.updatedAt) {
        return 1
      } else {
        return 0
      }
    })
  } else if (sortBy === 'byCreated') {
    return todos.sort((a, b) => {
      if (a.createdAt > b.createdAt) {
        return -1
      } else if (a.createdAt < b.createdAt) {
        return 1
      } else {
        return 0
      }
    })
  } else if (sortBy === 'alphabetical') {
    return todos.sort((a, b) => {
      if (a.text.toLowerCase() < b.text.toLowerCase()) {
        return -1
      } else if (a.text.toLowerCase() > b.text.toLowerCase()) {
        return 1
      } else {
        return 0
      }
    })
  } else {
    return todos
  }
}

// Render application todos based on filters
const renderTodos = (todos, filters) => {

  const todoList = document.querySelector("#todo-list")

  todos = sortTodo(todos, filters.sortBy) //Sort todos

  const filtered = todos.filter(function(todo) {
    const searchTextMatch = todo.text.toLowerCase().includes(filters.searchText.toLowerCase());
    const hideCompletedMatch = !filters.hideCompleted || !todo.completed;

    return searchTextMatch && hideCompletedMatch;
  })

  todoList.innerHTML = "";

  // Incompleted todos remaining
  const incompleted = filtered.filter(t => !t.completed)

  todoList.appendChild(generateSummaryDOM(incompleted));

  // Showing todos

  if (filtered.length > 0) {
    filtered.forEach(todo => todoList.appendChild(generateTodoDOM(todo)))
  } else {
    const noTodos = generateDOMEl('p')
    noTodos.textContent = 'No to-dos to show'
    noTodos.classList.add('empty-message')
    todoList.appendChild(noTodos)
  }
}

// Remove todos
const removeTodo = (id) => {
  const todoIndex = todos.findIndex(todo => todo.id === id);
  if (todoIndex > -1)
    todos.splice(todoIndex, 1);
}

const toggleTodo = (id) => {
  const todo = todos.find(todo => todo.id === id);
  if (todo) {
    todo.completed = !todo.completed;
  }
}

// Get the DOM elements for an individual todo
const generateTodoDOM = (todo) => {
  const contEl = generateDOMEl("label");
  const container = generateDOMEl("div")
  const button = generateDOMEl("button");
  const textEl = generateDOMEl("span");
  const checkEl = generateDOMEl("input");

  // Setup checkbox element
  checkEl.setAttribute("type", "checkbox");
  // Check if todo is completed
  checkEl.checked = todo.completed;
  container.appendChild(checkEl);
  checkEl.addEventListener("change", function() {
    toggleTodo(todo.id)
    saveTodos(todos);
    renderTodos(todos, filters);
  })

  // setup todo text
  textEl.textContent = todo.text;
  container.appendChild(textEl);

  // Setup container
  contEl.classList.add('list-item')
  container.classList.add('list-item__container')
  contEl.appendChild(container)

  // Setup remove button

  button.textContent = "remove";
  button.classList.add('button', 'button--text')
  contEl.appendChild(button);
  button.addEventListener("click", function() {
    removeTodo(todo.id);
    saveTodos(todos);
    renderTodos(todos, filters);
  })

  return contEl;
}


// Get the DOM elements for list summary
const generateSummaryDOM = (list) => {
  const summary = document.createElement("h3");
  summary.classList.add('list-title')
  const message = list.length === 1 ? `You have ${list.length} todo left` : `You have ${list.length} todos left`
  summary.textContent = message
  return summary;
}

/* Generate new DOM Element.
Arguments("elementName", "class", "id")
class and ID are optionals */

const generateDOMEl = (element) => {
  const newEl = document.createElement(element);
  return newEl;
}

const generateLastEdited = (timestamp) => `Last edited ${moment(timestamp).fromNow()}`
