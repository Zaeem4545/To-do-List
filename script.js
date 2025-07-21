// Get page elements
var addTaskBtn = document.getElementById('addTaskBtn');
var clearTasksBtn = document.getElementById('clearTasksBtn');
var taskList = document.getElementById('taskList');
var taskFormContainer = document.getElementById('taskFormContainer');
var taskForm = document.getElementById('taskForm');
var taskTitleInput = document.getElementById('taskTitle');
var taskDescInput = document.getElementById('taskDesc');
var cancelBtn = document.getElementById('cancelBtn');

// This will hold all tasks
var tasks = [];
// This remembers if we are editing a task
var editingTaskIndex = null;

// Show all tasks on the page
function showTasks() {
  taskList.innerHTML = '';
  if (tasks.length === 0) {
    taskList.innerHTML = '<p>No tasks yet.</p>';
    return;
  }
  for (var i = 0; i < tasks.length; i++) {
    var task = tasks[i];
    var div = document.createElement('div');
    div.className = 'task-item';
    // Show title and description
    div.innerHTML =
      '<div class="task-info">' +
        '<div class="task-title">' + task.title + '</div>' +
        '<div class="task-desc">' + task.description + '</div>' +
      '</div>' +
      '<div class="task-actions">' +
        '<button onclick="editTask(' + i + ')">Update</button>' +
        '<button onclick="removeTask(' + i + ')">Delete</button>' +
      '</div>';
    taskList.appendChild(div);
  }
}

// Save tasks to localStorage
function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Load tasks from localStorage
function loadTasks() {
  var saved = localStorage.getItem('tasks');
  if (saved) {
    tasks = JSON.parse(saved);
  }
}

// Show the form to add a new task
addTaskBtn.onclick = function() {
  taskFormContainer.style.display = 'block';
  taskForm.reset();
  editingTaskIndex = null;
};

// Hide the form
cancelBtn.onclick = function() {
  taskFormContainer.style.display = 'none';
  taskForm.reset();
  editingTaskIndex = null;
};

// When the form is submitted (Save button)
taskForm.onsubmit = function(e) {
  e.preventDefault();
  var title = taskTitleInput.value;
  var desc = taskDescInput.value;
  if (editingTaskIndex === null) {
    // Add new task
    tasks.push({ title: title, description: desc });
  } else {
    // Update existing task
    tasks[editingTaskIndex] = { title: title, description: desc };
  }
  saveTasks();
  showTasks();
  taskFormContainer.style.display = 'none';
  taskForm.reset();
  editingTaskIndex = null;
};

// Edit a task
window.editTask = function(index) {
  taskFormContainer.style.display = 'block';
  taskTitleInput.value = tasks[index].title;
  taskDescInput.value = tasks[index].description;
  editingTaskIndex = index;
};

// Remove a task
window.removeTask = function(index) {
  if (confirm('Delete this task?')) {
    tasks.splice(index, 1);
    saveTasks();
    showTasks();
  }
};

// Clear all tasks
clearTasksBtn.onclick = function() {
  if (tasks.length === 0) return;
  if (confirm('Clear all tasks?')) {
    tasks = [];
    saveTasks();
    showTasks();
  }
};

// When the page loads, show all tasks
loadTasks();
showTasks();
