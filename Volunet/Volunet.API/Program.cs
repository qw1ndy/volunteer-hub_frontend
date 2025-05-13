using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Volunet.Core.Interfaces;
using Volunet.Core.Services;
using Volunet.DataAccess.Context;
using Volunet.Entities.Entities;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();

builder.Services.AddOpenApi();

builder.Services.AddAuthorization();
builder.Services.AddAuthentication().AddCookie(IdentityConstants.ApplicationScheme);

// Register services
builder.Services.AddScoped<IProfileService, ProfileService>();
builder.Services.AddScoped<IOrganizationService, OrganizationService>();
builder.Services.AddScoped<IEventService, EventService>();

//Ef Services
builder.Services.AddIdentityCore<User>()
    .AddEntityFrameworkStores<VolunetDbContext>()
    .AddApiEndpoints();

builder.Services.AddDbContext<VolunetDbContext>(options=>
    options.UseNpgsql(builder.Configuration.GetConnectionString("remotePostgres")));

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.UseSwaggerUI(
        options =>
        {
            options.SwaggerEndpoint("/openapi/v1.json", "Volunet API"); 
            options.RoutePrefix = string.Empty;
        });
}

app.MapIdentityApi<User>();

app.MapControllers();

app.Run();