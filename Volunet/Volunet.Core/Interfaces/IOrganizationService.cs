using Volunet.Entities.DTOs;

namespace Volunet.Core.Interfaces;

public interface IOrganizationService
{
    Task<IEnumerable<OrganizationDto>> GetAllOrganizationsAsync();
    Task<OrganizationDto> GetOrganizationByIdAsync(int organizationId);
    Task<OrganizationDto> CreateOrganizationAsync(string userId, CreateOrganizationDto createOrganizationDto);
    Task<OrganizationDto> UpdateOrganizationAsync(int organizationId, string userId, UpdateOrganizationDto updateOrganizationDto);
    Task<bool> DeleteOrganizationAsync(int organizationId, string userId);
    
    // Event management
    Task<EventDto> CreateEventAsync(int organizationId, string userId, CreateEventDto createEventDto);
    Task<EventDto> UpdateEventAsync(int organizationId, int eventId, string userId, UpdateEventDto updateEventDto);
    Task<bool> DeleteEventAsync(int organizationId, int eventId, string userId);
    Task<IEnumerable<EventDto>> GetOrganizationEventsAsync(int organizationId);
    Task<EventDto> GetEventByIdAsync(int organizationId, int eventId);
} 