import React, { useEffect, useRef } from 'react';
// import md5 from 'js-md5';
// import videojs from 'video.js';
import flvjs from 'flv.js';
import DPlayer from 'dplayer';

interface VideoPlayerProps {
  streamKey: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ streamKey }) => {
  const video = useRef(null);
  useEffect(() => {
    let flvPlayer: flvjs.Player;
    const dp = new DPlayer({
      container: video.current,
      live: true,
      video: {
        url: `http://localhost:8888/live/${streamKey}.flv`,
        type: 'customFlv',
        customType: {
          customFlv: function (video: any, player: any) {
            flvPlayer = flvjs.createPlayer(
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

    return () => {
      flvPlayer.destroy();
      dp.destroy();
    };
  }, []);

  return <div ref={video}></div>;
};

export default VideoPlayer;
