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
    }
}