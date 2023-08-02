using Application.Core;
using Application.Interfaces;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application
{
    public class UpdateAttendance
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
        private readonly IUserAccessor _userAccessor;
        private readonly DataContext _context;
            public Handler(DataContext context, IUserAccessor userAccessor)
            {
                _context = context;
                _userAccessor = userAccessor;
                
            }
            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var appointment = await _context.Appointments
                    .Include(a => a.Attendees)
                        .ThenInclude(u => u.AppUser)
                        .FirstOrDefaultAsync(x => x.Id == request.Id);
                
                if(appointment == null) return null;

                var user = await _context.Users.FirstOrDefaultAsync(x => 
                    x.UserName == _userAccessor.GetUserName());

                if(user == null) return null;

                // we dont need async here, because we have appointment and user already in memory
                var hostUserName = appointment.Attendees.FirstOrDefault(x => x.IsHost)?.AppUser?.UserName;

                var attendance = appointment.Attendees.FirstOrDefault(x => x.AppUser.UserName == user.UserName);

                if(attendance != null && hostUserName == user.UserName)
                {
                    appointment.IsCancelled = !appointment.IsCancelled;
                }

                if(attendance != null && hostUserName != user.UserName)
                {
                    appointment.Attendees.Remove(attendance);
                }

                if(attendance == null)
                {
                    attendance = new AppointmentAttendee
                    {
                        AppUser = user,
                        Appointment = appointment,
                        IsHost = false
                    };

                    appointment.Attendees.Add(attendance);
                }

                var result = await _context.SaveChangesAsync() > 0;

                return result ? Result<Unit>.Success(Unit.Value) : Result<Unit>.Failure("Problem updating attendance");
            }
        }
    }
}