using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Volunet.Entities.Entities;

namespace Volunet.DataAccess.Configurations
{
    internal class OrganizationConfiguration : IEntityTypeConfiguration<Organization>
    {
        public void Configure(EntityTypeBuilder<Organization> builder)
        {
            builder.ToTable("Organization");
            builder.HasKey(o => o.OrganizationId); //primary key
            builder.Property(o => o.OrganizationId)
                .ValueGeneratedOnAdd(); 
            builder.Property(o => o.OrganizationName)
                .IsRequired()
                .HasMaxLength(150); 
            builder.Property(o => o.Description)
                .HasMaxLength(500); 
            builder.Property(o => o.Address)
                .IsRequired()
                .HasMaxLength(200); 

            // Navigation properties
            builder.HasMany(o => o.Events)
                .WithOne(e => e.Organization);
            builder.HasMany(o => o.Users)
                .WithMany(u => u.Organizations);
        }
    }
}
