using Domain;
using MediatR;
using Persistence;

namespace Application.Appointments
{
    public class Delete
    {
        public class Command : IRequest{
            //parameter
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
        public DataContext _context { get; }

            public Handler(DataContext context){
                _context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var activity = await _context.Appointments.FindAsync(request.Id);

                _context.Remove(activity);

                await _context.SaveChangesAsync();

                return Unit.Value;
            }
        }
    }
}