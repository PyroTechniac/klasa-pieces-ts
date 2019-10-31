// Copyright (c) 2017-2019 dirigeants. All rights reserved. MIT license.
import { Command, KlasaMessage } from 'klasa';
import fetch from 'node-fetch';

export default class extends Command {

	aliases = ['catfact', 'kittenfact'];
	description = 'Let me tell you a misterious cat fact.';

	async run(msg: KlasaMessage) {
		const fact = await fetch('https://catfact.ninja/fact')
			.then(response => response.json())
			.then(body => body.fact);
		return msg.sendMessage(`📢 **Catfact:** *${fact}*`);
	}

}
