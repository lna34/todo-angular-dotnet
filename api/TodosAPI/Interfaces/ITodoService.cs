using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TodosAPI.Entities;

namespace TodosAPI.Interfaces
{
    public interface ITodoService
    {
        Task<Todo> GetTodo(string todoId);
        Task<IEnumerable<Todo>> GetTodos();

        Task RemoveTodo(Todo todo);

        Task<Todo> AddTodo(Todo todo);
        Task<Todo> UpdateTodo(Todo todo);
        Task<bool> SaveAllAsync();

    }
}
