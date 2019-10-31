// Copyright (c) 2017-2019 dirigeants. All rights reserved. MIT license.
import { Command, KlasaMessage } from 'klasa';
import fetch from 'node-fetch';

export default class extends Command {

	aliases = ['yomama'];
	description = 'Yo momma is so fat, yo.';

	async run(msg: KlasaMessage) {
		const joke = await fetch('http://api.yomomma.info')
			.then(response => response.json())
			.then(body => body.joke);
		return msg.sendMessage(`📢 **Yomomma joke:** *${joke}*`);
	}

}
