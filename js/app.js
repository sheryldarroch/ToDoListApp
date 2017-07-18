let todosList = {
  todos: [],
  addTodos: function(todoText) {
    this.todos.push({
      todoText: todoText,
      completed: false
    });
  },
  changeTodos: function(position, todoText) {
    this.todos[position].todoText = todoText;
  },
  deleteTodos: function(position) {
    this.todos.splice(position, 1);
    view.displayTodos();
  },
  toggleCompleted: function(position) {
    let todo = this.todos[position];
    todo.completed = !todo.completed;
    view.displayTodos();
  },
  toggleAll: function() {
    let totalTodos = this.todos.length;
    let completedTodos = 0;
    
    //get number of completed todos
    this.todos.forEach(function(todo) {
      if(todo.completed ===true) {
        completedTodos++;
      }
    });
    
    this.todos.forEach(function(todo) {
      //if everything is true, make everything false
      if(completedTodos === totalTodos) {
        todo.completed = false;
      //otherwise, make everything true
      } else {
          todo.completed = true;
      }
    });
  view.displayTodos();
  }
};

const addTodoButton = document.querySelector('#addTodoButton');
const changeTodoButton = document.querySelector('#changeTodoButton');


let handlers = {
  addTodo: () => {
    addTodoButton.addEventListener('click', () => {
       let todoText = document.querySelector('#addTodoTextInput'); 
       todosList.addTodos(todoText.value);
       todoText.value = '';
       view.displayTodos();
    });  
  },
  changeTodo: () => {
    changeTodoButton.addEventListener('click', () => {
        let todoText = document.querySelector('#changeTodoTextInput');
        let position = document.querySelector('#changeTodoNumberInput');
        todosList.changeTodos(parseInt(position.value), todoText.value);
        todoText.value = '';
        position.value = '';
        view.displayTodos();
    });
  }
};

//Call handlers
handlers.addTodo();
handlers.changeTodo();

let view = {
  displayTodos: () => {
    let todoUl = document.querySelector('#todoList');
    todoUl.innerHTML = '';
    todosList.todos.forEach(function(todo, position) {
      let todoLi = document.createElement('li');
      let todoText = todo.todoText;
      let todoCompleted = todo.completed;
      let todoToggleIcon = view.createToggleIcon();
      let todoTextTag = document.createElement('p');
      todoLi.className = 'todoItem';
      todoLi.id = position;
      todoTextTag.textContent = todoText; 
      
      if(todoCompleted === true) {
           todoToggleIcon.setAttribute('src', '../images/check-mark.svg');
           todoTextTag.style.color = '#999';
           todoTextTag.style.textDecoration = 'line-through'; 
        } else {
            todoToggleIcon.setAttribute('src', '../images/circle.svg');
          } 

      todoLi.appendChild(todoToggleIcon);
      todoLi.appendChild(todoTextTag);
      todoLi.appendChild(view.createDeleteButton());
      todoUl.appendChild(todoLi);
    });
  },
  createToggleIcon: () => {
    let todoToggleIcon = document.createElement('img');
    todoToggleIcon.className = 'toggleIcon';
    return todoToggleIcon;
  },
  createDeleteButton: () => {
    let deleteTodoButton = document.createElement('button');
    deleteTodoButton.textContent = 'Delete';
    deleteTodoButton.className = 'deleteButton';
    return deleteTodoButton;
  },
//  createTallyCounter: () => {
//    let tallyCounter = document.getElementById('tallyCounter');
//    let todosNumber = parseInt(todosList.todos.length);
//    let p = tallyCounter.innerHTML = '<p>';
//    p += todosNumber + ' items left</p>';
//    return p;
//  },
  setUpEventListeners: () => {
    let todoUl = document.querySelector('#todoList');
    let todoToggleAllIcon = document.querySelector('.toggleAllIcon');

    todoUl.addEventListener('click', (e) => {
      let elementClicked = e.target;
      let position = parseInt(elementClicked.parentNode.id);
      if(elementClicked.className === 'deleteButton') {
          todosList.deleteTodos(position);
      } else if (elementClicked.className === 'toggleIcon') {
            todosList.toggleCompleted(position);
        }
    });
    todoToggleAllIcon.addEventListener('click', ()=> {
      todosList.toggleAll();      
    });    
  }
};

view.setUpEventListeners();



