import { Command, CommandStore, KlasaClient, KlasaMessage } from 'klasa';
import fetch from 'node-fetch'

const API_URL = 'https://discordemoji.com/api/';

interface IAPIEmoji {
  id: number;
  title: string;
  slug: string;
  image: string;
  description: string;
  category: string | number;
  license: string;
  source: string;
  faves: number;
  submitted_by: string;
  width: number;
  height: number;
  filesize: number
}

interface IEmojis extends IAPIEmoji {
  category: string;
  nsfw: boolean;
}

export default class extends Command {

  private emojis?: IEmojis[];

	constructor(client: KlasaClient, store: CommandStore, file: string[], dir: string) {
		super(client, store, file, dir, {
			aliases: ['de'],
			description: 'Searches discordemoji.com for an emoji.',
			usage: '<query:str{1,20}> [count:int{1,100}]',
			usageDelim: ','
		});
	}

	async run(msg: KlasaMessage, [query, count = 4]: [string, number]) {
		const matches = this.emojis!.filter(({ nsfw, title }) => {
      // Don't post NSFW emoji in a SFW channel
      // @ts-ignore
			if (!msg.channel.nsfw && nsfw) return false;
			return title.toUpperCase().includes(query.toUpperCase());
		});

		if (matches.length === 0) return msg.send('No results.');

		return msg.send(
			matches
				.sort(() => Math.random() - 0.5)
				.slice(0, count)
				.map((emj) => emj.image)
				.join(' '));
	}

	async init() {
		// Fetch the emojis and categories from the API
		const [emojis, cats] = await Promise.all(
			[API_URL, `${API_URL}?request=categories`].map((url) => fetch(url).then((res) => res.json()))
		);

		// Change the emojis' properties to be more useful
		this.emojis = emojis.map((emj: IAPIEmoji) => ({
			...emj,
			category: cats[emj.category],
			nsfw: cats[emj.category] === 'NSFW',
			description: emj.description.includes('View more') ? '' : emj.description
		}));
	}

}
