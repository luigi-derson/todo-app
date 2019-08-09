const todos = getSavedTodos();

const filters = {
  searchText: "",
  hideCompleted: false
}

renderTodos(todos, filters);

document.querySelector("#filter").addEventListener("input", function(text) {
  filters.searchText = text.target.value;
  renderTodos(todos, filters);
})


document.querySelector("#add-todo").addEventListener("submit", function(evt) {
  evt.preventDefault(); // Prevent default behavior

  const todo = evt.target.elements.text.value; // Input value

  // Add todo to the todos Array if there is some value
  const todoId = uuidv4();
  if (todo.length > 0) {
    todos.push({
      id: todoId,
      text: todo,
      completed: false
    });
  }
  saveTodos(todos);
  evt.target.elements.text.value = ""; // Clear the input field
  
  location.assign(`/edit.html#${todoId}`);
})

document.querySelector("#check-to-hide").addEventListener("change", function(evt) {
  filters.hideCompleted = evt.target.checked
  renderTodos(todos, filters);
})



