import { MessageEmbed } from 'discord.js';
import { Command, CommandStore, KlasaClient, KlasaMessage } from 'klasa';

export default class extends Command {
	constructor(
		client: KlasaClient,
		store: CommandStore,
		file: string[],
		dir: string
	) {
		super(client, store, file, dir, {
			description: 'Get a themed badge from robohash.org',
			usage: '[user:mention] [set:integer{1,4}]',
			usageDelim: ' ',
		});
	}

	async run(message: KlasaMessage, [user = message.author, set = 1]) {
		return message.sendEmbed(
			new MessageEmbed()
				.setImage(`https://robohash.org/${user.id}?set=set${set}`)
				.setColor('RANDOM')
				.setFooter(
					`Requested by ${message.author.tag}`,
					message.author.displayAvatarURL()
				)
				.setTimestamp()
		);
	}
}
