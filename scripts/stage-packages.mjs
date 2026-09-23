import {
	cpSync,
	existsSync,
	mkdirSync,
	readFileSync,
	realpathSync,
	rmSync,
	writeFileSync
} from 'node:fs';
import { isAbsolute, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = resolve(fileURLToPath(new URL('..', import.meta.url)));
const stageRoot = join(projectRoot, '.release');
const manifest = JSON.parse(readFileSync(join(projectRoot, 'package.json'), 'utf8'));
const actualStageRoot = existsSync(stageRoot) ? realpathSync(stageRoot) : stageRoot;
const stageLocation = relative(projectRoot, actualStageRoot);

if (stageLocation.startsWith('..') || isAbsolute(stageLocation))
	throw new Error('Release staging must stay inside the project');

if (manifest.name !== '@ciabi/loafkit-ui') throw new Error('Unexpected primary package name');
if (!existsSync(join(projectRoot, 'dist', 'index.js')))
	throw new Error('Run npm run package before staging packages');

for (const name of ['loafkit-ui', 'loaf-web']) {
	const destination = join(stageRoot, name);
	rmSync(destination, { recursive: true, force: true });
	mkdirSync(destination, { recursive: true });
	for (const entry of ['dist', 'CHANGELOG.md', 'LICENSE']) {
		cpSync(join(projectRoot, entry), join(destination, entry), { recursive: true });
	}
	cpSync(join(projectRoot, 'package', 'README.md'), join(destination, 'README.md'));
	const stagedManifest = { ...manifest, name: `@ciabi/${name}` };
	delete stagedManifest.scripts;
	writeFileSync(
		join(destination, 'package.json'),
		`${JSON.stringify(stagedManifest, null, '\t')}\n`
	);
}

console.log(`Staged @ciabi/loafkit-ui and @ciabi/loaf-web at ${manifest.version}`);
