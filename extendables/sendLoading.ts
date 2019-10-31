// Copyright (c) 2017-2019 dirigeants. All rights reserved. MIT license.
import { KlasaClient, KlasaMessage, Extendable, ExtendableStore } from 'klasa';
import { Message, TextChannel } from 'discord.js';
export default class extends Extendable {
	constructor(client: KlasaClient, store: ExtendableStore, file: string[], dir: string) {
		super(client, store, file, dir, { appliesTo: [Message] });
	}

	/**
	 * @param {Function} cb The callback function to call in the middle
	 * @param {Object} [options] Extra options
	 * @param {string} [options.loadingText='Just a moment.'] Text to send before the callback
	 * @returns {Promise<KlasaMessage>} Resolves to the return of cb
	 */
	async sendLoading(cb: Function, { loadingText = 'Just a moment.' } = {}) {
		const self = this as unknown as Message;

		const loadingMsg = await self.send(loadingText) as Message;
		const oldContent = loadingMsg.content;
		// eslint-disable-next-line callback-return
		const response = await cb(loadingMsg);
		// If the message was edited in cb, we don't wanna delete it
		if (!(response && response.id === loadingMsg.id) && oldContent === loadingMsg.content) await loadingMsg.delete();
		return response;
	}

	/**
	 * @param {(KlasaMessage|TextChannel)} channel The channel you intend to post in
	 * @param {Function} cb The callback function to call in the middle
	 * @param {Object} [options] Extra options
	 * @param {string} [options.loadingText='Just a moment.'] Text to send to this.channel before the callback
	 * @param {string} [options.doneText='Sent the image 👌'] Text to send to this.channel after the callback
	 * @returns {Promise<[KlasaMessage, KlasaMessage]>} Resolves to a confirmation message in this.channel and the return of cb
	 */
	async sendLoadingFor(channel: KlasaMessage | TextChannel, cb: Function, {
		loadingText = 'Just a moment.',
		doneText = 'Sent the image 👌',
	} = {}) {
		const self = this as unknown as Message;

		await self.send(loadingText);
		// eslint-disable-next-line callback-return
		const response = await cb(channel);
		return [await self.send(doneText), response];
	}
}

declare module 'discord.js' {
	interface Message {
		sendLoading(cb: Function, { loadingText }: { loadingText?: string }): Promise<KlasaMessage>;
		sendLoadingFor(channel: KlasaMessage | TextChannel, cb: Function, { loadingText, doneText }: { loadingText?: string, doneText?: string }): Promise<[KlasaMessage, KlasaMessage]>;
	}
}
