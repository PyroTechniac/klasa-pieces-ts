// Copyright (c) 2017-2019 dirigeants. All rights reserved. MIT license.
import { Command, KlasaMessage } from 'klasa';

export default class extends Command {

	description = 'Rolls a D20';

	async run(msg: KlasaMessage) {
		msg.reply(`Rolling a D20... 🎲 **${Math.ceil(Math.random() * 20)}**`);
		return null;
	}

}
