const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
const completedCounter = document.getElementById("completed-counter");
const uncompletedCounter = document.getElementById("uncompleted-counter");

function AddTask() {
  const task = inputBox.value.trim();
  if (!task) {
    alert("Please add a task");
    return;
  }

  const li = document.createElement("li");
  li.innerHTML = `
    <label>
      <input type="checkbox">
      <span>${task}</span>
    </label>
    <span class="edit-btn">Edit</span>
    <span class="delete-btn">Delete</span>
  `;

  const checkbox = li.querySelector("input");
  const editBtn = li.querySelector(".edit-btn");
  const deleteBtn = li.querySelector(".delete-btn");
  const taskSpan = li.querySelector("span");

  // Toggle completed state
  checkbox.addEventListener("click", () => {
    li.classList.toggle("completed", checkbox.checked);
    updateCounters();
  });

  // Edit task
  editBtn.addEventListener("click", () => {
    const update = prompt("Edit your task", taskSpan.textContent);
    if (update != null && update.trim() !== "") {
      taskSpan.textContent = update.trim();
      li.classList.remove("completed");
      checkbox.checked = false; // Reset checkbox
      updateCounters();
    }
  });

  // Delete task
  deleteBtn.addEventListener("click", () => {
    if (confirm("Are you sure you want to delete the task?")) {
      li.remove();
      updateCounters();
    }
  });

  listContainer.appendChild(li);
  inputBox.value = "";
  updateCounters(); // Ensure counters update when a new task is added
}

function updateCounters() {
  const allTasks = listContainer.querySelectorAll("li").length;
  const completedTasks = listContainer.querySelectorAll(".completed").length;
  const uncompletedTasks = allTasks - completedTasks;

  completedCounter.textContent = completedTasks;
  uncompletedCounter.textContent = uncompletedTasks;
}
