import { Component, ElementRef, EventEmitter, Input, OnInit, Output, Renderer2, ViewChild } from '@angular/core';
import { Todo, TodoActions } from 'src/app/_models/todo';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  @Input() todo!: Todo;
  @Output() todoChange: EventEmitter<{ action: TodoActions, todo: Todo }> = new EventEmitter();

  constructor() {
  }

  ngOnInit(): void {

  }

  editMode() {
    this.todo.isEdit = true;

    this.todoChange.emit({
      action: TodoActions.ON_EDIT_TODO,
      todo: this.todo
    });
  }

  cancelEdit() {
    if (!this.todo.description) {
      this.removeTodo(null);
    }
    else {
      this.todo.isEdit = false;
    }

    this.todoChange.emit({
      action: TodoActions.ON_ADD_TODO,
      todo: this.todo
    });
  }

  removeTodo($event: any) {
    if ($event) {
      $event.stopPropagation();
    }

    this.todoChange.emit({
      action: TodoActions.ON_DELETE_TODO,
      todo: this.todo
    });
  }

  checkTodo() {
    if (!this.todo.isDone) {
      this.todo.isDone = true;

      this.todoChange.emit({
        action: TodoActions.ON_DONE_TODO,
        todo: this.todo
      });
    }
  }

}
