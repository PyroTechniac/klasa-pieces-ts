// Copyright (c) 2017-2019 dirigeants. All rights reserved. MIT license.
import { DashboardClient, KlasaIncomingMessage, Route, RouteStore } from 'klasa-dashboard-hooks';
import { ServerResponse } from 'http';

export default class extends Route {
	constructor(client: DashboardClient, store: RouteStore, file: string[], dir: string) {
		super(client, store, file, dir, { route: 'users' });
	}

	get(_request: KlasaIncomingMessage, response: ServerResponse) {
		return response.end(JSON.stringify(this.client.users.keyArray()));
	}
}
