using System.Net;
using System.Text.Json;
using Application.Core;

namespace API.middleware
{
    public class ExceptionMiddleware
    {
        public readonly ILogger<ExceptionMiddleware> _logger;
        public readonly RequestDelegate _next;
        public readonly IHostEnvironment _env; 
        public ExceptionMiddleware(RequestDelegate next, ILogger<ExceptionMiddleware> logger, IHostEnvironment env)
        {
            _next = next;
            _logger = logger;
            _env = env;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            try
            {
                await _next(context);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);
                // API Controllers do this by default, we are outside
                context.Response.ContentType = "application/json";
                context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;

                var response = _env.IsDevelopment()
                    ? new AppException(context.Response.StatusCode, ex.Message, ex.StackTrace.ToString())
                    : new AppException(context.Response.StatusCode, "Internal Server Error");

                // outside from the API Controller we have to specify the serializer options on ourselves
                var options = new JsonSerializerOptions{PropertyNamingPolicy = JsonNamingPolicy.CamelCase};
                // we create Json response
                var json = JsonSerializer.Serialize(response, options);

                await context.Response.WriteAsync(json);
            }
        }
    }
}