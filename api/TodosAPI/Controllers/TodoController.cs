using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TodosAPI.Entities;
using TodosAPI.Interfaces;

namespace TodosAPI.Controllers
{
    [Route("api/Todo")]
    [AllowAnonymous]
    public class TodoController : Controller
    {
        private readonly ITodoService todoService;

        public TodoController(ITodoService todoService)
        {
            this.todoService = todoService;
        }

        /// <summary>
        /// Get the <see cref="Todo"/> entities.
        /// </summary>
        /// <returns>The <see cref="Todo"/> entities.</returns>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Todo>>> GetTodos()
        {
            var todos = await todoService.GetTodos();

            return Ok(todos);
        }

        /// <summary>
        /// Add the Todo entity.
        /// </summary>
        /// <param name="todo">The <see cref="Todo"/> entity to be added </param>
        /// <returns>The added Todo entity</returns>
        [HttpPost]
        public async Task<ActionResult<Todo>> AddTodo([FromBody] Todo todo)
        {
            if (todo is null)
            {
                throw new ArgumentNullException(nameof(todo));
            }

            Todo todoToAdd = new Todo()
            {
                Id = Guid.NewGuid().ToString(),
                Description = todo.Description,
                IsDone = false
            };

            Todo todoAdded = await todoService.AddTodo(todoToAdd);

            await todoService.SaveAllAsync();

            return todoAdded;
        }

        /// <summary>
        /// Update the Todo entity.
        /// </summary>
        /// <param name="id">The <see cref="Todo"/> identifier </param>
        /// <returns>The updated todo entity</returns>
        [HttpPut]
        public async Task<ActionResult<Todo>> UpdateTodo([FromBody] Todo todo)
        {
            if (todo is null)
            {
                throw new ArgumentNullException(nameof(todo));
            }

            Todo todoToUpdate = new Todo()
            {
                Id = todo.Id,
                Description = todo.Description,
                IsDone = todo.IsDone
            };

            Todo todoUpdated = await todoService.UpdateTodo(todoToUpdate);

            await todoService.SaveAllAsync();

            return todoUpdated;
        }

        /// <summary>
        /// Delete the Todo entity.
        /// </summary>
        /// <param name="id">The <see cref="Todo"/> identifier </param>
        /// <returns></returns>
        [HttpDelete("{id}")]
        public async Task<ActionResult> RemoveTodo(string id)
        {
            if (string.IsNullOrWhiteSpace(id))
            {
                throw new ArgumentException($"'{nameof(id)}' ne peut pas avoir une valeur null ou être un espace blanc.", nameof(id));
            }

            var todoToRemove = await todoService.GetTodo(id);

            if (todoToRemove == null)
            {
                return NotFound();
            }

            await todoService.RemoveTodo(todoToRemove);

            await todoService.SaveAllAsync();

            return NoContent();
        }
    }
}
