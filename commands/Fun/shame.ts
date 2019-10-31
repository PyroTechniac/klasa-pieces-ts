// Copyright (c) 2017-2019 dirigeants. All rights reserved. MIT license.
import { KlasaClient, KlasaMessage, KlasaUser, Command, CommandStore } from 'klasa';

export default class extends Command {

	constructor(client: KlasaClient, store: CommandStore, file: string[], dir: string) {
		super(client, store, file, dir, {
			description: 'Rings a bell on the server shaming the mentioned person.',
			usage: '<user:user>'
		});
	}

	run(msg: KlasaMessage, [user]: [KlasaUser]) {
		return msg.sendMessage(`🔔 SHAME 🔔 ${user} 🔔 SHAME 🔔`);
	}

}
