import { spawn } from 'child_process';

export function generateStreamThumbnail(streamKey) {
  const cmd = '/usr/local/bin/ffmpeg';
  const args = [
    '-y',
    '-i', `http://rtmp-server:8888/live/${streamKey}.flv`,
    '-ss', '00:00:01',
    '-vframes', '1',
    '-vf', 'scale=-2:300',
    `./thumbnails/${streamKey}.png`
  ];

  spawn(cmd, args, {
    detached: true,
    stdio: 'ignore'
  }).unref();
}