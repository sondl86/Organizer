using Application.Appointments;
using Domain;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class AppointmentsController : BaseApiController
    {
        [HttpGet] //api/appointments
        public async Task<ActionResult<List<Appointment>>> GetAppointments()
        {
            //API Controller is sending a request to the Mediator 
            return await Mediator.Send(new List.Query());
        }

        [HttpGet("{id}")] 
        public async Task<ActionResult<Appointment>> GetAppointment(Guid id)
        {
            return await Mediator.Send(new Details.Query{Id = id});
        }

        [HttpPost]
        public async Task<IActionResult> CreateAppointment(Appointment appointment)
        {
            return Ok(await Mediator.Send(new Create.Command {Appointment = appointment} ));
        }

        [HttpPut("{id}")] 
        public async Task<IActionResult> EditAppointment (Guid id, Appointment appointment)
        {
            appointment.Id = id;
            return Ok(await Mediator.Send(new Edit.Command {Appointment = appointment} ));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAppointment (Guid id)
        {
            return Ok(await Mediator.Send(new Delete.Command {Id = id} ));
        }
    }

}