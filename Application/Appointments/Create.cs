using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Core;
using Application.Interfaces;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Appointments
{
    public class Create
    {
        // command is not returning anything, we use Unit, because we dont return an appointment
        public class Command : IRequest<Result<Unit>>{
            public Appointment Appointment { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>{
            public CommandValidator()
            {
                RuleFor(x => x.Appointment).SetValidator(new AppointmentValidator());
            }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
        public DataContext _context;
        private readonly IUserAccessor _userAccessor;
            public Handler(DataContext context, IUserAccessor userAccessor)
            {
                _userAccessor = userAccessor;
                _context = context;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var user = await _context.Users.FirstOrDefaultAsync(x => x.UserName == _userAccessor.GetUserName());

                var attendee = new AppointmentAttendee
                {
                    AppUser = user,
                    Appointment = request.Appointment,
                    IsHost = true
                };

                request.Appointment.Attendees.Add(attendee);

                _context.Appointments.Add(request.Appointment);
                // if nothing is written to the database than result is false, otherwise if the number of changes is greater than 0 than result is true
                var result = await _context.SaveChangesAsync() > 0;
                if(!result) return Result<Unit>.Failure("Failed to create appointment");
                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}