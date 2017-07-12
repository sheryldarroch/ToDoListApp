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
