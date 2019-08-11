// Fetch existing todos from localStorage
const getSavedTodos = () => {
  const todosJSON = localStorage.getItem("todos");

  if (todosJSON !== null) {
    return JSON.parse(todosJSON);
  } else {
    return [];
  }
}

// Save todos to localStorage
const saveTodos = (todos) => {
  localStorage.setItem("todos", JSON.stringify(todos))
}

// Render application todos based on filters
const renderTodos = (todos, filters) => {
  const filtered = todos.filter(function(todo) {
    const searchTextMatch = todo.text.toLowerCase().includes(filters.searchText.toLowerCase());
    const hideCompletedMatch = !filters.hideCompleted || !todo.completed;

    return searchTextMatch && hideCompletedMatch;
  })

  document.querySelector("#todo-list").innerHTML = "";

  // Incompleted todos remaining
  const incompleted = filtered.filter(t => !t.completed)

  document.querySelector("#todo-list").appendChild(generateSummaryDOM(incompleted));

  // Showing todos
  filtered.forEach(function(todo) {
    document.querySelector("#todo-list").appendChild(generateTodoDOM(todo));
  })
}

// Remove todos
const removeTodo = (id) => {
  const todoIndex = todos.findIndex(todo => todo.id === id);
  if (todoIndex > -1)
    todos.splice(todoIndex, 1);
}

const toggleTodo = (id) => {
  const todo = todos.find(todo => todo.id === id);
  if (todo !== undefined) {
    todo.completed = !todo.completed;
  }
}

// Get the DOM elements for an individual todo
const generateTodoDOM = (todo) => {
  const contEl = generateDOMEl("div");
  const button = generateDOMEl("button");
  const textEl = generateDOMEl("a");
  const checkEl = generateDOMEl("input");

  checkEl.setAttribute("type", "checkbox");
  // Check if todo is completed
  checkEl.checked = todo.completed;
  button.textContent = "x";

  textEl.textContent = todo.text;
  textEl.setAttribute("href", `/edit.html#${todo.id}`);

  button.addEventListener("click", function() {
    removeTodo(todo.id);
    saveTodos(todos);
    renderTodos(todos, filters);
  })

  checkEl.addEventListener("change", function() {
    toggleTodo(todo.id)
    saveTodos(todos);
    renderTodos(todos, filters);
  })


  // Add the elements to de div container
  contEl.appendChild(checkEl)
  contEl.appendChild(textEl);
  contEl.appendChild(button);

  return contEl;
}


// Get the DOM elements for list summary
const generateSummaryDOM = (list) => {
  const summary = document.createElement("h3");
  summary.textContent = `You have ${list.length} todos left`;
  return summary;
}

/* Generate new DOM Element.
Arguments("elementName", "class", "id")
class and ID are optionals */

const generateDOMEl = (element, className, id) => {
  const newEl = document.createElement(element);

  if (className !== undefined && id !== undefined) {
    newEl.className = className;
    newEl.id = id;
  } else {
    element.className = "";
    element.id = "";
  }

  return newEl;
}

const generateLastEdited = (timestamp) => {
  return `Last edited ${moment(timestamp).fromNow()}`
}
