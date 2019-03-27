// Copyright (c) 2017-2019 dirigeants. All rights reserved. MIT license.
import { Command, CommandStore, KlasaClient, KlasaMessage } from 'klasa';

export default class extends Command {

	constructor(client: KlasaClient, store: CommandStore, file: string[], dir: string) {
		super(client, store, file, dir, {
			aliases: ['8', 'magic', '8ball', 'mirror'],
			description: 'Magic 8-Ball, does exactly what the toy does.',
			usage: '<query:str>',
		});
	}

	run(message: KlasaMessage, [question]: [string]) {
		return message.send(question.endsWith('?') ?
			`🎱 ${answers[Math.floor(Math.random() * answers.length)]}` :
			"🎱 That doesn't look like a question, try again please.");
	}

}

const answers = [
	'Maybe.',
	'Certainly not.',
	'I hope so.',
	'Not in your wildest dreams.',
	'There is a good chance.',
	'Quite likely.',
	'I think so.',
	'I hope not.',
	'I hope so.',
	'Never!',
	'Fuhgeddaboudit.',
	'Ahaha! Really?!?',
	'Pfft.',
	'Sorry, bucko.',
	'Hell, yes.',
	'Hell to the no.',
	'The future is bleak.',
	'The future is uncertain.',
	'I would rather not say.',
	'Who cares?',
	'Possibly.',
	'Never, ever, ever.',
	'There is a small chance.',
	'Yes!',
];
