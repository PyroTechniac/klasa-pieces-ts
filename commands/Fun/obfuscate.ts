// Copyright (c) 2017-2019 dirigeants. All rights reserved. MIT license.
import { KlasaClient, KlasaMessage, Command, CommandStore } from 'klasa';
import { obfuscate } from 'confusables';

export default class extends Command {

	constructor(client: KlasaClient, store: CommandStore, file: string[], dir: string) {
		super(client, store, file, dir, {
			usage: '<str:str{1,200}>',
			description: 'Modify a string to have confusing letters in it.'
		});
	}

	async run(msg: KlasaMessage, [str]: [string]) {
		const variations = [];

		for (let i = 0; i < 5; i++) {
			variations.push(obfuscate(str));
		}

		return msg.send(variations.join('\n'));
	}

}
