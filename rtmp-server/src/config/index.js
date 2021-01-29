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
  // auth: {
  //   play: true,
  //   publish: true,
  //   secret: 'nodemedia2017privatekey'
  // },
  trans: {
    ffmpeg: '/usr/local/bin/ffmpeg',
    tasks: [
        {
            app: 'live',
            hls: true,
            
            dash: true,
            dashFlags: '[f=dash:window_size=3:extra_window_size=5]',
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