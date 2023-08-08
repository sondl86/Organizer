using Application.Core;
using Domain;
using MediatR;
using Persistence;

namespace Application.Appointments
{
    public class Delete
    {
        public class Command : IRequest<Result<Unit>>{
            //parameter
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;

            public Handler(DataContext context){
                _context = context;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var appointment = await _context.Appointments.FindAsync(request.Id);

                if(appointment == null){
                    return null;
                }

                _context.Remove(appointment);

                var result = await _context.SaveChangesAsync() > 0;

                if(!result) return Result<Unit>.Failure("Failed to delete the activity");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}