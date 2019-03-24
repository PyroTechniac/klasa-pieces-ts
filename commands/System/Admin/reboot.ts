// Copyright (c) 2017-2019 dirigeants. All rights reserved. MIT license.

/*
 * In your main file, put:
 * Client.defaultClientSchema.add('restart', folder => folder
 *   .add('message', 'messagepromise')
 *   .add('timestamp', 'bigint', { min: 0 }));
 *
 * Uses the bigint and messagepromise serializers from https://github.com/dirigeants/klasa-pieces/tree/master/serializers
 *
 * If BigInt doesn't exist, update Node.js.
 */

import { Command, CommandStore, KlasaClient, KlasaMessage, SchemaFolder, SchemaPiece, Settings } from 'klasa';

const DIGITS_TO_UNITS = new Map([
	[9, 's'],
	[6, 'ms'],
	[3, 'μs'],
]);

const rebootKeys = ['message', 'timestamp'].map((key) => `restart.${key}`);

export default class RebootCommand extends Command {

	constructor(client: KlasaClient, store: CommandStore, file: string[], dir: string) {
		super(client, store, file, dir , {
			description: (language) => language.get('COMMAND_REBOOT_DESCRIPTION'),
			guarded: true,
			permissionLevel: 10,
		});
	}

	async run(msg: KlasaMessage) {
		await (this.client.settings as Settings).update({
			restart: {
				message: await msg.sendLocale('COMMAND_REBOOT'),
				timestamp: process.hrtime.bigint(),
			},
		}).then((result) => result.errors.length && this.client.emit('error', result.errors.join('\n')));
		await Promise.all([
			...this.client.providers.map((provider) => provider.shutdown()),
		]);
		process.exit();
		return null;
	}

	async init() {
		// "message" needs to be awaited
		const [message, timestamp] = await Promise.all(rebootKeys.map((key) => this._resolveSetting(key)));
		await (this.client.settings as Settings).reset(rebootKeys);

		if (message) message.send(`✅ Successfully rebooted. (Took: ${timestamp && RebootCommand.getFriendlyDuration(timestamp)})`);
		else this.client.emit('info', 'No restart channel');
	}

	_resolveSetting(path: string) {
		const { settings, languages: { default: language } } = this.client;

		const route = typeof path === 'string' ? path.split('.') : path;
		const piece = ((settings as Settings).gateway.schema as SchemaFolder).get(route) as SchemaPiece;

		let objOrData = settings as Settings;
		for (const key of route) objOrData = objOrData.get(key);

		try {
			return piece.serializer.deserialize(objOrData, piece, language);
		} catch (err) {
			return undefined;
		}
	}

	static bigAbs(bigint: bigint) {
		return bigint < 0 ? -bigint : bigint;
	}

	static getFriendlyDuration(from: bigint, to = process.hrtime.bigint()) {
		const time = this.bigAbs(to - from).toString();
		let shift, suffix;

		const digits = time.length;
		for (const [d, suf] of DIGITS_TO_UNITS) {
			if (digits > d) {
				shift = -d;
				suffix = suf;
				break;
			}
		}

		const whole = time.slice(0, shift);
		const fractional = `${time.slice(shift, (shift as number) + 1)}${this._roundDigit(time.slice((shift as number) + 1, (shift as number) + 3))}`;
		return `${whole}.${fractional}${suffix}`;
	}

	static _roundDigit([digit, otherDigit]: any) {
		return Number(digit) + ((otherDigit >= 5) as unknown as number);
	}

}
