import { Component, OnInit } from '@angular/core';
import { Todo, TodoActions } from '../_models/todo';
import { TodoService } from '../_services/todo.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
  todos: Todo[] = [];
  doneTodos: Todo[] = [];
  isEditing: boolean = false;

  constructor(private todoService: TodoService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.loadTodos();
  }

  loadTodos() {
    this.todoService.getTodos().subscribe(todos => {
      this.todos = todos.filter(t => !t.isDone);
      this.doneTodos = todos.filter(t => t.isDone);
    }, error => {
      this.toastr.error(error);
    });
  }

  addTodo() {
    let newTodo: Todo = {
      id: "",
      description: "",
      isDone: false,
      isEdit: true,
      isDisabled: false
    };

    this.todos.push(newTodo);

    this.onTodoChange({
      todo: newTodo,
      action: TodoActions.ON_EDIT_TODO
    });

    this.isEditing = true;
  }

  onTodoChange($event: { action: TodoActions, todo: Todo }) {
    if ($event.action == TodoActions.ON_ADD_TODO) {
      if ($event.todo.id === "") {
        this.todoService.addTodo($event.todo).subscribe(todo => {
          this.loadTodos();
        }, error => {
          this.toastr.error(error)
        });
      } else {
        this.todoService.updateTodo($event.todo).subscribe(todo => {
          this.loadTodos();
        }, error => {
          this.toastr.error(error)
        });
      }
    }

    if ($event.action == TodoActions.ON_DELETE_TODO) {
      this.todoService.removeTodo($event.todo).subscribe(todo => {
        this.loadTodos();
      }, error => {
        this.toastr.error(error)
      });
    }


    if ($event.action == TodoActions.ON_EDIT_TODO) {
      const arr = [...this.todos];

      arr.filter(t => t != $event.todo).forEach(item => {
        item.isDisabled = true;
      });

      this.todos = arr;
    }

    if ($event.action == TodoActions.ON_DONE_TODO) {
      this.todoService.updateTodo($event.todo).subscribe((todo) => {
        this.loadTodos();
      });
    }

    this.isEditing = false;
  }

}
