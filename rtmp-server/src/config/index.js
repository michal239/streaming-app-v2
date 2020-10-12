const rtmpDev = {
  logType: 1,

  rtmp: {
    port: 1935,
    chunk_size: 60000,
    gop_cache: true,
    ping: 60,
    ping_timeout: 30
  },
  http: {
    port: 8888,
    mediaroot: './mediaserver/media',
    allow_origin: '*'
  },
  trans: {
    ffmpeg: './ffmpeg/bin/ffmpeg.exe',
    tasks: [
        {
            app: 'live',
            hls: true,
            hlsFlags: '[hls_time=2:hls_list_size=3:hls_flags=delete_segments]',
            flv: true
        }
    ]
  }
}

if(process.env.NODE_ENV === "production") {
  module.exports = {
      
  }
} else {
  module.exports = {
      rtmp_server: rtmpDev
  }
}