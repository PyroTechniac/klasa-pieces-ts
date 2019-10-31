// Copyright (c) 2017-2019 dirigeants. All rights reserved. MIT license.
import { KlasaClient, KlasaMessage, Command, CommandStore } from 'klasa';
import { remove } from 'confusables';

export default class extends Command {

	constructor(client: KlasaClient, store: CommandStore, file: string[], dir: string) {
		super(client, store, file, dir, {
			usage: '<str:str{1,2000}>',
			description: 'Deobfuscate a string which has confusable unicode characters.'
		});
	}

	async run(msg: KlasaMessage, [str]: [string]) {
		msg.send(remove(str));
		return null;
	}

}
