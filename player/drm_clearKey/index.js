{
    // 動画情報
    let videoInfo = {
        url: '../../mpd/drm/clearkey/Bullfinch.mpd',
        title: 'bullfinch-男性-鳥-2797',
        drm: {
            "org.w3.clearkey": {
                "clearkeys": {
                    "OCYfniLWkYVAQNXDwaqUeQ": "jfUe14GofJhw1Sw0yde2eQ"
                }
            }
        }
    };

    /**
     * 動画を再生する
     * @param {Object} videoInfo 動画情報
     */
    let playVideo = (videoInfo) => {
        console.debug('video info=' + JSON.stringify(videoInfo));

        document.getElementById('screen').style.display = 'none';
        document.getElementById('loading').style.display = 'block';
        document.getElementById('videoTitle').textContent = videoInfo.title;

        let screen = document.getElementById('screen');
        let video = document.createElement('video');
        video.id = 'video';
        video.style.width = '640px';
        video.style.height = '360px';
        video.style.zIndex = -100;
        screen.appendChild(video);

        let player = dashjs.MediaPlayer().create();
        player.initialize(video, videoInfo.url, true);
        player.setProtectionData(videoInfo.drm);
        player.updateSettings({
            'debug': {
                'logLevel': dashjs.Debug.LOG_LEVEL_INFO
            }
        });

        video.addEventListener("loadstart", () => {
            console.debug('EVENT: loadstart');
        });
        video.addEventListener('loadedmetadata', () => {
            console.debug('EVENT: loadedmetadata');
            console.debug('########## VideoInfo [start] ##########');
            console.debug('source: ' + video.currentSrc);
            console.debug('duration: ' + video.duration);
            console.debug('videoWidth: ' + video.videoWidth);
            console.debug('videoHeight: ' + video.videoHeight);
            console.debug('readyState: ' + video.readyState);
            console.debug('networkState: ' + video.networkState);
            console.debug('########## VideoInfo [end] ##########');
        });
        video.addEventListener("timeupdate", () => {
            document.getElementById('screen').style.display = 'block';
            document.getElementById('loading').style.display = 'none';
            document.getElementById('totalTime').textContent = getTimeMediaFormat(video.duration);
            document.getElementById('currentTime').textContent = getTimeMediaFormat(video.currentTime);
            let percentage = (video.currentTime / video.duration) * 100;
            document.getElementById('seekbarLine').style.width = percentage + '%';
        });
        video.addEventListener("progress", () => {
            if (video.buffered && 0 < video.buffered.length) {
                let percentage = (video.buffered.end(video.buffered.length - 1) / video.duration) * 100;
                document.getElementById('bufferLine').style.width = percentage + '%';
            }
        });
        video.addEventListener("ended", () => {
            console.debug('EVENT: ended');
        });
        video.addEventListener("abort", (e) => {
            console.debug('EVENT: video abort=' + e.message);
        });
        video.addEventListener("error", (e) => {
            console.debug('EVENT: video error=' + video.error.code);
        });
    }

    ready(() => {
        document.getElementById('playBtn').addEventListener('click', () => {
            playVideo(videoInfo);
        });
    });
}