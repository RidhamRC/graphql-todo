import AWS from "aws-sdk";



AWS.config.update({
    region: 'us-east-1',  // Replace with your region, e.g., "us-west-2", "eu-central-1"
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,  // Replace with your access key
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});


// Configure AWS SDK
const dynamoDb = new AWS.DynamoDB.DocumentClient();

// DynamoDB Table Name
const TODOS_TABLE = "Todos";  // Change this based on your DynamoDB table name

export const Query = {
    // Fetch all todos
    todos: async () => {
        const params = {
            TableName: TODOS_TABLE,
        };

        try {
            const result = await dynamoDb.scan(params).promise();  // Scan to get all todos
            return result.Items;  // Return the list of todos
        } catch (error) {
            console.error("Error fetching todos", error);
            throw new Error("Could not fetch todos");
        }
    },

    // Fetch todo by ID
    getTodoById: async (_: any, { id }: { id: string }) => {
        const params = {
            TableName: TODOS_TABLE,
            Key: { id },
        };

        try {
            const result = await dynamoDb.get(params).promise();
            if (!result.Item) {
                throw new Error(`Todo with id ${id} not found`);
            }
            return result.Item;  // Return the found todo
        } catch (error) {
            console.error("Error fetching todo by ID", error);
            throw new Error(`Todo with id ${id} not found`);
        }
    },
};
