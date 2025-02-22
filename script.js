const todoForm = document.querySelector('form');
const todoInput = document.querySelector('#todo-input');
const todoListUL = document.querySelector('#todo-list');

let allTodos = getTodos(); // Load saved todos
updateTodoList();

todoForm.addEventListener('submit', function(e) {
    e.preventDefault();
    addTodo();
});

function addTodo() {
    const todoText = todoInput.value;
    if (todoText.length > 0) {
        const todoObject = {
            text: todoText,
            completed: false
        };
        allTodos.push(todoObject);
        updateTodoList();
        saveTodos();
        todoInput.value = "";
    }
}

function updateTodoList() {
    todoListUL.innerHTML = "";
    allTodos.forEach((todo, todoIndex) => {
        let todoItem = createTodoItem(todo, todoIndex);
        todoListUL.append(todoItem);
    });
}

function createTodoItem(todo, todoIndex) {
    const todoId = "todo-" + todoIndex;
    const todoLI = document.createElement("li");
    const todoText = todo.text;
    todoLI.className = "todo";
    todoLI.innerHTML = `
        <input type="checkbox" id="${todoId}">
        <label for="${todoId}" class="custom-checkbox">
            <img src="Icons/check_24dp_5F6368_FILL0_wght400_GRAD0_opsz24.svg" alt="check mark">
        </label>
        <label for="${todoId}" class="todo-text">
            ${todoText}
        </label>
        <button class="delete">
            <img class="bin" src="Icons/delete_24dp_5F6368_FILL0_wght400_GRAD0_opsz24.svg" alt="delete icon">
        </button>
    `;

    // Fix the delete button event listener
    const deleteButton = todoLI.querySelector(".delete");
    deleteButton.addEventListener("click", () => {
        allTodos.splice(todoIndex, 1);
        updateTodoList();
        saveTodos();
    });

    // Fix the checkbox event listener
    const checkbox = todoLI.querySelector(`input[id="${todoId}"]`);
    checkbox.addEventListener("change", () => {
        allTodos[todoIndex].completed = checkbox.checked;
        saveTodos();
    });

    checkbox.checked = todo.completed;

    return todoLI;
}

function saveTodos() {
    const todosJSON = JSON.stringify(allTodos);
    localStorage.setItem("todos", todosJSON);
}

function getTodos() {
    const todos = localStorage.getItem("todos") || "[]";
    return JSON.parse(todos);
}
