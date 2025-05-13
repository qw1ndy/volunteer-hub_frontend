using Volunet.Entities.DTOs;

namespace Volunet.Core.Interfaces;

public interface IProfileService
{
    Task<ProfileDto> GetProfileAsync(string userId);
    Task<ProfileDto> UpdateProfileAsync(string userId, UpdateProfileDto updateProfileDto);
    Task<bool> DeleteProfileAsync(string userId);
} 