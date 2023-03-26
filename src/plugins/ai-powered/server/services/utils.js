
const ytdl = require('ytdl-core');
const os = require('os');
const fs = require('fs');
const path = require('path');
const ffmpegPath = require('ffmpeg-static');
const ffmpeg = require('fluent-ffmpeg');

ffmpeg.setFfmpegPath(ffmpegPath);


module.exports = ({ strapi }) => ({
  async downloadVideoFile(videoUrl, fileName) {
    console.log('Downloading video file...');
    const outputFile = path.join(os.tmpdir(), fileName);
    const videoStream = ytdl(videoUrl, { quality: 'highest' });
    const writeStream = fs.createWriteStream(outputFile);

    return new Promise((resolve, reject) => {
      videoStream.pipe(writeStream);
      videoStream.on('finish', () => {
        console.log('Video downloaded!');
        resolve(outputFile);
      });

      videoStream.on('error', (error) => {
        reject(error);
      });
    });
  },

  async convertVideoToAudio(videoFilePath) {
    const outputFile = path.join(os.tmpdir(), `${path.parse(videoFilePath).name}.mp3`);
    return new Promise((resolve, reject) => {
      ffmpeg(videoFilePath)
        .outputOptions([
          '-vn',
          '-acodec', 'libmp3lame',
          '-ac', '2',
          '-ab', '160k',
          '-ar', '48000'
        ])
        .save(outputFile)
        .on('error', (error) => {
          console.error('FFmpeg error:', error);
          reject(error);
        })
        .on('end', () => {
          console.log('FFmpeg process completed');
          fs.unlinkSync(videoFilePath); // remove the temporary video file
          resolve(outputFile);
        });
    });
  }
});
