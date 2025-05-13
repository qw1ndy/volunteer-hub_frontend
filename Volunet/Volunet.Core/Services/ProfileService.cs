using Microsoft.EntityFrameworkCore;
using Volunet.Core.Interfaces;
using Volunet.DataAccess.Context;
using Volunet.Entities.DTOs;
using Volunet.Entities.Entities;

namespace Volunet.Core.Services;

public class ProfileService : IProfileService
{
    private readonly VolunetDbContext _context;

    public ProfileService(VolunetDbContext context)
    {
        _context = context;
    }

    public async Task<ProfileDto> GetProfileAsync(string userId)
    {
        var user = await _context.Users
            .AsNoTracking()
            .FirstOrDefaultAsync(u => u.Id == userId);
            
        if (user == null)
            return null;

        return new ProfileDto
        {
            Id = user.Id,
            UserName = user.UserName,
            Email = user.Email,
            Address = user.Address,
            UserAge = user.UserAge,
            ProfilePictureUrl = user.ProfilePictureUrl,
            Description = user.Description
        };
    }

    public async Task<ProfileDto> UpdateProfileAsync(string userId, UpdateProfileDto updateProfileDto)
    {
        var user = await _context.Users.FindAsync(userId);
        if (user == null)
            return null;

        user.UserName = updateProfileDto.UserName ?? user.UserName;
        user.Address = updateProfileDto.Address ?? user.Address;
        user.UserAge = updateProfileDto.UserAge;
        user.Description = updateProfileDto.Description ?? user.Description;
        user.ProfilePictureUrl = updateProfileDto.ProfilePictureUrl ?? user.ProfilePictureUrl;

        try
        {
            await _context.SaveChangesAsync();
            return await GetProfileAsync(userId);
        }
        catch (DbUpdateException ex)
        {
            throw new InvalidOperationException($"Failed to update user profile: {ex.Message}", ex);
        }
    }

    public async Task<bool> DeleteProfileAsync(string userId)
    {
        var user = await _context.Users.FindAsync(userId);
        if (user == null)
            return false;

        try
        {
            _context.Users.Remove(user);
            await _context.SaveChangesAsync();
            return true;
        }
        catch (DbUpdateException)
        {
            return false;
        }
    }
} 