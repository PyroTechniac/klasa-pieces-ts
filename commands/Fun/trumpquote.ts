// Copyright (c) 2017-2019 dirigeants. All rights reserved. MIT license.
import { Command, KlasaMessage } from 'klasa';
import fetch from 'node-fetch';

export default class extends Command {

	description = 'Returns a random Donald Trump quote.';

	async run(msg: KlasaMessage) {
		const quote = await fetch('https://api.tronalddump.io/random/quote')
			.then(response => response.json())
			.then(body => body.value)
			.catch(() => { throw 'There was an error. Please try again.'; });
		return msg.sendMessage(quote);
	}

}
