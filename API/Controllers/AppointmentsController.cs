using Application;
using Application.Appointments;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class AppointmentsController : BaseApiController
    {
        [HttpGet] //api/appointments
        public async Task<IActionResult> GetAppointments()
        {
            //API Controller is sending a request to the Mediator 
            var result = await Mediator.Send(new List.Query());
            return HandleResult(result);
        }

        [HttpGet("{id}")] 
        public async Task<IActionResult> GetAppointment(Guid id)
        {
            var result = await Mediator.Send(new Details.Query{Id = id});
            return HandleResult(result);
        }

        [HttpPost]
        public async Task<IActionResult> CreateAppointment(Appointment appointment)
        {
            return HandleResult(await Mediator.Send(new Create.Command {Appointment = appointment} ));
        }

        [Authorize(Policy = "IsAppointmentHost")]
        [HttpPut("{id}")] 
        public async Task<IActionResult> EditAppointment (Guid id, Appointment appointment)
        {
            appointment.Id = id;
            return HandleResult(await Mediator.Send(new Edit.Command {Appointment = appointment} ));
        }

        [Authorize(Policy = "IsAppointmentHost")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAppointment (Guid id)
        {
            return HandleResult(await Mediator.Send(new Delete.Command {Id = id} ));
        }

        [HttpPost("{id}/attend")]
        public async Task<IActionResult> Attend(Guid id)
        {
            return HandleResult(await Mediator.Send(new UpdateAttendance.Command {Id = id} ));
        }
    }

}