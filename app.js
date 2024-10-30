const addForm = document.getElementById('add-form');
const todoInput = document.getElementById('todo-input');
const todoBoxes = document.querySelectorAll('.box');
const todoBtn = document.getElementById('todo-btn');

todoBtn.addEventListener("click",function(){
    document.getElementById("task-modal").classList.remove("hidden");
})

const close=document.getElementById("close");
close.addEventListener("click",function(){
    document.getElementById("task-modal").classList.add("hidden");
})



// validation de formulaire
function validateForm() {
  const errorTitle = document.getElementById("error-title");
  const errorDescription = document.getElementById("error-description");
  const errorStatus = document.getElementById("error-status");
  const errorDeadline = document.getElementById("error-deadline");
  const errorPriority = document.getElementById("error-priority");

  errorTitle.textContent = "";
  errorDescription.textContent = "";
  errorStatus.textContent = "";
  errorDeadline.textContent = "";
  errorPriority.textContent = "";

  const title = document.getElementById("task-title").value.trim(); //trim() bach kan7ydol lespace 
  const description = document.getElementById("task-description").value.trim();
  const status = document.getElementById("task-status").value;
  const deadline = document.getElementById("task-deadline").value;
  const priority = document.getElementById("task-priority").value;

  let isValid = true;

  if (!title) {
    errorTitle.textContent = "Le titre est requis.";
    isValid = false;
  }

  if (!description) {
    errorDescription.textContent = "La description est requise.";
    isValid = false;
  }

  if (!status) {
    errorStatus.textContent = "Veuillez sélectionner un statut.";
    isValid = false;
  }

  if (!deadline) {
    errorDeadline.textContent = "Veuillez choisir une date d'échéance.";
    isValid = false;
  } else if (new Date(deadline) < new Date()) {
    errorDeadline.textContent = "La date d'échéance doit être dans le futur.";
    isValid = false;
  }

  if (!priority) {
    errorPriority.textContent = "Veuillez choisir une priorité.";
    isValid = false;
  }

  return isValid;
}