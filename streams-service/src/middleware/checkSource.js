import grpcErrors from 'grpc-errors'

async function checkSource(ctx, next) {
  if (ctx.request.get('x-api-key') !== process.env.STREAMS_SERVICE_API_KEY) {
    ctx.res = new grpcErrors.UnauthenticatedError('Invalid api-key');
  } else {
    await next();
  }
}

export default checkSource;