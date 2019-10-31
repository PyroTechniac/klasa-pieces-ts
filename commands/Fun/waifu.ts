import { Command, KlasaMessage } from 'klasa';

export default class extends Command {

	description = 'Sends a randomly generated Waifu from thiswaifudoesnotexist.net';

	async run(msg: KlasaMessage) {
		return msg.sendMessage(`https://www.thiswaifudoesnotexist.net/example-${Math.floor(Math.random() * 100000)}.jpg`);
	}

}
