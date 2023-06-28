using Application.Core;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Persistence;

namespace Application.Appointments
{
    public class List
    {
         //Mediator Query
        public class Query : IRequest<Result<List<Appointment>>> {}

        public class Handler : IRequestHandler<Query, Result<List<Appointment>>>
        {
        public DataContext _context { get; }

            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Result<List<Appointment>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var appointments = await _context.Appointments.ToListAsync();
                return Result<List<Appointment>>.Success(appointments);
            }
        }
    }
}