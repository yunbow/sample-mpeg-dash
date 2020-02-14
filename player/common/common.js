let ready = (callbackFunc) => {
    if (document.readyState !== 'loading') {
        callbackFunc();
    } else {
        document.addEventListener('DOMContentLoaded', callbackFunc);
    }
}

/**
 * メディア表示の時間を取得する
 * @param {Integer} value 秒数
 * @return {String} 時間（HH:MM:SS）
 */
let getTimeMediaFormat = (value) => {
    let s = value % 60;
    let m = Math.floor((value - s) / 60, 0);
    let h = Math.floor(m / 60, 0);
    let HH = ('00' + h).slice(-2);
    let MM = ('00' + (m % 60)).slice(-2);
    let SS = ('00' + Math.floor(s, 0)).slice(-2);
    return `${HH}:${MM}:${SS}`;
}