using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TodosAPI.Data;
using TodosAPI.Entities;
using TodosAPI.Interfaces;

namespace TodosAPI.Services
{
    public class TodoService : ITodoService
    {
        private readonly DataContext context;

        public TodoService(DataContext context)
        {
            this.context = context;
        }

        public async Task<Todo> AddTodo(Todo todo)
        {
            await context.Todos.AddAsync(todo);

            return todo;
        }

        public async Task<Todo> GetTodo(string todoId)
        {
            return await context.Todos.FindAsync(todoId);
        }

        public async Task<IEnumerable<Todo>> GetTodos()
        {
            return await context.Todos.ToListAsync();
        }

        public async Task RemoveTodo(Todo todo)
        {
            context.Todos.Remove(todo);
        }

        public async Task<bool> SaveAllAsync()
        {
            return await context.SaveChangesAsync() > 0;
        }

        public async Task<Todo> UpdateTodo(Todo todo)
        {
            if (todo is null)
            {
                throw new ArgumentNullException(nameof(todo));
            }

            context.Todos.Update(todo);

            return todo;
        }

    }
}
