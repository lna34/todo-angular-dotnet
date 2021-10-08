using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TodosAPI.Entities
{
    public class Todo
    {
        public string Id { get; set; }
        public string Description { get; set; }
        public bool IsDone { get; set; }
    }
}
