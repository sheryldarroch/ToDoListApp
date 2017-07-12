let todosList = {
  todos: [],
  displayTodos: function() {
    if(this.todos.length === 0) {
      console.log('Your todo list is empty.');
    } else {
      for(let i = 0; i < this.todos.length; i++) {
        if(this.todos[i].completed === true) {
          console.log('(x) ', this.todos[i].todoText);
        } else {
          console.log('( ) ', this.todos[i].todoText);
        }  
      }
    }
  },
  addTodos: function(todoText) {
    this.todos.push({
      todoText: todoText,
      completed: false
    });
    this.displayTodos();
  },
  changeTodos: function(position, todoText) {
    this.todos[position].todoText = todoText;
    this.displayTodos();
  },
  deleteTodos: function(position) {
    this.todos.splice(position, 1);
    this.displayTodos();
  },
  toggleCompleted: function(position) {
    let todo = this.todos[position];
    todo.completed = !todo.completed;
    this.displayTodos();
  },
  toggleAll: function() {
    let totalTodos = this.todos.length;
    let completedTodos = 0;
    
    //get number of completed todos
    for(let i = 0; i < this.todos.length; i++) {
      if(this.todos[i].completed === true) {
          completedTodos++;
      }
    }
    //if everything is true, make everything false
    if(totalTodos === completedTodos) {
        for(let i=0; i < totalTodos; i++) {
            this.todos[i].completed = false;    
        }
    } else {
        for(let i=0; i < totalTodos; i++) {
            this.todos[i].completed = true; 
      }
    }
    this.displayTodos();
  }
};

const displayTodosButton = document.querySelector('#displayTodosButton');
const toggleAllButton = document.querySelector('#toggleAllButton');
const addTodoButton = document.querySelector('#addTodoButton');
const changeTodoButton = document.querySelector('#changeTodoButton');
const deleteTodoButton = document.querySelector('#deleteTodoButton');
const toggleCompletedButton = document.querySelector('#toggleCompletedButton');

let handlers = {
  displayTodos: () => {
     displayTodosButton.addEventListener('click', () => {
        todosList.displayTodos();                                   
    }); 
  },
  toggleAll: () => {
    toggleAllButton.addEventListener('click', () => {
        todosList.toggleAll();
    });  
  },
  addTodo: () => {
    addTodoButton.addEventListener('click', () => {
       let todoText = document.querySelector('#addTodoTextInput'); 
       todosList.addTodos(todoText.value);
       todoText.value = '';
    });  
  },
  changeTodo: () => {
    changeTodoButton.addEventListener('click', () => {
        let todoText = document.querySelector('#changeTodoTextInput');
        let position = document.querySelector('#changeTodoNumberInput');
        todosList.changeTodos(parseInt(position.value), todoText.value);
        todoText.value = '';
        position.value = '';
    });
  },
  deleteTodo: () => {
    deleteTodoButton.addEventListener('click', () => {
        let position = document.querySelector('#deleteTodoNumberInput');
        todosList.deleteTodos(parseInt(position.value));
        position.value = '';
    });
  },
  toggleCompleted: () => {
    toggleCompletedButton.addEventListener('click', () => {
        let position = document.querySelector('#toggleCompletedNumberInput');
        todosList.toggleCompleted(parseInt(position.value));
        position.value = '';                                               
    });
  }
};

//Call handlers
handlers.displayTodos();
handlers.toggleAll();
handlers.addTodo();
handlers.changeTodo();
handlers.deleteTodo();
handlers.toggleCompleted();



