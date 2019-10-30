// Copyright (c) 2017-2019 dirigeants. All rights reserved. MIT license.
import { KlasaClient, Provider, ProviderStore, util } from 'klasa';
import { serialize, deserialize } from 'binarytf';
import { resolve } from 'path';
import { emptyDir, ensureDir, mkdir, outputFileAtomic, pathExists, readdir, readFile, remove, unlink } from 'fs-nextra';

export default class extends Provider {

	baseDirectory: string;

	constructor(client: KlasaClient, store: ProviderStore, file: string[], directory: string) {
		super(client, store, file, directory);

		const baseDirectory = resolve(this.client.userBaseDirectory, 'bwd', 'provider', 'btf');
		const defaults = util.mergeDefault({ baseDirectory }, this.client.options.providers.btf);
		this.baseDirectory = defaults.baseDirectory;
	}

	async init() {
		await ensureDir(this.baseDirectory).catch((err: Error) => this.client.emit('error', err));
	}

	/* Table methods */
	hasTable(table: string) {
		return pathExists(resolve(this.baseDirectory, table));
	}

	createTable(table: string) {
		return mkdir(resolve(this.baseDirectory, table));
	}

	deleteTable(table: string) {
		return this.hasTable(table)
			.then(exists => exists ? emptyDir(resolve(this.baseDirectory, table))
				.then(() => remove(resolve(this.baseDirectory, table))) : null);
	}

	/* Document methods */

	async getAll(table: string, entries?: any[]) {
		if (!Array.isArray(entries) || !entries.length) entries = await this.getKeys(table);
		if (entries.length < 5000) {
			return Promise.all(entries.map(this.get.bind(this, table))) as Promise<any[]>;
		}

		const chunks = util.chunk(entries, 5000);
		const output = [];
		for (const chunk of chunks) output.push(...await Promise.all(chunk.map(this.get.bind(this, table))));
		return output as any[];
	}

	async getKeys(table: string) {
		const dir = resolve(this.baseDirectory, table);
		const filenames = await readdir(dir);
		const files = [];
		for (const filename of filenames) {
			if (filename.endsWith('.btf')) files.push(filename.slice(0, filename.length - 4));
		}
		return files;
	}

	get(table: string, id: string) {
		return readFile(resolve(this.baseDirectory, table, `${id}.btf`))
			.then(deserialize)
			.catch(() => null);
	}

	has(table: string, id: string) {
		return pathExists(resolve(this.baseDirectory, table, `${id}.btf`));
	}

	getRandom(table: string) {
		return this.getKeys(table).then(data => data.length ? this.get(table, data[Math.floor(Math.random() * data.length)]) : null);
	}

	create(table: string, id: string, data = {}) {
		return outputFileAtomic(resolve(this.baseDirectory, table, `${id}.btf`), serialize({ id, ...this.parseUpdateInput(data) }));
	}

	async update(table: string, id: string, data: any) {
		const existent = await this.get(table, id);
		return outputFileAtomic(resolve(this.baseDirectory, table, `${id}.btf`), serialize(util.mergeObjects(existent || { id }, this.parseUpdateInput(data))));
	}

	replace(table: string, id: string, data: any) {
		return outputFileAtomic(resolve(this.baseDirectory, table, `${id}.btf`), serialize({ id, ...this.parseUpdateInput(data) }));
	}

	delete(table: string, id: string) {
		return unlink(resolve(this.baseDirectory, table, `${id}.btf`));
	}

};
