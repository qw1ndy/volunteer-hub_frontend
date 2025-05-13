using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Volunet.Entities.Entities
{
    public class Organization
    {
        public int OrganizationId { get; set; }
        public string OrganizationName { get; set; }
        public string Description { get; set; }
        public string Address { get; set; }

        // Navigation properties
        public virtual ICollection<Event> Events { get; set; }
        public virtual ICollection<User> Users { get; set; } 
    }
}
