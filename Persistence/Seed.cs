using Domain;
using Microsoft.AspNetCore.Identity;

namespace Persistence
{
    public class Seed
    {
        // static method you can use without creating an instance of class Seed
        public static async Task SeedData(DataContext context,
            UserManager<AppUser> userManager)
        {
            if (!userManager.Users.Any() && !context.Appointments.Any())
            {
                var users = new List<AppUser>
                {
                    new AppUser
                    {
                        DisplayName = "Bobby",
                        UserName = "Bobby",
                        Email = "Bobby@test.com"
                    },
                    new AppUser
                    {
                        DisplayName = "Jane",
                        UserName = "jane",
                        Email = "jane@test.com"
                    },
                    new AppUser
                    {
                        DisplayName = "Tom",
                        UserName = "tom",
                        Email = "tom@test.com"
                    },
                };

                foreach (var user in users)
                {
                    await userManager.CreateAsync(user, "Pa$$w0rd");
                }

                var activities = new List<Appointment>
                {
                    new Appointment
                    {
                        Title = "Past Appointment 1",
                        Date = DateTime.UtcNow.AddMonths(-2),
                        Description = "Appointment 2 months ago",
                        Category = "drinks",
                        City = "London",
                        Address = "Pub",
                        Attendees = new List<AppointmentAttendee>
                        {
                            new AppointmentAttendee
                            {
                                AppUser = users[0],
                                IsHost = true
                            }
                        }
                    },
                    new Appointment
                    {
                        Title = "Past Appointment 2",
                        Date = DateTime.UtcNow.AddMonths(-1),
                        Description = "Appointment 1 month ago",
                        Category = "culture",
                        City = "Paris",
                        Address = "The Louvre",
                        Attendees = new List<AppointmentAttendee>
                        {
                            new AppointmentAttendee
                            {
                                AppUser = users[0],
                                IsHost = true
                            },
                            new AppointmentAttendee
                            {
                                AppUser = users[1],
                                IsHost = false
                            },
                        }
                    },
                    new Appointment
                    {
                        Title = "Future Appointment 1",
                        Date = DateTime.UtcNow.AddMonths(1),
                        Description = "Appointment 1 month in future",
                        Category = "music",
                        City = "London",
                        Address = "Wembly Stadium",
                        Attendees = new List<AppointmentAttendee>
                        {
                            new AppointmentAttendee
                            {
                                AppUser = users[2],
                                IsHost = true
                            },
                            new AppointmentAttendee
                            {
                                AppUser = users[1],
                                IsHost = false
                            },
                        }
                    },
                    new Appointment
                    {
                        Title = "Future Appointment 2",
                        Date = DateTime.UtcNow.AddMonths(2),
                        Description = "Appointment 2 months in future",
                        Category = "food",
                        City = "London",
                        Address = "Jamies Italian",
                        Attendees = new List<AppointmentAttendee>
                        {
                            new AppointmentAttendee
                            {
                                AppUser = users[0],
                                IsHost = true
                            },
                            new AppointmentAttendee
                            {
                                AppUser = users[2],
                                IsHost = false
                            },
                        }
                    },
                    new Appointment
                    {
                        Title = "Future Appointment 3",
                        Date = DateTime.UtcNow.AddMonths(3),
                        Description = "Appointment 3 months in future",
                        Category = "drinks",
                        City = "London",
                        Address = "Pub",
                        Attendees = new List<AppointmentAttendee>
                        {
                            new AppointmentAttendee
                            {
                                AppUser = users[1],
                                IsHost = true                            
                            },
                            new AppointmentAttendee
                            {
                                AppUser = users[0],
                                IsHost = false                            
                            },
                        }
                    },
                    new Appointment
                    {
                        Title = "Future Appointment 4",
                        Date = DateTime.UtcNow.AddMonths(4),
                        Description = "Appointment 4 months in future",
                        Category = "culture",
                        City = "London",
                        Address = "British Museum",
                        Attendees = new List<AppointmentAttendee>
                        {
                            new AppointmentAttendee
                            {
                                AppUser = users[1],
                                IsHost = true                            
                            }
                        }
                    },
                    new Appointment
                    {
                        Title = "Future Appointment 5",
                        Date = DateTime.UtcNow.AddMonths(5),
                        Description = "Appointment 5 months in future",
                        Category = "drinks",
                        City = "London",
                        Address = "Punch and Judy",
                        Attendees = new List<AppointmentAttendee>
                        {
                            new AppointmentAttendee
                            {
                                AppUser = users[0],
                                IsHost = true                            
                            },
                            new AppointmentAttendee
                            {
                                AppUser = users[1],
                                IsHost = false                            
                            },
                        }
                    },
                    new Appointment
                    {
                        Title = "Future Appointment 6",
                        Date = DateTime.UtcNow.AddMonths(6),
                        Description = "Appointment 6 months in future",
                        Category = "music",
                        City = "London",
                        Address = "O2 Arena",
                        Attendees = new List<AppointmentAttendee>
                        {
                            new AppointmentAttendee
                            {
                                AppUser = users[2],
                                IsHost = true                            
                            },
                            new AppointmentAttendee
                            {
                                AppUser = users[1],
                                IsHost = false                            
                            },
                        }
                    },
                    new Appointment
                    {
                        Title = "Future Appointment 7",
                        Date = DateTime.UtcNow.AddMonths(7),
                        Description = "Appointment 7 months in future",
                        Category = "travel",
                        City = "Berlin",
                        Address = "All",
                        Attendees = new List<AppointmentAttendee>
                        {
                            new AppointmentAttendee
                            {
                                AppUser = users[0],
                                IsHost = true                            
                            },
                            new AppointmentAttendee
                            {
                                AppUser = users[2],
                                IsHost = false                            
                            },
                        }
                    },
                    new Appointment
                    {
                        Title = "Future Appointment 8",
                        Date = DateTime.UtcNow.AddMonths(8),
                        Description = "Appointment 8 months in future",
                        Category = "drinks",
                        City = "London",
                        Address = "Pub",
                        Attendees = new List<AppointmentAttendee>
                        {
                            new AppointmentAttendee
                            {
                                AppUser = users[2],
                                IsHost = true                            
                            },
                            new AppointmentAttendee
                            {
                                AppUser = users[1],
                                IsHost = false                            
                            },
                        }
                    }
                };

                //saves the activities into memory
                await context.Appointments.AddRangeAsync(activities);
                // saves it into db
                await context.SaveChangesAsync();
            }
        }
    }
}
