'use strict';
 const allLists = []


const templateList = {
    id: generateSecureRandomId(),
    title: "",
    todos: [
        {
            id: generateSecureRandomId(),
            text: '',
            completed: false
        },
        {
            id: generateSecureRandomId(),
            text: '',
            completed: false
        },
        {
            id: generateSecureRandomId(),
            text: '',
            completed: false
        }
    ]
}
class Todolist {
    constructor(name) {
        this.name = name;
        this.id = generateSecureRandomId();
        this.todos = [];
    }
}
// creating list
function createToDoList() {
  const name = document.getElementById('taskInputDOM').value;
  
  if(name === '') {
    alert('Please Enter a List Name')
  }
  else{
    const newTodoList = new Todolist(name);
    allLists.push(newTodoList);
    currentListSelected = newTodoList;
    save ();
    render();
    clearInput(); 
    return newTodoList;
  }
}
// creating todos
function createToDo(){
 let currentListOfTodos = currentListSelected.todos;
 let textInput = document.getElementById('createNewTodoDOM').value;
 if(currentListOfTodos) {
if(textInput === ''){
  alert('please enter a name for the todo')
} else{
 const newTodo = {
  id: generateSecureRandomId(),
  text: textInput,
  completed: false
}
currentListOfTodos.push(newTodo);
}
render()
clearInput();
} else {
  alert('Please Create a List First');
}
}
function listInputEnter(event) {
  if (event.keyCode === 13 ) {
      if(event.target === document.getElementById('taskInputDOM')){createToDoList()} 
      else {
        createToDo();
      } 
  }};
var currentListSelected = {}
let buttonClicked = false;
function targetCurrentList() {
  let items = document.querySelectorAll('.individualTodoList');
  items.forEach(newTodoList => {
      newTodoList.addEventListener('click', function(e) {
      currentListSelected = getTodolistById(e.target.id); 
      if(!buttonClicked) {
        save ()
        render();
      }
    });
    })
  };
  




function getTodolistById(listId) {
  return allLists.find(list => list.id === listId);
}

function deleteCurrentTodo(todoId) {
  if (currentListSelected && currentListSelected.todos) {
    //trying to add an animation class
    const domCurrentTodo = document.getElementById(todoId)
    domCurrentTodo.classList.add('animate__animated');
    domCurrentTodo.classList.add('animate__bounce');
    currentListSelected.todos = currentListSelected.todos.filter(todo => todo.id !== todoId);
    save ()
    render();
  }
}
function deleteCurrentList(){
  if (currentListSelected) {
    const listIndex = allLists.findIndex(list => list.id === currentListSelected.id);

    if (listIndex !== -1) {
      allLists.splice(listIndex, 1);
      currentListSelected = {};
      removeTitle();
      save ();
      render();
    }
  }
}
function deleteAllCompletedTodos() {
  if (currentListSelected && currentListSelected.todos) {
    currentListSelected.todos = currentListSelected.todos.filter(todo => !todo.completed);
    save ()
    render();
  }
}
function editListTitle(todoId) {
const editTitleInput = document.getElementById(`editTitleInput-${todoId}`)
const replaceTitleText = document.getElementById(`replaceTitle-${todoId}`)
editTitleInput.style.display = 'inline';
replaceTitleText.style.display ='none';
buttonClicked = true;
};
function updateListTitle(listId, event) {
  if(event.keyCode === 13) {
    const editListInput = document.getElementById(`editTitleInput-${listId}`)
    editListInput.style.display = 'none';
   const currentList = allLists.find(list => list.id === listId)
    currentList.name = editListInput.value
    buttonClicked = false;
    currentListSelected = currentList;
    save ()
    render();
}
};

 function editTodoName(todoId) {
const editInput = document.getElementById(`editInput-${todoId}`)
const replaceText = document.getElementById(`replace-${todoId}`)
editInput.style.display = 'inline';
replaceText.style.display ='none';
editInput.value = replaceText.textContent;
};
function updateTodoName(todoId, event) {
 if(event.keyCode === 13) {
  const editInput = document.getElementById(`editInput-${todoId}`)
  editInput.style.display = 'none';
 const currentTodo = currentListSelected.todos.find(todoItem => todoItem.id === todoId)
  currentTodo.text = editInput.value
  save ()
 render();
 }
};
function checkbox() {
   if(currentListSelected && currentListSelected.todos) {
  currentListSelected.todos.forEach((todo) => {
    const currentCheck = document.getElementById(`check-${todo.id}`);
    if(currentCheck != null){
    currentCheck.addEventListener('change', function () {
     todo.completed = currentCheck.checked 
     save ()
        });
  };})}};
  
  function render() {
    
    let listDisplay = '<ul class="list-group">';
    allLists.forEach((Todolist) => {
      listDisplay += `<li class="list-group-item individualTodoList d-flex justify-content-between" id="${Todolist.id}">
      <span id="replaceTitle-${Todolist.id}">${Todolist.name}</span>
      <input type="text" id="editTitleInput-${Todolist.id}" class="edit-input" onkeydown=" updateListTitle('${Todolist.id}',event)">
      <span><i onclick="deleteCurrentList()" class="fa-solid fa-trash"></i>
      <i onclick="editListTitle('${Todolist.id}')" class="fa-regular fa-pen-to-square listEditButton"></i></span></li>`;
    });
    listDisplay += '</ul>';
    document.getElementById('listsDisplayDOM').innerHTML = listDisplay;
    
    // Check if currentListSelected is defined and has a todos property
    const currentListTodos = currentListSelected ? currentListSelected.todos : [];
    
    // Initialize todoListDisplay
    let todoListDisplay = '<ul class="list-group">';
    
    // Iterate through currentListTodos
    if (currentListTodos) {
      currentListTodos.forEach((object) => {
        todoListDisplay += `<li class="list-group-item individualTodoList d-flex justify-content-around p-2" id="${object.id}">
            <input type="checkbox" id="${'check-' + object.id}" ${object.completed ? 'checked' : ''}>
            <span id="replace-${object.id}">${object.text}</span>
            <input type="text" id="editInput-${object.id}" class="edit-input" onkeydown="updateTodoName('${object.id}', event)">
            <span>
            <i onclick="deleteCurrentTodo('${object.id}')" class="fa-solid fa-trash"></i>
            <i onclick="editTodoName('${object.id}')" class="fa-regular fa-pen-to-square"></i></span>
        </li>`;
      });
      todoListDisplay += '</ul>';
    }
    
    // Clear existing todo list items display
    document.getElementById('toDoListItemsDisplay').innerHTML = '';
    targetCurrentList();
    // Render the updated todo list
    document.getElementById('toDoListItemsDisplay').innerHTML = todoListDisplay;
    
    if (currentListSelected && currentListSelected.name) {
      const titleDisplay = document.getElementById('toDoListTitle');
      titleDisplay.innerHTML = currentListSelected.name;
    }
    checkbox();
    save ()
  }
  
function clearInput() {
    document.getElementById('taskInputDOM').value = '';
    document.getElementById('createNewTodoDOM').value = '';
  }
  function removeTitle(){
    document.getElementById('toDoListTitle').innerHTML = '';
  }
  //random id generator 
  function generateSecureRandomId() {
    const length = 200;
    const randomValues = new Uint32Array(length / 4); // Each Uint32 gives 4 bytes of randomness
    window.crypto.getRandomValues(randomValues);
    
    const randomChars = Array.from(randomValues, (value) =>
    String.fromCharCode((value % 26) + 97) // Map to lowercase letters (a-z)
    );
    
    return randomChars.join('');
  }
function load (){
const saveLists = JSON.parse(localStorage.getItem('allLists'));
const savedCurrentList = JSON.parse(localStorage.getItem('currentListSelected'));
if(saveLists) {
  allLists.legth = 0;
  allLists.push(...saveLists);
}
if (savedCurrentList) {
  currentListSelected = allLists.find(list => list.id === savedCurrentList.id)
}
render();
}
function save () {
localStorage.setItem('currentListSelected', JSON.stringify(currentListSelected))
localStorage.setItem('allLists', JSON.stringify(allLists))
}
window.addEventListener('load',load());






