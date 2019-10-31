// Copyright (c) 2017-2019 dirigeants. All rights reserved. MIT license.
// Needs fetchImage extendable
import { KlasaMessage, Command } from 'klasa';
import jimp from 'jimp';

export default class extends Command {

	description = 'Makes a big version of an image.';

	async run(msg: KlasaMessage) {
		// @ts-ignore
		const { url } = await msg.channel.fetchImage();
		const img = await jimp.read(url);
		img.resize(400, jimp.AUTO);
		const chunkHeight = img.bitmap.height / 4;
		for (let i = 0; i <= 3; i++) {
			const tempImg = img.clone().crop(0, chunkHeight * i, 400, chunkHeight);
			await new Promise((resolve, reject) => {
				tempImg.getBuffer('image/png', (err, buffer) => err ?
					reject(err) :
					resolve(msg.channel.sendFile(buffer, 'image.png')));
			});
		}
		return null;
	}

}
