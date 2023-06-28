using Domain;
using FluentValidation;

namespace Application.Appointments
{
    public class AppointmentValidator : AbstractValidator<Appointment>
    {
        public AppointmentValidator()
        {
            RuleFor(x => x.Title).NotEmpty();
            RuleFor(x => x.Description).NotEmpty();
            RuleFor(x => x.Date).NotEmpty();
            RuleFor(x => x.City).NotEmpty();
            RuleFor(x => x.Category).NotEmpty();
            RuleFor(x => x.Address).NotEmpty();
        }
    }
}