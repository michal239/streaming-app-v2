export default function buildGetChannel({ channelsDb }) {
  return async function getChannel(query) {
    //console.log(query)
    return await channelsDb.findOne(query);
  }
}