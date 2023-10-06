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
    render();
    clearInput(); 
    return newTodoList;
  }
}
// creating todos
function createToDo(){
 let currentListOfTodos = currentListSelected.todos;
 let textInput = document.getElementById('createNewTodoDOM').value;
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
// create the todo template, fill in the info, then print all todo lists on screen. each individual todo is in own list
// select individual todo, set it = to selectedToDo
// create functions for todo

}
function listInputEnter(event) {
  if (event.keyCode === 13 ) {
      if(event.target === document.getElementById('taskInputDOM')){createToDoList()} 
      else {
        createToDo();
      } 
  }};
let currentListSelected = {}
function targetCurrentList() {
  let items = document.querySelectorAll('.individualTodoList');
  items.forEach(newTodoList => {
    newTodoList.addEventListener('click', function(e) {
      currentListSelected = getTodolistById(e.target.id);
      render(); // Call render only when needed
    });
  });
}


function getTodolistById(listId) {
  return allLists.find(list => list.id === listId);
}

function deleteCurrentTodo(){

}
function render() {
  let listDisplay = '<ul class="list-group">';
  allLists.forEach((Todolist) => {
    listDisplay += `<li class="list-group-item individualTodoList" id="${Todolist.id}">${Todolist.name}</li>`;
  });
  listDisplay += '</ul>';
  document.getElementById('listsDisplayDOM').innerHTML = listDisplay;

  // Set currentListSelected based on user's click
  targetCurrentList();

  // Check if currentListSelected is defined and has a todos property
  const currentListTodos = currentListSelected ? currentListSelected.todos : [];

  // Initialize todoListDisplay
  let todoListDisplay = '<ul class="list-group">';

  // Iterate through currentListTodos
  currentListTodos.forEach((object) => {
    todoListDisplay += `<li class="list-group-item individualTodoList" id="${object.id}">${object.text}</li>`;
  });

  todoListDisplay += '</ul>';
  document.getElementById('toDoListItemsDisplay').innerHTML = todoListDisplay;

  console.log('the render function happened');
  console.log('currentListSelected')
}


function clearInput() {
    document.getElementById('taskInputDOM').value = '';
    document.getElementById('createNewTodoDOM').value = '';
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
  



// document.addEventListener('click',render())
//render function












//I want to have a selected list function. I want its id stored as the current id
// then I want to call the render function inside the selected list function. 
// render function will display the todos and name of list.



  // 
   
/* remove list function
- make icon next to todos and lists
when list is clicked add an onclick to run remove function
then remove function should be currenttodo.remove,
or if list currentlist.remove
*/

/*
create todo function
-

function addTodo() {
 // get the todo text from the todo input box
 const text = document.getElementById('todo-input-box').value;
 if(text) {
   currentList.todos.push({
     text: text,
     completed: false
   })
   render();
 }
}
*/

/* mark Todo as complete
-when box is checked add eventlistener for checked box.
then run function mark todo as complete.
this will change the checked boxes checked to true. use event.target to target the same object that was checked.
*/
/*remove all todos I want to create a trash icon by the name.
this will remove all todos in the list by clearing the array of todos.

*/
















  // function getObjectById(allLists, targetId) {
  //   for (let i = 0; i < allLists.length; i++) {
  //     if (allLists[i].id === targetId) {
  //       let currentList = allLists[i]
  //       return currentList; // Return the object with the matching id
  //     }
  //   }
  //   return null; // Return null if no object with the specified id is found
  // }
 
