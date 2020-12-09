import fs from 'fs';
import util from 'util';

const readFile = util.promisify(fs.readFile);

export default async function getThumbnailController(ctx) {
  try {
    const res = await readFile(`./thumbnails/${ctx.req.streamKey}.png`);
    const encodedImage = Buffer.from(res, 'binary').toString('base64');
    ctx.res = { data: encodedImage }
  } catch (err) {
    ctx.res = { data: null }
  }
}