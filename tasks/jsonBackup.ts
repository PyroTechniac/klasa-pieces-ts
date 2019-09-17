import { Task, Timestamp, Provider } from 'klasa'
import { targz, ensureDir } from 'fs-nextra'
import { resolve, dirname } from 'path'

export default class extends Task {
    private timestamp: Timestamp = new Timestamp('YYYY-MM-DD[T]HHmmss');

    private get provider(): Provider & { baseDirectory: string } {
        return this.client.providers.get('json')! as Provider & { baseDirectory: string };
    }

    public async run(data = { folder: './' }): Promise<void> {
        if (!('folder' in data)) data = { folder: './' };
        const file = resolve(data.folder, `json-backup-${this.timestamp}.tar.gz`);

        await ensureDir(dirname(file)).then(() => targz(file, this.provider.baseDirectory));
    }
}