using Microsoft.EntityFrameworkCore;
using Volunet.Core.Interfaces;
using Volunet.DataAccess.Context;
using Volunet.Entities.DTOs;
using Volunet.Entities.Entities;

namespace Volunet.Core.Services;

public class EventService : IEventService
{
    private readonly VolunetDbContext _context;

    public EventService(VolunetDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<EventDto>> GetAllEventsAsync()
    {
        return await _context.Set<Event>()
            .Include(e => e.Categories)
            .Include(e => e.Organization)
            .AsNoTracking()
            .Select(e => MapToEventDto(e))
            .ToListAsync();
    }

    public async Task<EventDto> GetEventByIdAsync(int eventId)
    {
        var @event = await _context.Set<Event>()
            .Include(e => e.Categories)
            .Include(e => e.Organization)
            .AsNoTracking()
            .FirstOrDefaultAsync(e => e.EventId == eventId);

        return @event == null ? null : MapToEventDto(@event);
    }

    public async Task<IEnumerable<EventDto>> GetEventsByOrganizationAsync(int organizationId)
    {
        return await _context.Set<Event>()
            .Include(e => e.Categories)
            .Include(e => e.Organization)
            .Where(e => e.OrganizationId == organizationId)
            .AsNoTracking()
            .Select(e => MapToEventDto(e))
            .ToListAsync();
    }

    public async Task<IEnumerable<EventDto>> GetEventsByCategoryAsync(string categoryName)
    {
        return await _context.Set<Event>()
            .Include(e => e.Categories)
            .Include(e => e.Organization)
            .Where(e => e.Categories.Any(c => c.CategoryName == categoryName))
            .AsNoTracking()
            .Select(e => MapToEventDto(e))
            .ToListAsync();
    }

    public async Task<EventDto> CreateEventAsync(int organizationId, string userId, CreateEventDto createEventDto)
    {
        var organization = await _context.Set<Organization>()
            .Include(o => o.Users)
            .FirstOrDefaultAsync(o => o.OrganizationId == organizationId);

        if (organization == null)
            throw new InvalidOperationException("Organization not found");

        if (!organization.Users.Any(u => u.Id == userId))
            throw new UnauthorizedAccessException("User is not a member of this organization");

        var categories = await GetOrCreateCategories(createEventDto.Categories);

        var @event = new Event
        {
            EventName = createEventDto.EventName,
            DateTime = createEventDto.DateTime,
            Latitude = createEventDto.Latitude,
            Longitude = createEventDto.Longitude,
            Description = createEventDto.Description,
            ImageUrl = createEventDto.ImageUrl,
            OrganizationId = organizationId,
            Categories = categories
        };

        _context.Add(@event);
        await _context.SaveChangesAsync();

        return await GetEventByIdAsync(@event.EventId);
    }

    public async Task<EventDto> UpdateEventAsync(int eventId, string userId, UpdateEventDto updateEventDto)
    {
        var @event = await _context.Set<Event>()
            .Include(e => e.Categories)
            .Include(e => e.Organization)
            .ThenInclude(o => o.Users)
            .FirstOrDefaultAsync(e => e.EventId == eventId);

        if (@event == null)
            return null;

        if (!@event.Organization.Users.Any(u => u.Id == userId))
            throw new UnauthorizedAccessException("User is not a member of this organization");

        @event.EventName = updateEventDto.EventName ?? @event.EventName;
        @event.DateTime = updateEventDto.DateTime ?? @event.DateTime;
        @event.Latitude = updateEventDto.Latitude ?? @event.Latitude;
        @event.Longitude = updateEventDto.Longitude ?? @event.Longitude;
        @event.Description = updateEventDto.Description ?? @event.Description;
        @event.ImageUrl = updateEventDto.ImageUrl ?? @event.ImageUrl;

        if (updateEventDto.Categories != null && updateEventDto.Categories.Any())
        {
            var categories = await GetOrCreateCategories(updateEventDto.Categories);
            @event.Categories = categories;
        }

        await _context.SaveChangesAsync();
        return await GetEventByIdAsync(eventId);
    }

    public async Task<bool> DeleteEventAsync(int eventId, string userId)
    {
        var @event = await _context.Set<Event>()
            .Include(e => e.Organization)
            .ThenInclude(o => o.Users)
            .FirstOrDefaultAsync(e => e.EventId == eventId);

        if (@event == null)
            return false;

        if (!@event.Organization.Users.Any(u => u.Id == userId))
            throw new UnauthorizedAccessException("User is not a member of this organization");

        _context.Remove(@event);
        await _context.SaveChangesAsync();
        return true;
    }

    private async Task<ICollection<Category>> GetOrCreateCategories(IEnumerable<string> categoryNames)
    {
        var categories = new List<Category>();
        foreach (var categoryName in categoryNames)
        {
            var category = await _context.Set<Category>()
                .FirstOrDefaultAsync(c => c.CategoryName == categoryName);

            if (category == null)
            {
                category = new Category { CategoryName = categoryName };
                _context.Add(category);
            }

            categories.Add(category);
        }

        return categories;
    }

    private static EventDto MapToEventDto(Event @event)
    {
        return new EventDto
        {
            EventId = @event.EventId,
            EventName = @event.EventName,
            DateTime = @event.DateTime,
            Latitude = @event.Latitude,
            Longitude = @event.Longitude,
            Description = @event.Description,
            ImageUrl = @event.ImageUrl,
            OrganizationId = @event.OrganizationId,
            Categories = @event.Categories?.Select(c => c.CategoryName).ToList()
        };
    }
} 