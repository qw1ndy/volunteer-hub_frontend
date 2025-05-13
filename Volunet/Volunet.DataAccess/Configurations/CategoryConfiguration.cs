using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Volunet.Entities.Entities;

namespace Volunet.DataAccess.Configurations
{
    internal class CategoryConfiguration : IEntityTypeConfiguration<Category>
    {
        public void Configure(EntityTypeBuilder<Category> builder)
        {
            builder.ToTable("Category");
            builder.HasKey(c => c.CategoryId); //primary key
            builder.Property(c => c.CategoryId)
                .ValueGeneratedOnAdd(); //auto-increment

            builder.Property(c => c.CategoryName)
                .IsRequired()
                .HasMaxLength(50); 
        }
    }
}
