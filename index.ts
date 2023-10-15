import * as readline from 'readline';
class TodoItem {
    constructor(public text: string, public completed: boolean = false) {}
  }
  
  class TodoList {
    private todoItems: TodoItem[] = [];
  
    public addItem(text: string): void {
      const todoItem = new TodoItem(text);
      this.todoItems.push(todoItem);
    }
  
    public markCompleted(index: number): void {
      if (index >= 0 && index < this.todoItems.length) {
        this.todoItems[index].completed = true;
      } else {
        console.log('Invalid index.');
      }
    }
  
    public displayItems(): void {
      console.log('Todo List:');
      this.todoItems.forEach((item, index) => {
        const status = item.completed ? '[x]' : '[ ]';
        console.log(`${index + 1}. ${status} ${item.text}`);
      });
    }
  }
  
  const todoList = new TodoList();
  
  function displayMenu() {
    console.log('===== Todo List Menu =====');
    console.log('1. Add Todo');
    console.log('2. View Todo List');
    console.log('3. Mark Todo Item as Completed');
    console.log('4. Exit');
  }
  
  function processUserInput() {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
  
    rl.question('Select an option (1-4): ', (choice) => {
      switch (choice) {
        case '1':
          rl.question('Enter the todo item: ', (text) => {
            todoList.addItem(text);
            console.log('Todo item added.');
            displayMenu();
            processUserInput();
          });
          break;
  
        case '2':
          todoList.displayItems();
          displayMenu();
          processUserInput();
          break;
  
        case '3':
          rl.question('Enter the index of the completed todo item: ', (index) => {
            todoList.markCompleted(parseInt(index, 10) - 1);
            console.log('Todo item marked as completed.');
            displayMenu();
            processUserInput();
          });
          break;
  
        case '4':
          rl.close();
          break;
  
        default:
          console.log('Invalid choice. Please try again.');
          displayMenu();
          processUserInput();
      }
    });
  }
  
  console.log('Welcome to the Todo List App!');
  displayMenu();
  processUserInput();
  