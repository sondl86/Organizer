using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;

namespace Persistence
{
    public class Seed
    {
        // static method you can use without creating an instance of class Seed
        public static async Task SeedData(DataContext context)
        {
            if (context.Appointments.Any()) return;
            
            var activities = new List<Appointment>
            {
                new Appointment
                {
                    Title = "Past Appointment 1",
                    Date = DateTime.UtcNow.AddMonths(-2),
                    Description = "Appointment 2 months ago",
                    Category = "doctor",
                    City = "Berlin",
                    Address = "Schulstrasse 3",
                },
                new Appointment
                {
                    Title = "Past Appointment 2",
                    Date = DateTime.UtcNow.AddMonths(-1),
                    Description = "Appointment 1 month ago",
                    Category = "housing",
                    City = "Berlin",
                    Address = "Homestreet 44a",
                },
                new Appointment
                {
                    Title = "Future Appointment 1",
                    Date = DateTime.UtcNow.AddMonths(1),
                    Description = "Appointment 1 month in future",
                    Category = "housing",
                    City = "Viena",
                    Address = "Natural History Museum Street",
                },
                new Appointment
                {
                    Title = "Future Appointment 2",
                    Date = DateTime.UtcNow.AddMonths(2),
                    Description = "Appointment 2 months in future",
                    Category = "leisure",
                    City = "Berlin",
                    Address = "Tenniscourt 4",
                },
                new Appointment
                {
                    Title = "Future Appointment 3",
                    Date = DateTime.UtcNow.AddMonths(3),
                    Description = "Appointment 3 months in future",
                    Category = "doctor",
                    City = "Berlin",
                    Address = "another street",
                },
                new Appointment
                {
                    Title = "Future Appointment 4",
                    Date = DateTime.UtcNow.AddMonths(4),
                    Description = "Appointment 4 months in future",
                    Category = "doctor",
                    City = "Berlin",
                    Address = "Hospital Street 5",
                },
                new Appointment
                {
                    Title = "Future Appointment 5",
                    Date = DateTime.UtcNow.AddMonths(5),
                    Description = "Appointment 5 months in future",
                    Category = "doctor",
                    City = "Berlin",
                    Address = "dentiststreet 6",
                },
                new Appointment
                {
                    Title = "Future Appointment 6",
                    Date = DateTime.UtcNow.AddMonths(6),
                    Description = "Appointment 6 months in future",
                    Category = "leisure",
                    City = "Berlin",
                    Address = "Roundhouse Camden",
                },
                new Appointment
                {
                    Title = "Future Appointment 7",
                    Date = DateTime.UtcNow.AddMonths(7),
                    Description = "Appointment 2 months ago",
                    Category = "work",
                    City = "Munich",
                    Address = "Platz 3",
                },
                new Appointment
                {
                    Title = "Future Appointment 8",
                    Date = DateTime.UtcNow.AddMonths(8),
                    Description = "Appointment 8 months in future",
                    Category = "money/insurance/tax",
                    City = "Berlin",
                    Address = "Finanzweg 123",
                }
            };

            //saves the activities into memory
            await context.Appointments.AddRangeAsync(activities);
            // saves it into db
            await context.SaveChangesAsync();
        }
    }
}