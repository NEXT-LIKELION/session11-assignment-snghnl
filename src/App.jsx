import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Container, Box, Typography, Snackbar } from "@mui/material";
import { useState, useEffect } from "react";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";

const darkTheme = createTheme({
    palette: {
        mode: "dark",
    },
});

function App() {
    const [todos, setTodos] = useState([]);
    const [priority, setPriority] = useState("medium");
    const [inputValue, setInputValue] = useState("");
    const [open, setOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");

    useEffect(() => {
        fetch("/src/assets/data.json")
            .then((response) => response.json())
            .then((data) => setTodos(data));
    }, []);

    useEffect(() => {
        if (todos.length > 0) {
            const lastAdded = todos[todos.length - 1];
            setSnackbarMessage(`${lastAdded.task} added!`);
            setOpen(true);
        }
    }, [todos]);

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const handlePriorityChange = (e) => {
        setPriority(e.target.value);
    };

    const handleAddTodo = () => {
        if (inputValue.trim()) {
            setTodos([
                ...todos,
                { task: inputValue, priority: priority, isDone: false },
            ]);
            setInputValue("");
        }
    };

    const handleToggleTodo = (index) => {
        setTodos(
            todos.map((todo, i) =>
                i === index ? { ...todo, isDone: !todo.isDone } : todo
            )
        );
    };

    const handleCloseSnackbar = () => {
        setOpen(false);
    };

    return (
        <Box
            sx={{
                minHeight: "100vh",
                width: "100vw",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <Container
                maxWidth="md"
                sx={{
                    py: 4,
                    width: "60%",
                    minWidth: "800px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    margin: "0 auto",
                }}
            >
                <Typography
                    variant="h4"
                    component="h1"
                    gutterBottom
                    align="center"
                    fontWeight="bold"
                >
                    NEXT Todo App
                </Typography>
                <TodoForm
                    inputValue={inputValue}
                    handleInputChange={handleInputChange}
                    handleAddTodo={handleAddTodo}
                    handlePriorityChange={handlePriorityChange}
                    priority={priority}
                />
                <TodoList todos={todos} handleToggleTodo={handleToggleTodo} />
                <Snackbar
                    anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                    open={open}
                    onClose={handleCloseSnackbar}
                    message={snackbarMessage}
                    autoHideDuration={3000}
                />
            </Container>
        </Box>
    );
}

export default App;
