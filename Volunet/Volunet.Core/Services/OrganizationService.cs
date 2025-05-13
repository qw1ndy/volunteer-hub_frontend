using Microsoft.EntityFrameworkCore;
using Volunet.Core.Interfaces;
using Volunet.DataAccess.Context;
using Volunet.Entities.DTOs;
using Volunet.Entities.Entities;

namespace Volunet.Core.Services;

public class OrganizationService : IOrganizationService
{
    private readonly VolunetDbContext _context;

    public OrganizationService(VolunetDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<OrganizationDto>> GetAllOrganizationsAsync()
    {
        return await _context.Set<Organization>()
            .Include(o => o.Events)
            .ThenInclude(e => e.Categories)
            .AsNoTracking()
            .Select(o => MapToOrganizationDto(o))
            .ToListAsync();
    }

    public async Task<OrganizationDto> GetOrganizationByIdAsync(int organizationId)
    {
        var organization = await _context.Set<Organization>()
            .Include(o => o.Events)
            .ThenInclude(e => e.Categories)
            .AsNoTracking()
            .FirstOrDefaultAsync(o => o.OrganizationId == organizationId);

        return organization == null ? null : MapToOrganizationDto(organization);
    }

    public async Task<OrganizationDto> CreateOrganizationAsync(string userId, CreateOrganizationDto createOrganizationDto)
    {
        var user = await _context.Users.FindAsync(userId);
        if (user == null)
            throw new InvalidOperationException("User not found");

        var organization = new Organization
        {
            OrganizationName = createOrganizationDto.OrganizationName,
            Description = createOrganizationDto.Description,
            Address = createOrganizationDto.Address,
            Users = new List<User> { user }
        };

        _context.Add(organization);
        await _context.SaveChangesAsync();

        return await GetOrganizationByIdAsync(organization.OrganizationId);
    }

    public async Task<OrganizationDto> UpdateOrganizationAsync(int organizationId, string userId, UpdateOrganizationDto updateOrganizationDto)
    {
        var organization = await _context.Set<Organization>()
            .Include(o => o.Users)
            .FirstOrDefaultAsync(o => o.OrganizationId == organizationId);

        if (organization == null)
            return null;

        if (!organization.Users.Any(u => u.Id == userId))
            throw new UnauthorizedAccessException("User is not a member of this organization");

        organization.OrganizationName = updateOrganizationDto.OrganizationName ?? organization.OrganizationName;
        organization.Description = updateOrganizationDto.Description ?? organization.Description;
        organization.Address = updateOrganizationDto.Address ?? organization.Address;

        await _context.SaveChangesAsync();
        return await GetOrganizationByIdAsync(organizationId);
    }

    public async Task<bool> DeleteOrganizationAsync(int organizationId, string userId)
    {
        var organization = await _context.Set<Organization>()
            .Include(o => o.Users)
            .FirstOrDefaultAsync(o => o.OrganizationId == organizationId);

        if (organization == null)
            return false;

        if (!organization.Users.Any(u => u.Id == userId))
            throw new UnauthorizedAccessException("User is not a member of this organization");

        _context.Remove(organization);
        await _context.SaveChangesAsync();
        return true;
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

        return await GetEventByIdAsync(organizationId, @event.EventId);
    }

    public async Task<EventDto> UpdateEventAsync(int organizationId, int eventId, string userId, UpdateEventDto updateEventDto)
    {
        var organization = await _context.Set<Organization>()
            .Include(o => o.Users)
            .FirstOrDefaultAsync(o => o.OrganizationId == organizationId);

        if (organization == null)
            throw new InvalidOperationException("Organization not found");

        if (!organization.Users.Any(u => u.Id == userId))
            throw new UnauthorizedAccessException("User is not a member of this organization");

        var @event = await _context.Set<Event>()
            .Include(e => e.Categories)
            .FirstOrDefaultAsync(e => e.EventId == eventId && e.OrganizationId == organizationId);

        if (@event == null)
            return null;

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
        return await GetEventByIdAsync(organizationId, eventId);
    }

    public async Task<bool> DeleteEventAsync(int organizationId, int eventId, string userId)
    {
        var organization = await _context.Set<Organization>()
            .Include(o => o.Users)
            .FirstOrDefaultAsync(o => o.OrganizationId == organizationId);

        if (organization == null || !organization.Users.Any(u => u.Id == userId))
            throw new UnauthorizedAccessException("User is not a member of this organization");

        var @event = await _context.Set<Event>()
            .FirstOrDefaultAsync(e => e.EventId == eventId && e.OrganizationId == organizationId);

        if (@event == null)
            return false;

        _context.Remove(@event);
        await _context.SaveChangesAsync();
        return true;
    }

    public async Task<IEnumerable<EventDto>> GetOrganizationEventsAsync(int organizationId)
    {
        return await _context.Set<Event>()
            .Include(e => e.Categories)
            .Where(e => e.OrganizationId == organizationId)
            .AsNoTracking()
            .Select(e => MapToEventDto(e))
            .ToListAsync();
    }

    public async Task<EventDto> GetEventByIdAsync(int organizationId, int eventId)
    {
        var @event = await _context.Set<Event>()
            .Include(e => e.Categories)
            .AsNoTracking()
            .FirstOrDefaultAsync(e => e.EventId == eventId && e.OrganizationId == organizationId);

        return @event == null ? null : MapToEventDto(@event);
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

    private static OrganizationDto MapToOrganizationDto(Organization organization)
    {
        return new OrganizationDto
        {
            OrganizationId = organization.OrganizationId,
            OrganizationName = organization.OrganizationName,
            Description = organization.Description,
            Address = organization.Address,
            Events = organization.Events?.Select(MapToEventDto).ToList()
        };
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