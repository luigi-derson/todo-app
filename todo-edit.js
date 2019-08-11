const todoId = location.hash.substring(1)
let todos = getSavedTodos()
const todo = todos.find(todo => todo.id === todoId)

if (todo === undefined) {
  location.assign('/index.html')
}

const todoUpdated = document.querySelector('#todo-updated')
todoUpdated.textContent = generateLastEdited(todo.updatedAt)

const todoText = document.querySelector('#todo-text')
todoText.value = todo.text

todoText.addEventListener('input', function(text) {
  todo.text = text.target.value
  todo.updatedAt = moment().valueOf()
  todoUpdated.textContent = generateLastEdited(todo.updatedAt)
  saveTodos(todos)
})

document.querySelector('#remove-todo').addEventListener('click', function() {
  removeTodo(todo.id)
  saveTodos(todos)
  location.assign('/index.html')
})

window.addEventListener('storage', function(e) {
  if (e.key === 'todos') {
    todos = JSON.parse(e.newValue)

    const todo = todos.find(todo => todo.id === todoId)
    if (todo === undefined) {
      location.assign('/index.html')
    }
    const todoText = document.querySelector('#todo-text')
    todoText.value = todo.text

    todoUpdated.textContent = generateLastEdited(todo.updatedAt)
  }
})
