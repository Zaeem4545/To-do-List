// Get page elements
const addTaskBtn = document.getElementById('addTaskBtn');
const clearTasksBtn = document.getElementById('clearTasksBtn');
const taskList = document.getElementById('taskList');
const taskFormContainer = document.getElementById('taskFormContainer');
const taskForm = document.getElementById('taskForm');
const taskTitleInput = document.getElementById('taskTitle');
const taskDescInput = document.getElementById('taskDesc');
const cancelBtn = document.getElementById('cancelBtn');

// Task array
let tasks = [];
let editingTaskIndex = null;




//  function to handle showing or hiding elements
const toggleDisplay = (element, show) => element.style.display = show ? 'block' : 'none';

//  function to create button event handlers
const handleButton = (button, handler) => button.addEventListener('click', handler);




// Load tasks from localStorage
const loadTasks = () => {
  const saved = localStorage.getItem('tasks');
  if (saved) tasks = JSON.parse(saved);
};
// Save tasks to localStorage
const saveTasks = () => localStorage.setItem('tasks', JSON.stringify(tasks));




// Show all tasks using forEach
const showTasks = () => {
  taskList.innerHTML = '';
  if (tasks.length === 0) {
    taskList.innerHTML = '<p>No tasks yet.</p>';
    return;
  }

  const template = document.getElementById('taskTemplate');

  tasks.forEach((task, i) => {
    const clone = template.content.cloneNode(true);
    clone.querySelector('.task-title').textContent = task.title;
    clone.querySelector('.task-desc').textContent = task.description;

    // Using HOF to attach button handlers
    handleButton(clone.querySelector('.edit-btn'), () => editTask(i));
    handleButton(clone.querySelector('.delete-btn'), () => removeTask(i));

    taskList.appendChild(clone);
  });
};





// Add or Edit Task
const saveTask = () => (e) => {
  e.preventDefault();
  var title = taskTitleInput.value;
  var desc = taskDescInput.value;

  if (editingTaskIndex === null) {
    tasks = [...tasks, { title, description: desc }];
  } 
  else {
    tasks = tasks.map((task, index) =>
      index === editingTaskIndex ? { title, description: desc } : task
    );
  }
  
  saveTasks();
  showTasks();
  toggleDisplay(taskFormContainer, false);
  taskForm.reset();
  editingTaskIndex = null;
};




//  Edit Task 
const editTask = (index) => {
  toggleDisplay(taskFormContainer, true);
  taskTitleInput.value = tasks[index].title;
  taskDescInput.value = tasks[index].description;
  editingTaskIndex = index;
};






// Remove Task using filter
const removeTask = (index) => {
  if (confirm('Delete this task?')) {
    tasks = tasks.filter((_, i) => i !== index);
    saveTasks();
    showTasks();
  }
};





// Clear All Tasks 
const clearAllTasks = () => {
  if (tasks.length && confirm('Clear all tasks?')) {
    tasks = [];
    saveTasks();
    showTasks();
  }
};





// Attach button 
handleButton(addTaskBtn, () => {
  toggleDisplay(taskFormContainer, true);
  taskForm.reset();
  editingTaskIndex = null;
});





handleButton(cancelBtn, () => {
  toggleDisplay(taskFormContainer, false);
  taskForm.reset();
  editingTaskIndex = null;
});

handleButton(clearTasksBtn, clearAllTasks);


// Form submission
taskForm.addEventListener('submit', saveTask());



// If reload page, load tasks
loadTasks();
showTasks();
