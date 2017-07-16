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
  },
  toggleCompleted: function(position) {
    let todo = this.todos[position];
    todo.completed = !todo.completed;
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
  }
};

const toggleAllButton = document.querySelector('#toggleAllButton');
const addTodoButton = document.querySelector('#addTodoButton');
const changeTodoButton = document.querySelector('#changeTodoButton');
const toggleCompletedButton = document.querySelector('#toggleCompletedButton');

let handlers = {
  toggleAll: () => {
    toggleAllButton.addEventListener('click', () => {
        todosList.toggleAll();
        view.displayTodos();
    });  
  },
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
  },
  deleteTodo: position => {
        todosList.deleteTodos(position);
        view.displayTodos();
  },
  toggleCompleted: () => {
    toggleCompletedButton.addEventListener('click', () => {
        let position = document.querySelector('#toggleCompletedNumberInput');
        todosList.toggleCompleted(parseInt(position.value));
        position.value = '';
        view.displayTodos();
    });
  }
};

//Call handlers
handlers.toggleAll();
handlers.addTodo();
handlers.changeTodo();
//handlers.deleteTodo();
handlers.toggleCompleted();

let view = {
  displayTodos: () => {
    let todoUl = document.querySelector('#todoList');
    todoUl.innerHTML = '';
    todosList.todos.forEach(function(todo, position) {
      let todoLi = document.createElement('li');
      let todoText = todo.todoText;
      let todoCompleted = todo.completed;
  
      if(todoCompleted === true) {
           todoLi.textContent = `(x) ${todoText}`;
        } else {
            todoLi.textContent = `( ) ${todoText}`;
          } 
      todoLi.id = position;
      todoLi.appendChild(view.createDeleteButton());
      todoUl.appendChild(todoLi);
    });
  },
  createDeleteButton: () => {
    let deleteTodoButton = document.createElement('button');
    deleteTodoButton.textContent = 'Delete';
    deleteTodoButton.className = 'deleteButton';
    return deleteTodoButton;
  },
  setUpEventListeners: () => {
    let todoUl = document.querySelector('#todoList');

    todoUl.addEventListener('click', (e) => {
      let elementClicked = e.target;
      if(elementClicked.className === 'deleteButton') {
          handlers.deleteTodo(parseInt(elementClicked.parentNode.id));
      }
    });
  }
};

view.setUpEventListeners();

