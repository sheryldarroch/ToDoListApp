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
    view.displayTodos();
  },
  deleteTodos: function(position) {
    this.todos.splice(position, 1);
    if(this.todos.length === 0) {
      let toggleAllIcon = document.querySelector('.toggleAllIcon');
      toggleAllIcon.style.display = 'none';
    }
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

let handlers = {
  addTodo: () => {
    addTodoButton.addEventListener('click', () => {
       let todoText = document.querySelector('#addTodoTextInput'); 
       todosList.addTodos(todoText.value);
       todoText.value = '';
       view.displayTodos();
    });
  } 
};

//Call handlers
handlers.addTodo();

let view = {
  displayTodos: () => {
    let todoUl = document.querySelector('#todoList');
    let tallyCounter = document.querySelector('#tallyCounter');
    tallyCounter.innerHTML = '';
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
      todoLi.appendChild(view.createEditIcon());
      todoLi.appendChild(view.createDeleteButton());
      todoUl.appendChild(todoLi);
    });
    if(todosList.todos.length > 0) {
      let toggleAllIcon = document.querySelector('.toggleAllIcon');
      toggleAllIcon.style.display = 'block';
      view.createTallyCounter();
    }
  },
  createToggleIcon: () => {
    let todoToggleIcon = document.createElement('img');
    todoToggleIcon.className = 'toggleIcon';
    return todoToggleIcon;
  },
  createEditIcon: () => {
    let editIcon = document.createElement('img');
    editIcon.setAttribute('src','../images/edit.svg');
    editIcon.className = 'editIcon';
    return editIcon;
  },
  createEditModal: () => {
    let editModal = document.createElement('div');
    let editLink = document.createElement('span');
    let cancelLink = document.createElement('span');
    editModal.className = 'editModal';
    editLink.textContent = 'Change Todo /';
    editLink.id = 'editLink';
    cancelLink.textContent = 'Cancel';
    cancelLink.id = 'cancelLink';
    editModal.appendChild(editLink);
    editModal.appendChild(cancelLink);
    return editModal;
  },
  createEditModalEventListener: (e) => {
     e.addEventListener('click', (event) => {
       let elementClicked = event.target;
       if(elementClicked.id === 'editLink') {
          //show changeTodoModal
          let todoLi = elementClicked.parentNode.parentNode;
          todoLi.style.position = 'relative';
          todoLi.appendChild(view.createChangeTodoModal());
          let changeTodoModal = document.querySelector('.changeTodoModal');
          view.createChangeModalEventListener(changeTodoModal);
          elementClicked.parentNode.classList.remove('editModal');
          elementClicked.parentNode.innerHTML = '';
        } else {
        //close editModal
          elementClicked.parentNode.classList.remove('editModal');
          elementClicked.parentNode.innerHTML = '';
        }                          
      });
  },  
  createChangeTodoModal: () => {
    let changeTodoModal = document.createElement('div');
    let changeTodoInput = document.createElement('input');
    let changeTodoButton = document.createElement('button');
    changeTodoModal.className = 'changeTodoModal';
    changeTodoInput.setAttribute('type', 'text');
    changeTodoInput.id = 'changeTodoInput';
    changeTodoButton.textContent = 'change';
    changeTodoButton.id = 'changeTodoButton';
    changeTodoModal.appendChild(changeTodoInput);
    changeTodoModal.appendChild(changeTodoButton);
    return changeTodoModal;
  },
  createChangeModalEventListener: (e) => {
      e.addEventListener('click', (event) => {
        let elementClicked = event.target;
        if(elementClicked.id === 'changeTodoButton') {
          let changeTodoInput = document.querySelector('#changeTodoInput');
          let todoText = elementClicked.parentNode.parentNode.childNodes[1];
          todoText.textContent = changeTodoInput.value;
          elementClicked.parentNode.classList.remove('changeTodoModal');
          elementClicked.parentNode.innerHTML = '';
        }
      });
  },
  createDeleteButton: () => {
    let deleteTodoButton = document.createElement('img');
    deleteTodoButton.setAttribute('src', '../images/delete-circle.svg');
    deleteTodoButton.className = 'deleteButton';    
    return deleteTodoButton;
  },
  createTallyCounter: () => {
    let tallyCounter = document.getElementById('tallyCounter');
    let todosNumber = parseInt(todosList.todos.length);
    let todosCompleted = 0;
    
    todosList.todos.forEach(function(todo){
      if(todo.completed === true){
        todosCompleted++;
      }
    });
    
    let p = document.createElement('p');
    p.innerHTML = `${todosNumber - todosCompleted} items left`;
    tallyCounter.appendChild(p);
  },
  setUpEventListeners: () => {
    let todoUl = document.querySelector('#todoList');
    let todoToggleAllIcon = document.querySelector('.toggleAllIcon');
    let addTodoTextInput = document.querySelector('#addTodoTextInput');
    
    todoUl.addEventListener('click', (e) => {
      let elementClicked = e.target;
      let position = parseInt(elementClicked.parentNode.id);
      if(elementClicked.className === 'deleteButton') {
          todosList.deleteTodos(position);
      } else if (elementClicked.className === 'toggleIcon') {
          todosList.toggleCompleted(position);
      } else if (elementClicked.className === 'editIcon') {
            let todoLi = elementClicked.parentNode;
            todoLi.style.position = 'relative';
            todoLi.appendChild(view.createEditModal());
            let editModal = document.querySelector('.editModal');
            view.createEditModalEventListener(editModal);        
      }
    });
    todoToggleAllIcon.addEventListener('click', ()=> {
      todosList.toggleAll();      
    }); 
  }
};

view.setUpEventListeners();



