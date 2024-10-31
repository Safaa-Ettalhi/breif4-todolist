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
let dataTasks ;
if(localStorage.task!=null){
    dataTasks=JSON.parse(localStorage.task) ;
}else{
    dataTasks=[];
}
const ajouter = document.getElementById("add");
ajouter.addEventListener("click", function () {
  if (!validateForm()) {
    return; // break
  }
 
  const title = document.getElementById("task-title").value;
  const description = document.getElementById("task-description").value;
  const statut = document.getElementById("task-status").value;
  const deadline = document.getElementById("task-deadline").value;
  const priority = document.getElementById("task-priority").value;

  // creation d-objet task
  let newTasks = {
    Titre: title,
    Description: description,
    Statut: statut,
    Date: deadline,
    Priorite: priority,
  };

  // ajouter la tache a la liste
    dataTasks.push(newTasks);
    localStorage.setItem('task', JSON.stringify(dataTasks))
    clear();
    //fermer le model
    document.getElementById("task-modal").classList.add("hidden");
    showData();
    updateStatistics();
});
//function qui vide les values
function clear() {
    document.getElementById("task-title").value = "";
    document.getElementById("task-description").value = "";
    document.getElementById("task-status").value = "";
    document.getElementById("task-deadline").value = "";
    document.getElementById("task-priority").value = "";
  }

//laffichage des element ajouter 
function showData() {
    // Réinitialiser le contenu des conteneurs pour éviter les doublons
    document.getElementById("to-do").innerHTML = '<h3 class="heading text-lg font-bold border-b-4 border-red-600 mb-4">TODO | <span id="statistique_todo" class="text-red-600"> </span></h3>';
    document.getElementById("doing").innerHTML = '<h3 class="heading text-lg font-bold border-b-4 border-yellow-300 mb-4">DOING | <span id="statistique_doing" class="text-yellow-300"> </span></h3>';
    document.getElementById("done").innerHTML = '<h3 class="heading text-lg font-bold border-b-4 border-lime-600 mb-4">DONE | <span id="statistique_done" class="text-lime-600"> </span></h3>';
  
    // boucler sur la liste des tâches
    dataTasks.forEach((task, index) => {
      // Créer de card
      const taskCard = document.createElement("div");
      taskCard.className = "task-card bg-gray-200 p-3 rounded-md mb-3 shadow border-2"; // ajout de la classe border-2 pour des bordures
      taskCard.setAttribute("draggable", "true");

      // Ajouter la classe de couleur de bordure en fonction de la priorité
      if (task.Priorite === "P1") {
        taskCard.classList.add("border-red-500","border-l-5"); 
      } else if (task.Priorite === "P2") {
        taskCard.classList.add("border-orange-400"); 
      } else if (task.Priorite === "P3") {
        taskCard.classList.add("border-green-500"); 
      }
  
      // Créer un élément de titre
      const taskTitle = document.createElement("h4");
      taskTitle.className = "font-bold text-lg mb-1";
      taskTitle.textContent = task.Titre;
  
      // Créer d'élément description
      const taskDescription = document.createElement("h5");
      taskDescription.className = "text-sm mb-1";
      taskDescription.textContent = task.Description;
  
      // Créer d' élément  date d'échéance
      const taskDate = document.createElement("p");
      taskDate.className = "text-sm text-gray-500 mb-1";
      taskDate.textContent = `Échéance : ${task.Date}`;

      //creation dune div parent des buttons
      const buttonContainer = document.createElement("div");
       buttonContainer.className = "flex space-x-2 mt-2";

       // button update
       const updateButton = document.createElement("button");
        updateButton.className = "bg-yellow-500 text-white p-1 rounded-md";
        updateButton.textContent = "Modifier";
        updateButton.addEventListener("click", () => updateTask(index)); // Fonction pour gérer la modification

        // Créer le bouton "Supprimer"
        const deleteButton = document.createElement("button");
        deleteButton.className = "bg-red-500 text-white p-1 rounded-md";
        deleteButton.textContent = "Supprimer";
        deleteButton.addEventListener("click", () => deleteTask(index)); 
      
        buttonContainer.appendChild(updateButton);
        buttonContainer.appendChild(deleteButton);
        // Ajouter les éléments à la carte
      taskCard.appendChild(taskTitle);
      taskCard.appendChild(taskDescription);
      taskCard.appendChild(taskDate);
      taskCard.appendChild(buttonContainer);
  
      // Ajouter un attribut de data-id pour pouvoir identifier les tâches
      taskCard.setAttribute("data-id", index);
  
      // Ajouter l'élément de carte dans le conteneur correspondant au statut
      if (task.Statut === "to-do") {
        document.getElementById("to-do").appendChild(taskCard);
      } else if (task.Statut === "doing") {
        document.getElementById("doing").appendChild(taskCard);
      } else if (task.Statut === "done") {
        document.getElementById("done").appendChild(taskCard);
      }

      
    });
    updateStatistics();
    DragItem();
  }
  //function qui supprime les taches
  function deleteTask(index) {
    dataTasks.splice(index, 1); // splice Supprime la tâche de la liste
    localStorage.setItem('task', JSON.stringify(dataTasks))
    showData(); // Réaffiche les task apres les mj
    updateStatistics();
  }

// la modification
function updateTask(index) {
  const task = dataTasks[index]; // Obtenir la tâche à modifier
  document.getElementById("task-title").value = task.Titre;
  document.getElementById("task-description").value = task.Description;
  document.getElementById("task-status").value = task.Statut;
  document.getElementById("task-deadline").value = task.Date;
  document.getElementById("task-priority").value = task.Priorite;

  // Afficher le modal
  document.getElementById("task-modal").classList.remove("hidden");

  const addButton = document.getElementById("add");
  addButton.onclick = () => {
    if (!validateForm()) {
      return; 
    }
    task.Titre = document.getElementById("task-title").value;
    task.Description = document.getElementById("task-description").value;
    task.Statut = document.getElementById("task-status").value;
    task.Date = document.getElementById("task-deadline").value;
    task.Priorite = document.getElementById("task-priority").value;

    // Sauvegarder les modifications dans le localStorage
    localStorage.setItem('task', JSON.stringify(dataTasks));

    // Fermer le modal
    document.getElementById("task-modal").classList.add("hidden");

    showData();
  };
}
//statistique
function updateStatistics() {
  const todoCount = dataTasks.filter(task => task.Statut === 'to-do').length;
  const doingCount = dataTasks.filter(task => task.Statut === 'doing').length;
  const doneCount = dataTasks.filter(task => task.Statut === 'done').length;

  document.getElementById('statistique_todo').innerText = todoCount;
  document.getElementById('statistique_doing').innerText = doingCount;
  document.getElementById('statistique_done').innerText = doneCount;
}
showData();
updateStatistics();