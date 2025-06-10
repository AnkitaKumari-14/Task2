document.addEventListener('DOMContentLoaded', loadTasks);

function addTask() {
  const taskInput = document.getElementById('taskInput');
  const taskText = taskInput.value.trim();
  if (taskText === '') return;

  const task = { text: taskText, completed: false };
  saveTask(task);
  renderTask(task);
  taskInput.value = '';
}

function renderTask(task, index = null) {
  const taskList = document.getElementById('taskList');

  const li = document.createElement('li');
  if (task.completed) li.classList.add('completed');
  li.innerHTML = `
    <span onclick="toggleTask(this)">${task.text}</span>
    <span onclick="deleteTask(this)">×</span>
  `;
  taskList.appendChild(li);
}

function toggleTask(span) {
  const li = span.parentElement;
  li.classList.toggle('completed');
  updateLocalStorage();
}

function deleteTask(span) {
  const li = span.parentElement;
  li.remove();
  updateLocalStorage();
}

function saveTask(task) {
  const tasks = getTasks();
  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function getTasks() {
  return JSON.parse(localStorage.getItem('tasks')) || [];
}

function loadTasks() {
  const tasks = getTasks();
  tasks.forEach(task => renderTask(task));
}

function updateLocalStorage() {
  const listItems = document.querySelectorAll('#taskList li');
  const tasks = Array.from(listItems).map(li => ({
    text: li.firstElementChild.textContent,
    completed: li.classList.contains('completed')
  }));
  localStorage.setItem('tasks', JSON.stringify(tasks));
}
