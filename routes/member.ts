// Copyright (c) 2017-2019 dirigeants. All rights reserved. MIT license.
import { DashboardClient, KlasaIncomingMessage, Route, RouteStore } from 'klasa-dashboard-hooks';
import { ServerResponse } from 'http';

export default class extends Route {
	constructor(client: DashboardClient, store: RouteStore, file: string[], dir: string) {
		super(client, store, file, dir, { route: 'guilds/:guildID/members/:memberID' });
	}

	get(request: KlasaIncomingMessage, response: ServerResponse) {
		const { guildID, memberID } = request.params;
		const guild = this.client.guilds.get(guildID);
		if (!guild) return response.end('{}');
		const member = guild.members.get(memberID);
		if (!member) return response.end('{}');
		return response.end(JSON.stringify(member));
	}
}
