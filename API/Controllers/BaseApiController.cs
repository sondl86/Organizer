using Application.Core;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController] //Attribut
    [Route("api/[controller]")] 
    public class BaseApiController : ControllerBase
    {
        private IMediator _mediator;
    // ??=  if _mediator is Null than assign anything to the right to the property Mediator
        protected IMediator Mediator => _mediator ??= HttpContext.RequestServices.GetService<IMediator>();

        protected ActionResult HandleResult<T>(Result<T> result){
            if(result == null){
                return NotFound();
            }
            if(result.IsSucess && result.Value != null){
                return Ok(result.Value);
            }
            if(result.IsSucess && result.Value == null){
                return NotFound();
            }
            return BadRequest(result.Error);
        }
    }
}