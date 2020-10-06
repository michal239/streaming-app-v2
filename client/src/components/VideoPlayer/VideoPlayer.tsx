import React, { useEffect, useRef } from 'react';
import Hls from 'hls.js';

const VideoPlayer: React.FC = () => {
  const video = useRef<HTMLVideoElement>(null);
  
  useEffect(() => {
    if (video.current) {
      const hls = new Hls();
      hls.loadSource('http://localhost:8888/live/N4ja5onW/index.m3u8');
      hls.attachMedia(video.current);
      hls.on(Hls.Events.MANIFEST_PARSED, function() {
        if (video.current) video.current.play();
      })
    }
  }, [])
  return (
    <>
    <video style={{width: '50vw'}} controls ref={video}></video>
    </>
  );
}

export default VideoPlayer;