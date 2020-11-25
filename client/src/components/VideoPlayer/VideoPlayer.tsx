import React, { useEffect } from 'react';
// import md5 from 'js-md5';
// import videojs from 'video.js';
import flvjs from 'flv.js';
import DPlayer from 'dplayer';

const VideoPlayer: React.FC = () => {
  // const video = useRef<any>(null);
  // let flvPlayerRef = useRef<any>(null);
  // let howLongPaused = useRef<number>(0);
  // useEffect(() => {
  //   const wideo: HTMLMediaElement | null = document.querySelector('#videoPlayer')
  //   if (flvjs.isSupported() && wideo!==null) {

  //     let flvPlayer = flvjs.createPlayer({
  //       type: 'flv',
  //       url: 'http://localhost:8888/live/Wg7RnJzOxrs3/index.m3u8'
  //     });
  //     flvPlayer.attachMediaElement(wideo);
  //     flvPlayer.load();
  //     flvPlayer.play();
  //   }
  // }, []);
  // useEffect(() => {
  //   if (video.current) {
  //     const hls = new Hls();
  //     hls.loadSource('http://localhost:8888/live/Wg7RnJzOxrs3/index.m3u8');
  //     hls.attachMedia(video.current);
  //     hls.on(Hls.Events.MANIFEST_PARSED, function() {
  //       if (video.current) video.current.play();
  //     })
  //   }
  // }, [])
  // useEffect(() => {
  //   let hash = md5.create();
  //   let ext = Date.now() + 30000;
  //   hash.update(`/live/Wg7RnJzOxrs3-${ext}-nodemedia2017privatekey`);
  //   let key = '';
  //   key = hash.hex();
  //   let sign = `?sign=${ext}-${key}`;
  //   console.log(sign)
  //   const player = videojs(video.current, {
  //     autoplay: true,
  //     controls: true,
  //     sources: [{
  //         src: `http://localhost:8888/live/Wg7RnJzOxrs3/index.m3u8${sign}`,
  //         type: 'application/x-mpegURL'
  //         // type: 'flv'
  //       }],
  //     fluid: true,
  //   })

  //   return () => {
  //     player.dispose();
  //   }
  // }, [])
  useEffect(() => {
    new DPlayer({
      container: document.getElementById('dplayer'),
      live: true,
      video: {
        url: 'http://192.168.0.123:8888/live/Wg7RnJzOxrs3.flv',
        type: 'customFlv',
        customType: {
          customFlv: function (video: any, player: any) {
            const flvPlayer = flvjs.createPlayer(
              {
                type: 'flv',
                isLive: true,
                cors: true,
                url: video.src,
              },
              {
                enableWorker: true,
                enableStashBuffer: false,
                stashInitialSize: 128,
                isLive: true,
              },
            );
            flvPlayer.attachMediaElement(video);
            flvPlayer.load();
            flvPlayer.play();
          },
        },
      },
    });
  }, []);
  // const handlePause = (e: any) => {
  //   howLongPaused.current = Date.now();

  // }
  // const handlePlay = (e: any) => {
  //   if (howLongPaused.current !== 0) {
  //     let temp = (Date.now() - howLongPaused.current) / 1000;
  //     flvPlayerRef.current.currentTime += temp;
  //   }

  // }
  // useEffect(() => {
  //   let hash = md5.create();
  //   let ext = Date.now() + 30000;
  //   hash.update(`/live/Wg7RnJzOxrs3-${ext}-nodemedia2017privatekey`);
  //   let key = '';
  //   key = hash.hex();
  //   let sign = `?sign=${ext}-${key}`;
  //   console.log(sign)
  //   if (flvjs.isSupported()) {
  //     const flvPlayer = flvjs.createPlayer({

  //         type: 'flv',
  //         isLive: true,
  //         cors: true,
  //         url: `http://192.168.0.123:8888/live/Wg7RnJzOxrs3.flv`
  //     }, {
  //       enableWorker: true,
  //       enableStashBuffer: false,
  //       stashInitialSize: 128,
  //       isLive: true
  //     });
  //     flvPlayerRef.current = flvPlayer;
  //     flvPlayer.attachMediaElement(video.current);
  //     flvPlayer.load();
  //     flvPlayer.play();
  // }
  // }, [])
  return (
    <div id="dplayer"></div>
    // <video id="dplayer" style={{width: '100%'}} id="videoPlayer" ref={video} controls className="video-js vjs-big-play-centered vjs-theme-city"></video>
  );
};

export default VideoPlayer;
