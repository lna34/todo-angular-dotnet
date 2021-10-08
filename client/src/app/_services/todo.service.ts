import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Todo } from '../_models/todo';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  baseUrl = "http://localhost:5000/api/Todo/"
  constructor(private http: HttpClient) { }

  getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.baseUrl);
  }

  addTodo(todo: Todo): Observable<Todo> {
    return this.http.post<Todo>(this.baseUrl, { Description: todo.description, IsDone: todo.isDone, Id: todo.id });
  }

  updateTodo(todo: Todo): Observable<Todo> {
    return this.http.put<Todo>(this.baseUrl, { Description: todo.description, IsDone: todo.isDone, Id: todo.id });
  }

  removeTodo(todo: Todo) {
    return this.http.delete(this.baseUrl + todo.id);
  }

}
