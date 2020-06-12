export default function makeGrpcCallback(controller) {
  return async function(ctx) {
    const result = await controller(ctx.req);
    const status = generateStatus(result);

    ctx.res = {
      ...result.body,
      status
    }
  }
}

function generateStatus(res) {
  if (res.body && res.body.error) {
    return {
      code: res.statusCode,
      message: res.body.error.message,
      failed: true
    }
  } else {
    return {
      code: res.statusCode,
      failed: false
    }
  }
}