// Copyright (c) 2017-2019 dirigeants. All rights reserved. MIT license.
import { Command, KlasaMessage } from 'klasa';
import fetch from 'node-fetch';

export default class extends Command {

	description = 'Gives you a random dog fact.';

	async run(msg: KlasaMessage) {
		const fact = await fetch(`http://dog-api.kinduff.com/api/facts?number=1`)
			.then(response => response.json())
			.then(body => body.facts[0]);
		return msg.sendMessage(`📢 **Dogfact:** *${fact}*`);
	}

}
