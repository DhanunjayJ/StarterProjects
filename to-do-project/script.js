document.addEventListener('DOMContentLoaded', () => {
    const todoInput = document.getElementById('todo-input');
    const addButton = document.getElementById('add-btn');
    const todoList = document.getElementById('todo-list');

    // Load tasks from localStorage when the page loads
    loadTasks();

    // Function to add a new task
    function addTask() {
        const taskText = todoInput.value.trim();
        if (taskText === '') {
            alert("Please enter a task!");
            return;
        }

        const task = {
            text: taskText,
            completed: false
        };

        addTaskToDOM(task);
        saveTasks();
        todoInput.value = '';
        todoInput.focus();
    }

    // Function to create and add a task element to the DOM
    function addTaskToDOM(task) {
        const li = document.createElement('li');
        if (task.completed) {
            li.classList.add('completed');
        }

        const taskTextSpan = document.createElement('span');
        taskTextSpan.classList.add('task-text');
        taskTextSpan.textContent = task.text;
        
        // Event listener to toggle complete status
        taskTextSpan.addEventListener('click', () => {
            li.classList.toggle('completed');
            saveTasks();
        });

        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Delete';
        removeBtn.classList.add('delete-btn');

        // Event listener to remove the task
        removeBtn.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent the li click event from firing
            li.remove();
            saveTasks();
        });

        li.appendChild(taskTextSpan);
        li.appendChild(removeBtn);
        todoList.appendChild(li);
    }

    // Function to save all current tasks to localStorage
    function saveTasks() {
        const tasks = [];
        todoList.querySelectorAll('li').forEach(li => {
            tasks.push({
                text: li.querySelector('.task-text').textContent,
                completed: li.classList.contains('completed')
            });
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Function to load tasks from localStorage
    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(task => addTaskToDOM(task));
    }

    // Event Listeners
    addButton.addEventListener('click', addTask);
    todoInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTask();
        }
    });
});