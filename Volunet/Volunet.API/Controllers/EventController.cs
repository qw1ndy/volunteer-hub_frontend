using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using Volunet.Core.Interfaces;
using Volunet.Entities.DTOs;

namespace Volunet.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class EventController : ControllerBase
{
    private readonly IEventService _eventService;

    public EventController(IEventService eventService)
    {
        _eventService = eventService;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<EventDto>>> GetAllEvents()
    {
        var events = await _eventService.GetAllEventsAsync();
        return Ok(events);
    }

    [HttpGet("{eventId}")]
    public async Task<ActionResult<EventDto>> GetEvent(int eventId)
    {
        var @event = await _eventService.GetEventByIdAsync(eventId);
        if (@event == null)
            return NotFound();

        return Ok(@event);
    }

    [HttpGet("organization/{organizationId}")]
    public async Task<ActionResult<IEnumerable<EventDto>>> GetEventsByOrganization(int organizationId)
    {
        var events = await _eventService.GetEventsByOrganizationAsync(organizationId);
        return Ok(events);
    }

    [HttpGet("category/{categoryName}")]
    public async Task<ActionResult<IEnumerable<EventDto>>> GetEventsByCategory(string categoryName)
    {
        var events = await _eventService.GetEventsByCategoryAsync(categoryName);
        return Ok(events);
    }

    [Authorize]
    [HttpPost("organization/{organizationId}")]
    public async Task<ActionResult<EventDto>> CreateEvent(int organizationId, [FromBody] CreateEventDto createEventDto)
    {
        try
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var @event = await _eventService.CreateEventAsync(organizationId, userId, createEventDto);
            return CreatedAtAction(nameof(GetEvent), new { eventId = @event.EventId }, @event);
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
    [HttpPut("{eventId}")]
    public async Task<ActionResult<EventDto>> UpdateEvent(int eventId, [FromBody] UpdateEventDto updateEventDto)
    {
        try
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var @event = await _eventService.UpdateEventAsync(eventId, userId, updateEventDto);
            
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
    [HttpDelete("{eventId}")]
    public async Task<IActionResult> DeleteEvent(int eventId)
    {
        try
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var result = await _eventService.DeleteEventAsync(eventId, userId);
            
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