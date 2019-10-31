// Copyright (c) 2019 dirigeants. All rights reserved. MIT license.
import { KlasaClient, KlasaMessage, Command, CommandStore } from 'klasa';

export default class extends Command {
	
	constructor(client: KlasaClient, store: CommandStore, file: string[], dir: string) {
		super(client, store, file, dir, {
			description: 'Sends an avatar generated from adorable.io',
			usage: '[name:str]'
		});
	}

	async run(msg: KlasaMessage, [name]: [string]) {
		return msg.send(`https://api.adorable.io/avatars/285/${
			encodeURIComponent(name || msg.author.username || msg.id)
		}.png`);
	}

}
