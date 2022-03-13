import fs from 'fs';

export const createImageFromBase64 = (base64: string): string => {
	const buffer = Buffer.from(base64, 'base64');
	const randomImageName = Math.random().toString(26).slice(2);
	const imagePath = `${__dirname}/images/${randomImageName}.jpg`;
	fs.writeFileSync(imagePath, buffer);
	return imagePath;
};

//bad idea
export const createVideoFromBase64 = (base64: string): string => {
	const buffer = Buffer.from(base64, 'base64');
	const randomImageName = Math.random().toString(26).slice(2);
	const videoPath = `${__dirname}/images/${randomImageName}.mp4`;
	fs.writeFileSync(videoPath, buffer);
	return videoPath;
};
