import { todos } from './Mutation';  // Import the 'todos' array

export const Query = {
    // Fetch all todos
    todos: () => todos,

    // Fetch todo by ID
    getTodoById: (_: any, { id }: { id: string }) => {
        // Look for the todo with the specified ID in the 'todos' array
        const todo = todos.find(todo => todo.id === id);
        
        // If not found, return null or throw an error
        if (!todo) {
            console.log(typeof(id),typeof(todos[0].id))
            throw new Error(`Todo with id ${id} not found`);
        }

        return todo;
    },
};
