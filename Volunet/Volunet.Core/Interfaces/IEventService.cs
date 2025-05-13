using Volunet.Entities.DTOs;

namespace Volunet.Core.Interfaces;

public interface IEventService
{
    Task<IEnumerable<EventDto>> GetAllEventsAsync();
    Task<EventDto> GetEventByIdAsync(int eventId);
    Task<IEnumerable<EventDto>> GetEventsByOrganizationAsync(int organizationId);
    Task<IEnumerable<EventDto>> GetEventsByCategoryAsync(string categoryName);
    Task<EventDto> CreateEventAsync(int organizationId, string userId, CreateEventDto createEventDto);
    Task<EventDto> UpdateEventAsync(int eventId, string userId, UpdateEventDto updateEventDto);
    Task<bool> DeleteEventAsync(int eventId, string userId);
} 