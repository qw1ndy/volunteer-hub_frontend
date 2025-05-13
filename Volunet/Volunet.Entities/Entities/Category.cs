namespace Volunet.Entities.Entities
{
    public class Category
    {
        public int CategoryId {get; set; }	//primary key
        public string CategoryName { get; set; }


        // Navigation properties
        public ICollection<Event> Events{ get; set; } 
    }
}
