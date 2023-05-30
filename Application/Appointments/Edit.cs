using AutoMapper;
using Domain;
using MediatR;
using Persistence;

namespace Application.Appointments
{
    public class Edit
    {
        public class Command : IRequest{
            public Appointment Appointment { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
        public DataContext _context { get; }
        private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var appointment = await _context.Appointments.FindAsync(request.Appointment.Id);

                // no coalecing operator: if left side is Null than set the right side to the variable
                //activity.Title = request.Appointment.Title ?? appointment.Title;
                _mapper.Map(request.Appointment,appointment);

                await _context.SaveChangesAsync();

                return Unit.Value;
            }
        }
    }
}