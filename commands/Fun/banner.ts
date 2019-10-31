// Copyright (c) 2017-2019 dirigeants. All rights reserved. MIT license.
import { KlasaClient, KlasaMessage, Command, CommandStore } from 'klasa';
import { promisify } from 'util';
const figletAsync = promisify(require('figlet'));

export default class extends Command {

	constructor(client: KlasaClient, store: CommandStore, file: string[], dir: string) {
		super(client, store, file, dir, {
			description: 'Creates an ASCII banner from the string you supply.',
			usage: '<banner:str>'
		});
	}

	async run(msg: KlasaMessage, [banner]: [string]) {
		return msg.sendCode('', await figletAsync(banner));
	}

}
