using Application.Core;
using AutoMapper;
using AutoMapper.QueryableExtensions;
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
        public class Query : IRequest<Result<List<AppointmentDto>>> {}

        public class Handler : IRequestHandler<Query, Result<List<AppointmentDto>>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<Result<List<AppointmentDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var appointments = await _context.Appointments
                    // eager loading
                    //.Include(a => a.Attendees)
                    //.ThenInclude(u => u.AppUser)
                    .ProjectTo<AppointmentDto>(_mapper.ConfigurationProvider)
                    .ToListAsync();
                // for eager loading, we would have to Map it
                // var appointmentsToReturn = _mapper.Map<List<AppointmentDto>>(appointments);

                return Result<List<AppointmentDto>>.Success(appointments);
            }
        }
    }
}