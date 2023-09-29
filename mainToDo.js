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
     // Update the list of to-do lists
     clearInput(); // Clear the input field
    }
  }

function render() {
 let listDisplay = '<ul class="list-group">';
 allLists.forEach((Todolist) => {
   listDisplay += `<li class="list-group-item">${Todolist.name}</li>`;
  });
  listDisplay += '</ul>';
  document.getElementById('listsDisplayDOM').innerHTML = listDisplay;
  
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
  
  // set up random Id object finder
  // have a click function that assings  the random Id to the todolist.id
  // then run the function to set selected object to the random id.
  // then output the name of the object and the todos of the object in a list
  
  // function currentListSelected () {
  //   //need to connect the clicked lists on the side to grab its id and then set it equal to its targetId
  //   document.querySelector('.list-group-item').addEventListener('click', currentListSelected(){
  //     target(Todolist.id)= targetId;
  //   });
  // }
   
  //   event
  //   Todolist.id(eventListener(onclick)) = targetId
  //   return targetId;
   

  // function getObjectById(allLists, targetId) {
  //   for (let i = 0; i < allLists.length; i++) {
  //     if (allLists[i].id === targetId) {
  //       let currentList = allLists[i]
  //       return currentList; // Return the object with the matching id
  //     }
  //   }
  //   return null; // Return null if no object with the specified id is found
  // }
 
