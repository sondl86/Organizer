using Domain;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Persistence
{
    public class DataContext : IdentityDbContext<AppUser>
    {
        public DataContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<Appointment> Appointments { get; set; }
        public DbSet<AppointmentAttendee> AppointmentAttendees { get; set; }

        public DbSet<Photo> Photos { get; set; }
        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<AppointmentAttendee>(x => x.HasKey(aa => new {aa.AppUserId, aa.AppointmentId}));
            // configuration of many to many relationship
            builder.Entity<AppointmentAttendee>()
                .HasOne(u => u.AppUser)
                .WithMany(a => a.Appointments)
                .HasForeignKey(aa => aa.AppUserId);
            
            builder.Entity<AppointmentAttendee>()
                .HasOne(u => u.Appointment)
                .WithMany(a => a.Attendees)
                .HasForeignKey(aa => aa.AppointmentId);

        }
    }
}