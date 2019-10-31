import { Command, KlasaMessage } from 'klasa';
import { MessageEmbed } from 'discord.js';
import fetch from 'node-fetch';

export default class extends Command {

	description = 'Shows a meme image from reddit.';

	_subreddits: string[] = [
		'memes',
		'DeepFriedMemes',
		'bonehurtingjuice',
		'surrealmemes',
		'dankmemes',
		'meirl',
		'me_irl',
		'funny',
	];

	async run(msg: KlasaMessage) {
		const data = await fetch(`https://imgur.com/r/${this._subreddits[Math.floor(Math.random() * this._subreddits.length)]}/hot.json`)
			.then(response => response.json())
			.then(body => body.data);
		const selected = data[Math.floor(Math.random() * data.length)];
		return msg.send(new MessageEmbed().setImage(`http://imgur.com/${selected.hash}${selected.ext.replace(/\?.*/, '')}`));
	}

}
