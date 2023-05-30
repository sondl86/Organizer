using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;

namespace Application.Appointments
{
    public class Create
    {
        // command is not returning anything
        public class Command : IRequest{
            public Appointment Appointment { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
        public DataContext _context { get; }
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                _context.Appointments.Add(request.Appointment);

                await _context.SaveChangesAsync();

                return Unit.Value;
            }
        }
    }
}