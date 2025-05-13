using System.ComponentModel.DataAnnotations;

namespace Volunet.Entities.DTOs;

public class OrganizationDto
{
    public int OrganizationId { get; set; }
    public string OrganizationName { get; set; }
    public string Description { get; set; }
    public string Address { get; set; }
    public string Contact { get; set; }
    public ICollection<EventDto> Events { get; set; }
}

public class CreateOrganizationDto
{
    [Required]
    [StringLength(150)]
    public string OrganizationName { get; set; }
    
    [StringLength(500)]
    public string Description { get; set; }
    
    [Required]
    [StringLength(200)]
    public string Address { get; set; }
    
    [StringLength(250)]
    public string Contact { get; set; }
}

public class UpdateOrganizationDto
{
    [StringLength(150)]
    public string OrganizationName { get; set; }
    
    [StringLength(500)]
    public string Description { get; set; }
    
    [StringLength(200)]
    public string Address { get; set; }
    
    [StringLength(250)]
    public string Contact { get; set; }
}

public class EventDto
{
    public int EventId { get; set; }
    public string EventName { get; set; }
    public DateTime DateTime { get; set; }
    public double Latitude { get; set; }
    public double Longitude { get; set; }
    public string Description { get; set; }
    public string ImageUrl { get; set; }
    public int OrganizationId { get; set; }
    public ICollection<string> Categories { get; set; }
}

public class CreateEventDto
{
    [Required]
    [StringLength(100)]
    public string EventName { get; set; }
    
    [Required]
    public DateTime DateTime { get; set; }
    
    [Required]
    [Range(-90, 90)]
    public double Latitude { get; set; }
    
    [Required]
    [Range(-180, 180)]
    public double Longitude { get; set; }
    
    [StringLength(500)]
    public string Description { get; set; }
    
    [StringLength(200)]
    [Url]
    public string ImageUrl { get; set; }
    
    [Required]
    public ICollection<string> Categories { get; set; }
}

public class UpdateEventDto
{
    [StringLength(100)]
    public string EventName { get; set; }
    
    public DateTime? DateTime { get; set; }
    
    [Range(-90, 90)]
    public double? Latitude { get; set; }
    
    [Range(-180, 180)]
    public double? Longitude { get; set; }
    
    [StringLength(500)]
    public string Description { get; set; }
    
    [StringLength(200)]
    [Url]
    public string ImageUrl { get; set; }
    
    public ICollection<string> Categories { get; set; }
} 