// Copyright (c) 2017-2019 dirigeants. All rights reserved. MIT license.
import { KlasaClient, KlasaMessage, Command, CommandStore } from 'klasa';

export default class extends Command {

	constructor(client: KlasaClient, store: CommandStore, file: string[], dir: string) {
		super(client, store, file, dir, {
			aliases: ['coin'],
			description: 'Flips one or more coins',
			usage: '[coins:int]'
		});
	}

	run(msg: KlasaMessage, [coins = 0]) {
		if (coins <= 0) return msg.sendMessage(`You flipped ${Math.random() > 0.5 ? 'Heads' : 'Tails'}.`);

		let heads = 0;
		let tails = 0;
		for (let i = 0; i < coins; i++) {
			if (Math.random() > 0.5) heads++;
			else tails++;
		}
		return msg.sendMessage(`You flipped ${coins} coins. ${heads} ${heads === 1 ? 'was' : 'were'} heads, and ${tails} ${tails === 1 ? 'was' : 'were'} tails.`);
	}

}
