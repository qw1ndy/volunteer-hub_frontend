using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using Volunet.Core.Interfaces;
using Volunet.Entities.DTOs;

namespace Volunet.API.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class ProfileController : ControllerBase
{
    private readonly IProfileService _profileService;

    public ProfileController(IProfileService profileService)
    {
        _profileService = profileService;
    }

    [HttpGet]
    public async Task<ActionResult<ProfileDto>> GetProfile()
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        var profile = await _profileService.GetProfileAsync(userId);
        
        if (profile == null)
            return NotFound();

        return Ok(profile);
    }

    [HttpPut]
    public async Task<ActionResult<ProfileDto>> UpdateProfile([FromBody] UpdateProfileDto updateProfileDto)
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        var updatedProfile = await _profileService.UpdateProfileAsync(userId, updateProfileDto);
        
        if (updatedProfile == null)
            return NotFound();

        return Ok(updatedProfile);
    }

    [HttpDelete]
    public async Task<IActionResult> DeleteProfile()
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        var result = await _profileService.DeleteProfileAsync(userId);
        
        if (!result)
            return NotFound();

        return NoContent();
    }
} 