namespace Volunet.Entities.Entities
{
    public class Event
    {
        public int EventId{ get; set; } //primary key
        public string EventName { get; set; }
        public DateTime DateTime { get; set; }
        public double Latitude { get; set; }
        public double Longitude { get; set; }
        public string Description { get; set; }
        public string ImageUrl { get; set; }
        public int OrganizationId { get; set; } //foreign key

        // Navigation properties
        public ICollection<Category> Categories { get; set; } 
        public Organization Organization { get; set; } 


    }
}
