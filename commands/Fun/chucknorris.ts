// Copyright (c) 2017-2019 dirigeants. All rights reserved. MIT license.
import { Command, KlasaMessage } from 'klasa';
import fetch from 'node-fetch';

export default class extends Command {
	
	aliases = ['chucknorrisjoke'];
	description = 'Chuck Norris has some good jokes.';

	async run(msg: KlasaMessage) {
		const joke = await fetch('http://api.chucknorris.io/jokes/random')
			.then(response => response.json())
			.then(body => body.value);
		return msg.sendMessage(`**😁 Chuck Norris Joke:** ${joke}`);
	}

}
