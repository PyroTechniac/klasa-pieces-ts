// Copyright (c) 2017-2019 dirigeants. All rights reserved. MIT license.
import { KlasaClient, Extendable, ExtendableStore } from 'klasa';
import { Message, MessageEmbed, MessageOptions, TextChannel, MessageReaction } from 'discord.js';

const awaitReaction = async(msg: Message, message: Message) => {
	await message.react('🇾');
	await message.react('🇳');
	const data = await message.awaitReactions((reaction) => reaction.users.has(msg.author.id), { time: 20000, max: 1 });
	if (data.firstKey() === '🇾') return true;
	throw null;
};

const awaitMessage = async(message: Message) => {
	const messages = await message.channel.awaitMessages((mes) => mes.author === message.author, { time: 20000, max: 1 });
	if (messages.size === 0) throw null;
	const responseMessage = messages.first()!;
	if (responseMessage.content.toLowerCase() === 'yes') return true;
	throw null;
};

export default class extends Extendable {
	constructor(client: KlasaClient, store: ExtendableStore, file: string[], dir: string) {
		super(client, store, file, dir, { appliesTo: [Message] });
	}

	async ask(content: string, options: MessageOptions) {
		const self = this as unknown as Message;

		const message = await self.sendMessage(content, options);
		// @ts-ignore
		if ((self.channel as TextChannel).permissionsFor(self.guild!.me!)!.has('ADD_REACTIONS')) return awaitReaction(self, message);
		return awaitMessage(self);
	}

	async awaitReply(question: string, time = 60000, embed: MessageEmbed) {
		const self = this as unknown as Message;

		await (embed ? self.send(question, { embed }) : self.send(question));
		return self.channel.awaitMessages((message) => message.author.id === self.author.id,
			{ max: 1, time, errors: ['time'] })
			.then((messages) => messages.first()!.content)
			.catch(() => false);
	}

	async unreact(emojiID: string) {
		const self = this as unknown as Message;

		const reaction = self.reactions.get(emojiID);
		return reaction ? reaction.users.remove(self.client.user!) : null;
	}
}

declare module 'discord.js' {
	interface Message {
		ask(content: string, options: MessageOptions): Promise<boolean>;
		awaitReply(question: string, time = 60000, embed: MessageEmbed): Promise<string | boolean>;
		unreact(emojiID: string): Promise<MessageReaction | null>;
	}
}
