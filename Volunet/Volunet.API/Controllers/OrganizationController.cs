using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using Volunet.Core.Interfaces;
using Volunet.Entities.DTOs;

namespace Volunet.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class OrganizationController : ControllerBase
{
    private readonly IOrganizationService _organizationService;

    public OrganizationController(IOrganizationService organizationService)
    {
        _organizationService = organizationService;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<OrganizationDto>>> GetAllOrganizations()
    {
        var organizations = await _organizationService.GetAllOrganizationsAsync();
        return Ok(organizations);
    }

    [HttpGet("{organizationId}")]
    public async Task<ActionResult<OrganizationDto>> GetOrganization(int organizationId)
    {
        var organization = await _organizationService.GetOrganizationByIdAsync(organizationId);
        if (organization == null)
            return NotFound();

        return Ok(organization);
    }

    [Authorize]
    [HttpPost]
    public async Task<ActionResult<OrganizationDto>> CreateOrganization([FromBody] CreateOrganizationDto createOrganizationDto)
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        var organization = await _organizationService.CreateOrganizationAsync(userId, createOrganizationDto);
        return CreatedAtAction(nameof(GetOrganization), new { organizationId = organization.OrganizationId }, organization);
    }

    [Authorize]
    [HttpPut("{organizationId}")]
    public async Task<ActionResult<OrganizationDto>> UpdateOrganization(int organizationId, [FromBody] UpdateOrganizationDto updateOrganizationDto)
    {
        try
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var organization = await _organizationService.UpdateOrganizationAsync(organizationId, userId, updateOrganizationDto);
            
            if (organization == null)
                return NotFound();

            return Ok(organization);
        }
        catch (UnauthorizedAccessException)
        {
            return Forbid();
        }
    }

    [Authorize]
    [HttpDelete("{organizationId}")]
    public async Task<IActionResult> DeleteOrganization(int organizationId)
    {
        try
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var result = await _organizationService.DeleteOrganizationAsync(organizationId, userId);
            
            if (!result)
                return NotFound();

            return NoContent();
        }
        catch (UnauthorizedAccessException)
        {
            return Forbid();
        }
    }

    // Event management endpoints
    [HttpGet("{organizationId}/events")]
    public async Task<ActionResult<IEnumerable<EventDto>>> GetOrganizationEvents(int organizationId)
    {
        var events = await _organizationService.GetOrganizationEventsAsync(organizationId);
        return Ok(events);
    }

    [HttpGet("{organizationId}/events/{eventId}")]
    public async Task<ActionResult<EventDto>> GetEvent(int organizationId, int eventId)
    {
        var @event = await _organizationService.GetEventByIdAsync(organizationId, eventId);
        if (@event == null)
            return NotFound();

        return Ok(@event);
    }

    [Authorize]
    [HttpPost("{organizationId}/events")]
    public async Task<ActionResult<EventDto>> CreateEvent(int organizationId, [FromBody] CreateEventDto createEventDto)
    {
        try
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var @event = await _organizationService.CreateEventAsync(organizationId, userId, createEventDto);
            return CreatedAtAction(nameof(GetEvent), new { organizationId, eventId = @event.EventId }, @event);
        }
        catch (UnauthorizedAccessException)
        {
            return Forbid();
        }
        catch (InvalidOperationException ex)
        {
            return BadRequest(ex.Message);
        }
    }

    [Authorize]
    [HttpPut("{organizationId}/events/{eventId}")]
    public async Task<ActionResult<EventDto>> UpdateEvent(int organizationId, int eventId, [FromBody] UpdateEventDto updateEventDto)
    {
        try
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var @event = await _organizationService.UpdateEventAsync(organizationId, eventId, userId, updateEventDto);
            
            if (@event == null)
                return NotFound();

            return Ok(@event);
        }
        catch (UnauthorizedAccessException)
        {
            return Forbid();
        }
        catch (InvalidOperationException ex)
        {
            return BadRequest(ex.Message);
        }
    }

    [Authorize]
    [HttpDelete("{organizationId}/events/{eventId}")]
    public async Task<IActionResult> DeleteEvent(int organizationId, int eventId)
    {
        try
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var result = await _organizationService.DeleteEventAsync(organizationId, eventId, userId);
            
            if (!result)
                return NotFound();

            return NoContent();
        }
        catch (UnauthorizedAccessException)
        {
            return Forbid();
        }
    }
} 