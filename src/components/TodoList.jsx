import { List, ListItem, ListItemText, Checkbox } from "@mui/material";
import TodoItem from "./TodoItem";

const todoItem = [
    {
        task: "Complete project documentation",
        priority: "high",
        isDone: false,
    },
    {
        task: "Buy groceries",
        priority: "medium",
        isDone: false,
    },
    {
        task: "Schedule dentist appointment",
        priority: "low",
        isDone: true,
    },
    {
        task: "Review pull requests",
        priority: "high",
        isDone: false,
    },
    {
        task: "Call mom",
        priority: "medium",
        isDone: true,
    },
    {
        task: "Update resume",
        priority: "high",
        isDone: false,
    },
];

const TodoList = ({ todos, handleToggleTodo }) => {
    return (
        <List>
            {todos.map((todo, index) => (
                <TodoItem
                    todo={todo}
                    handleToggleTodo={handleToggleTodo}
                    index={index}
                />
            ))}
        </List>
    );
};
export default TodoList;
