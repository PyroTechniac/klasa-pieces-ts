// Copyright (c) 2017-2019 dirigeants. All rights reserved. MIT license.
import { KlasaClient, KlasaMessage, Command, CommandStore } from 'klasa';

export default class extends Command {

	constructor(client: KlasaClient, store: CommandStore, file: string[], dir: string) {
		super(client, store, file, dir, {
			aliases: ['choose', 'decide'],
			description: 'Makes a decision for you given some choices.',
			usage: '<choices:str> [...]',
			usageDelim: '|'
		});
	}

	async run(msg: KlasaMessage, choices: [string[]]) {
		msg.reply(choices.length === 1 ?
			'You only gave me one choice, dummy.' :
			`I think you should go with "${choices[Math.floor(Math.random() * choices.length)]}"`);
		return null;
	}

}
