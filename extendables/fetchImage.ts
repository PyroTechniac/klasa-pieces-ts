// Copyright (c) 2017-2019 dirigeants. All rights reserved. MIT license.
import { KlasaClient, Extendable, ExtendableStore } from 'klasa';
import { DMChannel, TextChannel } from 'discord.js';

export default class extends Extendable {
	constructor(client: KlasaClient, store: ExtendableStore, file: string[], dir: string) {
		super(client, store, file, dir, { appliesTo: [DMChannel, TextChannel] });
	}

	async fetchImage() {
		const self = this as unknown as TextChannel;
		const messageBank = await self.messages.fetch({ limit: 20 });

		for (const message of messageBank.values()) {
			const fetchedAttachment = message.attachments.first();
			if (fetchedAttachment && fetchedAttachment.height) return fetchedAttachment;
		}

		throw 'Couldn\'t find an image.';
	}
}

declare module 'discord.js' {
	interface DMChannel {
		fetchImage(): MessageAttachment;
	}

	interface TextChannel {
		fetchImage(): MessageAttachment;
	}
}
