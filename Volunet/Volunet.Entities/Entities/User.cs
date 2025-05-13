using Microsoft.AspNetCore.Identity;

namespace Volunet.Entities.Entities;

public class User:IdentityUser
{
    public string Address { get; set; }
    public int UserAge { get; set; }
    public string ProfilePictureUrl { get; set; }
    public string Description { get; set; }

    // Navigation properties
    public virtual ICollection<Organization> Organizations { get; set; } 
}