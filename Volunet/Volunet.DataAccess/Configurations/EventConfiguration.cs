
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Volunet.Entities.Entities;

namespace Volunet.DataAccess.Configurations
{
    internal class EventConfiguration:IEntityTypeConfiguration<Event>
    {
        public void Configure(EntityTypeBuilder<Event> builder)
        {
            builder.HasKey(e => e.EventId); //primary key
            builder.Property(e => e.EventName)
                .IsRequired()
                .HasMaxLength(100);
            builder.Property(e => e.DateTime)
                .IsRequired();
            builder.Property(e => e.Latitude)
                .IsRequired();
            builder.Property(e => e.Longitude)
                .IsRequired();
            builder.Property(e => e.Description)
                .HasMaxLength(500);
            builder.Property(e => e.ImageUrl)
                .HasMaxLength(200);

            // Navigation properties
            builder.HasMany(e => e.Categories) 
                .WithMany(c => c.Events);
            builder.HasOne(e => e.Organization)
                .WithMany(o => o.Events)
                .HasForeignKey(e => e.OrganizationId);
        } 
    }
}
