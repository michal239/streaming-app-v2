import React, { useEffect, useRef } from 'react';
// import Hls from 'hls.js';
import videojs from 'video.js';
// import flvjs from 'flv.js';

const VideoPlayer: React.FC = () => {
  const video = useRef<HTMLVideoElement>(null);
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
  useEffect(() => {
    const player = videojs(video.current, {
      autoplay: true,
      controls: true,
      sources: [{
          src: 'http://localhost:8888/live/Wg7RnJzOxrs3/index.m3u8',
          type: 'application/x-mpegURL'
      }],
      fluid: true,
    })

    return () => {
      player.dispose();
    }
  }, [])
  // useEffect(() => {
  //   if (flvjs.isSupported()) {
  //     console.log('flvjs supported')
  //     var flvPlayer = flvjs.createPlayer({
  //         type: 'flv',
  //         url: 'http://localhost:8000/live/Wg7RnJzOxrs3.flv'
  //     });
  //     flvPlayer.attachMediaElement(video.current);
  //     flvPlayer.load();
  //     flvPlayer.play();
  // }
  // }, [])
  return (
    
    <video style={{width: '100%'}} id="videoPlayer" ref={video} controls className="video-js vjs-big-play-centered"></video>
    
  );
}

export default VideoPlayer;