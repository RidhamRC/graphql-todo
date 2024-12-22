import { PubSub } from "graphql-subscriptions";
const pubSub = new PubSub();
const TODO_CREATED = "TODO_CREATED";
const TODO_UPDATED = "TODO_UPDATED";
const TODO_DELETED = "TODO_DELETED";

const todos = [
    { id: "1", title: "Learn GraphQL", description: "Understand GraphQL basics", completed: false},
    { id: "2", title: "Build GraphQL API", description: "Create a GraphQL API for todos", completed: true },
];

export const Mutation = {
    createTodo: (_: any, { title, description }: { title: string; description: string }) => {
        const newTodo = {
            id: Date.now().toString(),
            title,
            description,
            completed: false
        };
        todos.push(newTodo);
        pubSub.publish(TODO_CREATED, { todoCreated: newTodo });
        return newTodo;
    },

    updateTodo: (_: any, { id, title, description, completed }: { id: string, title?: string, description?: string, completed?: boolean }) => {
        const todoIndex = todos.findIndex(todo => todo.id === id);
        if (todoIndex === -1) {
            throw new Error("Todo not found");
        }

        // Ensure default values for optional fields
        const updatedTodo = { 
            ...todos[todoIndex], 
            title: title ?? todos[todoIndex].title,   // If title is undefined, keep the old one
            description: description ?? todos[todoIndex].description, // Same for description
            completed: completed ?? todos[todoIndex].completed, // Same for completed
        };
        todos[todoIndex] = updatedTodo;
        pubSub.publish(TODO_UPDATED, { todoUpdated: updatedTodo });
        return updatedTodo;
    },

    deleteTodo: (_: any, { id }: { id: string }) => {
        const todoIndex = todos.findIndex(todo => todo.id === id);
        if (todoIndex === -1) {
            throw new Error("Todo not found");
        }
        todos.splice(todoIndex, 1);
        pubSub.publish(TODO_DELETED, { todoDeleted: id });
        return true;
    }
};


export { pubSub, TODO_CREATED, TODO_UPDATED, TODO_DELETED,todos };
