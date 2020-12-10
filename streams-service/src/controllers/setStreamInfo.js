import client from "../redis-setup";

const availableCategories = [
  'Counter-Strike: Global Offensive',
  'League of Legends',
  'Among Us',
  'World of Tanks',
  'Fortnite',
  'Chess',
  'VALORANT'
]

export default async function setStreamInfoController(ctx) {
  const res = await new Promise((resolve, reject) => {
    client.hget('streams', ctx.req.streamKey, (err, res) => {
      const parsedResponse = JSON.parse(res);
      resolve(parsedResponse);
    })
  })

  if (res) {
    const { title, category } = ctx.req;
    res.title = title.slice(0, 48) || res.title;
    res.category = availableCategories.includes(category) ? category : res.category;
    client.hset('streams', ctx.req.streamKey, JSON.stringify(res));
  }
}