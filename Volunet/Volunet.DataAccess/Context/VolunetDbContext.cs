using System.Reflection;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Volunet.Entities.Entities;

namespace Volunet.DataAccess.Context;

public class VolunetDbContext:IdentityDbContext<User> 
{
    public VolunetDbContext(DbContextOptions<VolunetDbContext> options):base(options)
    {}
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        
        modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());
        
        modelBuilder.HasDefaultSchema("dto");
        
        // modelBuilder.ApplyConfigurationsFromAssembly(typeof(VolunetDbContext).Assembly);
    }
}