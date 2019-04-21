/* eslint-disable import/prefer-default-export */

// Get the duration of a blob file
// https://github.com/evictor/get-blob-duration/blob/master/src/getBlobDuration.js
export const getBlobDuration: (
  blob: Blob
) => Promise<HTMLMediaElement['duration']> = async blob => {
  const audioEl = document.createElement('audio');

  const duration: Promise<HTMLMediaElement['duration']> = new Promise(resolve =>
    audioEl.addEventListener('loadedmetadata', () => {
      // Chrome bug: https://bugs.chromium.org/p/chromium/issues/detail?id=642012
      if (audioEl.duration === Infinity) {
        audioEl.currentTime = Number.MAX_SAFE_INTEGER;
        audioEl.ontimeupdate = () => {
          audioEl.ontimeupdate = null;
          resolve(audioEl.duration);
          audioEl.currentTime = 0;
        };
      }
      // Normal behavior
      else resolve(audioEl.duration);
    })
  );

  audioEl.src = window.URL.createObjectURL(blob);

  return duration;
};
