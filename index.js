"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var readline = require("readline");
var TodoItem = /** @class */ (function () {
    function TodoItem(text, completed) {
        if (completed === void 0) { completed = false; }
        this.text = text;
        this.completed = completed;
    }
    return TodoItem;
}());
var TodoList = /** @class */ (function () {
    function TodoList() {
        this.todoItems = [];
    }
    TodoList.prototype.addItem = function (text) {
        var todoItem = new TodoItem(text);
        this.todoItems.push(todoItem);
    };
    TodoList.prototype.markCompleted = function (index) {
        if (index >= 0 && index < this.todoItems.length) {
            this.todoItems[index].completed = true;
        }
        else {
            console.log('Invalid index.');
        }
    };
    TodoList.prototype.displayItems = function () {
        console.log('Todo List:');
        this.todoItems.forEach(function (item, index) {
            var status = item.completed ? '[x]' : '[ ]';
            console.log("".concat(index + 1, ". ").concat(status, " ").concat(item.text));
        });
    };
    return TodoList;
}());
var todoList = new TodoList();
function displayMenu() {
    console.log('===== Todo List Menu =====');
    console.log('1. Add Todo');
    console.log('2. View Todo List');
    console.log('3. Mark Todo Item as Completed');
    console.log('4. Exit');
}
function processUserInput() {
    var rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    rl.question('Select an option (1-4): ', function (choice) {
        switch (choice) {
            case '1':
                rl.question('Enter the todo item: ', function (text) {
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
                rl.question('Enter the index of the completed todo item: ', function (index) {
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
