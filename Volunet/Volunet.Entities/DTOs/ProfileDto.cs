using System.ComponentModel.DataAnnotations;

namespace Volunet.Entities.DTOs;

public class ProfileDto
{
    public string Id { get; set; }
    public string UserName { get; set; }
    public string Email { get; set; }
    public string Address { get; set; }
    public int UserAge { get; set; }
    public string ProfilePictureUrl { get; set; }
    public string Description { get; set; }
}

public class UpdateProfileDto
{
    [StringLength(100)]
    public string UserName { get; set; }
    
    [StringLength(200)]
    public string Address { get; set; }
    
    public int UserAge { get; set; }
    
    [StringLength(500)]
    public string Description { get; set; }
    
    [StringLength(2000)]
    [Url]
    public string ProfilePictureUrl { get; set; }
} 