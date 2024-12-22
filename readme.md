# List all todos
query GetTodos {
  todos {
    id
    title
    description
    completed
  }
}


# List todo by id
query GetTodoById($id: String!) {
  getTodoById(id: "1") {
    id
    title
    description
    completed
  }
}


# Create Todo
mutation CreateTodo {
  createTodo(title: "Help Divya", description: "Make Divya Smile") {
    id
    title
    description
    completed
  }
}



# Update Todo
mutation UpdateTodo {
  updateTodo(id: "2", title: "Updated Todo Title", description: "Updated Description", completed: true) {
    id
    title
    description
    completed
  }
}


# Delete Todo
mutation DeleteTodo {
  deleteTodo(id: "1")  # Replace "1" with the ID of the todo you want to delete
}
