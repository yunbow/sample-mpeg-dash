{
    let ready = (callbackFunc) => {
        if (document.readyState !== 'loading') {
            callbackFunc();
        } else {
            document.addEventListener('DOMContentLoaded', callbackFunc);
        }
    }

    ready(() => {
        let video = videojs('video1', {
            width: 640, // 幅
            height: 360, // 高さ
            autoplay: false, // 自動再生
            loop: false, // ループ再生
            controls: true, // コントロール制御表示
            preload: 'auto', // 読み込み制御
        });
        video.src({
            type: 'application/dash+xml',
            src: '../../mpd/drm/multi/Bullfinch.mpd',
            keySystemOptions: [{
                    name: 'com.widevine.alpha',
                    options: {
                        serverURL: 'https://widevine-proxy.appspot.com/proxy'
                    }
                },
                {
                    name: 'com.microsoft.playready',
                    options: {
                        serverURL: 'https://test.playready.microsoft.com/service/rightsmanager.asmx?cfg=(kid:header,contentkey:O9ovQDRMfe9hQie5wPA+Jg==)'
                    }
                }
            ]
        });
        video.on(['loadstart', 'loadedmetadata', 'loadeddata', 'play', 'playing', 'pause', 'suspend', 'seeking', 'seeked', 'waiting', 'canplay', 'canplaythrough', 'ratechange', 'ended', 'emptied', 'error', 'abort'], (e) => {
            console.log(`EVENT: ${e.type}`);
        });
        video.on('loadeddata', () => {
            console.debug('########## VideoInfo [start] ##########');
            console.debug(`>> source: ${video.currentSrc()}`);
            console.debug(`>> duration: ${video.duration()}`);
            console.debug(`>> videoSize(WxH): ${video.videoWidth()}px x ${video.videoHeight()}px`);
            console.debug(`>> readyState: ${video.readyState()}`);
            console.debug(`>> networkState: ${video.networkState()}`);
            console.debug('########## VideoInfo [end] ##########');
        });
    });
}