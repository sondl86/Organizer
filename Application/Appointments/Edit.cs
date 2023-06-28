using Application.Core;
using AutoMapper;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.Appointments
{
    public class Edit
    {
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
        public DataContext _context { get; }
        private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var appointment = await _context.Appointments.FindAsync(request.Appointment.Id);

                if(appointment == null) return null;

                // no coalecing operator: if left side is Null than set the right side to the variable
                //activity.Title = request.Appointment.Title ?? appointment.Title;
                _mapper.Map(request.Appointment,appointment);

                var result = await _context.SaveChangesAsync() > 0;

                if(!result) return Result<Unit>.Failure("Failed to update appointment");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}