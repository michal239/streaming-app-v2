export default function buildGetChannel({ getChannelUC }) {
  return async function getChannel(httpRequest) {
    const { streamKey } = httpRequest;
    try {
      const channel = await getChannelUC({ streamKey });
      if (!channel) throw new Error('No such channel');
      return {
        statusCode:200,
        body: {
          channel
        }
      }
    } catch (err) {
      return {
        statusCode:400,
        body: {
          error: {
            message: err.message
          }
        }
      }
    }
  }
}