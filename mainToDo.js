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
function createToDoList() {
    const name = document.getElementById('taskInputDOM').value;

    if(name === '') {
      alert('Please Enter a List Name')
    }
    else{
    const newTodoList = new Todolist(name);
    allLists.push(newTodoList);
    render();
    document.getElementById(newTodoList.id).addEventListener('click', function(e)
    {
      console.log(getTodolistById(e.target.id))
    })
     // Update the list of to-do lists
     clearInput(); // Clear the input field
    }
  }



// get a Todolist by its ID
function getTodolistById(listId) {
  return allLists.find(list => list.id === listId);
}

function currentList () {
  let currentListSelected =document.eventListener('click')
  console.log(currentListSelected)
  return currentListSelected;
}

// let currentId = currentListSelected.id; //FIXME: Replace with the ID you want to find
// const desiredList = getTodolistById(current);

// if (desiredList) {
//   // You've found the desired Todolist
//   console.log(`Found Todolist with ID ${currentId}: ${desiredList.name}`);
//   // You can access its properties and methods here, e.g., desiredList.name
// } else {
//   console.log(`Todolist with ID ${desiredListId} not found.`);
// }

function render() {
 let listDisplay = '<ul class="list-group">';
 allLists.forEach((Todolist) => {
   listDisplay += `<li class="list-group-item" id="${Todolist.id}">${Todolist.name}</li>`;
  });
  listDisplay += '</ul>';
  document.getElementById('listsDisplayDOM').innerHTML = listDisplay;

    // need to grab the current list name 
    //grap the todolist Title element
    // set the todo list name = to the element
    // render that element
    // let currentTitleofList = currentListSelected
}
 function listCreateListener() {

}
function clearInput() {
    document.getElementById('taskInputDOM').value = '';
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
 
