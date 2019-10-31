// Copyright (c) 2017-2019 dirigeants. All rights reserved. MIT license.
import { DashboardClient, KlasaIncomingMessage, Route, RouteStore } from 'klasa-dashboard-hooks';
import { ServerResponse } from 'http';

export default class extends Route {
	constructor(client: DashboardClient, store: RouteStore, file: string[], dir: string) {
		super(client, store, file, dir, { route: 'pieces/:type/:name' });
	}

	get(request: KlasaIncomingMessage, response: ServerResponse) {
		const { type, name } = request.params;
		const store = this.client.pieceStores.get(type);
		if (!store) response.end('[]');
		if (name === 'all') return response.end(JSON.stringify(store.array()));
		const piece = store.get(name);
		if (!piece) return response.end('{}');
		return response.end(JSON.stringify(piece));
	}
}
