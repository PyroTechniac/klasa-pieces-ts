// Copyright (c) 2017-2019 dirigeants. All rights reserved. MIT license.
import { DashboardClient, KlasaIncomingMessage, Route, RouteStore } from 'klasa-dashboard-hooks';
import { ServerResponse } from 'http';

export default class extends Route {
	constructor(client: DashboardClient, store: RouteStore, file: string[], dir: string) {
		super(client, store, file, dir, { route: 'guilds/:guildID/emojis' });
	}

	get(request: KlasaIncomingMessage, response: ServerResponse) {
		const { guildID } = request.params;
		const guild = this.client.guilds.get(guildID);
		if (!guild) return this.notFound(response);
		return response.end(JSON.stringify(guild.emojis.keyArray()));
	}

	notFound(response: ServerResponse) {
		response.writeHead(404);
		return response.end('[]');
	}
}
