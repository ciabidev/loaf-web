import { execFileSync } from 'node:child_process';
import {
	existsSync,
	mkdtempSync,
	mkdirSync,
	readFileSync,
	readdirSync,
	rmSync,
	statSync,
	writeFileSync
} from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = resolve(fileURLToPath(new URL('..', import.meta.url)));
const fixtureRoot = mkdtempSync(join(tmpdir(), 'loaf-web-consumer-'));
const consumerRoot = join(fixtureRoot, 'consumer');
const forbiddenImport =
	/(?:from\s*|import\s*\(\s*|import\s+)["'](?:\$app|\$lib|\$components)(?:\/|["'])/;
const offline = process.env.npm_config_offline === 'true';

function getOfflineDependencies(rootPackages) {
	if (!offline) return {};

	const lock = JSON.parse(readFileSync(join(projectRoot, 'package-lock.json'), 'utf8'));
	const dependencies = {};
	const queue = [...rootPackages];

	for (let index = 0; index < queue.length; index++) {
		const name = queue[index];
		if (dependencies[name]) continue;

		const lockEntry = lock.packages[`node_modules/${name}`];
		if (!lockEntry?.resolved) throw new Error(`No locked tarball is available for ${name}`);
		dependencies[name] = lockEntry.resolved;

		const manifestPath = join(projectRoot, 'node_modules', name, 'package.json');
		if (!existsSync(manifestPath)) continue;
		const manifest = JSON.parse(readFileSync(manifestPath, 'utf8'));
		queue.push(...Object.keys(manifest.dependencies ?? {}));
		queue.push(...Object.keys(manifest.optionalDependencies ?? {}));
	}

	return dependencies;
}

const offlineDependencies = getOfflineDependencies([
	'@sveltejs/kit',
	'@sveltejs/vite-plugin-svelte',
	'@types/node',
	'dompurify',
	'isomorphic-dompurify',
	'marked',
	'shiki',
	'svelte',
	'typescript',
	'vite'
]);

function run(command, args, cwd = projectRoot) {
	execFileSync(command, args, { cwd, stdio: 'inherit', shell: process.platform === 'win32' });
}

function write(relativePath, contents) {
	const destination = join(consumerRoot, relativePath);
	mkdirSync(resolve(destination, '..'), { recursive: true });
	writeFileSync(destination, contents);
}

function findForbiddenImports(directory) {
	const matches = [];
	const textExtensions = new Set([
		'.css',
		'.d.ts',
		'.html',
		'.js',
		'.json',
		'.map',
		'.svelte',
		'.ts'
	]);

	function visit(current) {
		for (const entry of readdirSync(current, { withFileTypes: true })) {
			const path = join(current, entry.name);
			if (entry.isDirectory()) {
				visit(path);
				continue;
			}

			const extension = entry.name.endsWith('.d.ts')
				? '.d.ts'
				: entry.name.slice(entry.name.lastIndexOf('.'));
			if (!textExtensions.has(extension)) continue;
			if (forbiddenImport.test(readFileSync(path, 'utf8'))) matches.push(path);
		}
	}

	visit(directory);
	return matches;
}

try {
	run('npm', ['run', 'package']);
	const packResult = JSON.parse(
		execFileSync('npm', ['pack', '--json', '--pack-destination', fixtureRoot], {
			cwd: projectRoot,
			encoding: 'utf8',
			shell: process.platform === 'win32'
		})
	)[0];
	const tarballPath = join(fixtureRoot, packResult.filename);

	const expectedFiles = [
		'dist/index.js',
		'dist/index.d.ts',
		'dist/styles/loaf.css',
		'dist/styles/reset.css',
		'dist/styles/fonts.css',
		'dist/styles/app.css',
		'dist/components/icons/LICENSE.md',
		'CHANGELOG.md'
	];
	const packedFiles = new Set(packResult.files.map((file) => file.path));
	for (const expectedFile of expectedFiles) {
		if (!packedFiles.has(expectedFile)) throw new Error(`Tarball is missing ${expectedFile}`);
	}

	mkdirSync(consumerRoot, { recursive: true });
	write(
		'package.json',
		JSON.stringify(
			{
				private: true,
				type: 'module',
				scripts: {
					check: 'svelte-kit sync && tsc --noEmit',
					build: 'vite build'
				},
				dependencies: {
					'@ciabi/loaf-web': `file:${tarballPath.replaceAll('\\', '/')}`,
					...offlineDependencies
				},
				devDependencies: offline
					? {}
					: {
							'@sveltejs/kit': '^2.70.3',
							'@sveltejs/vite-plugin-svelte': '^5.0.0',
							'@types/node': '^24.3.0',
							svelte: '^5.0.0',
							typescript: '^5.0.0',
							vite: '^6.2.6'
						}
			},
			null,
			2
		)
	);
	write(
		'svelte.config.js',
		"import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';\n\nexport default { preprocess: vitePreprocess() };\n"
	);
	write(
		'vite.config.ts',
		"import { sveltekit } from '@sveltejs/kit/vite';\nimport { defineConfig } from 'vite';\n\nexport default defineConfig({ plugins: [sveltekit()] });\n"
	);
	write(
		'tsconfig.json',
		JSON.stringify(
			{ extends: './.svelte-kit/tsconfig.json', compilerOptions: { strict: true } },
			null,
			2
		)
	);
	write(
		'src/app.html',
		'<!doctype html><html lang="en"><head><meta charset="utf-8" />%sveltekit.head%</head><body data-sveltekit-preload-data="hover"><div style="display: contents">%sveltekit.body%</div></body></html>\n'
	);
	write(
		'src/routes/+layout.svelte',
		`<script lang="ts">
	import '@ciabi/loaf-web/styles.css';
	import '@ciabi/loaf-web/reset.css';
	import '@ciabi/loaf-web/fonts.css';
	import '@ciabi/loaf-web/app.css';
	import type { Snippet } from 'svelte';

	let { children }: { children: Snippet } = $props();
</script>

{@render children()}
`
	);
	write(
		'src/routes/+page.svelte',
		`<script lang="ts">
	import { onMount } from 'svelte';
	import {
		applyFlavor,
		Basket,
		Card,
		DialogHolder,
		getFlavor,
		listFlavors,
		Loaf,
		registerFlavor,
		Selector,
		type FlavorDefinition
	} from '@ciabi/loaf-web';

	const smokeFlavor: FlavorDefinition = {
		name: 'consumer smoke',
		description: 'Packed consumer theme',
		iconPath: '/theme.png',
		isDark: false,
		cssVariables: { '--loaf-accent': '#b45f37' }
	};
	registerFlavor(smokeFlavor);
	const registeredFlavor = getFlavor(smokeFlavor.name);
	const flavorCount: number = listFlavors().length;
	let selected = $state('one');

	onMount(() => applyFlavor(smokeFlavor.name));
</script>

<Basket>
	<DialogHolder />
	<Loaf>
		<Card name="Packed consumer">{registeredFlavor?.description} ({flavorCount})</Card>
		<Selector options={[{ value: 'one', text: 'One' }]} bind:selected />
	</Loaf>
</Basket>
`
	);
	write(
		'src/typecheck.ts',
		`import {
	Basket,
	Card,
	DialogHolder,
	Loaf,
	Selector,
	type FlavorDefinition
} from '@ciabi/loaf-web';

const publicComponents = [Basket, Card, DialogHolder, Loaf, Selector];
const flavor: FlavorDefinition = {
	name: 'typed consumer',
	description: 'Declaration smoke test',
	iconPath: '/theme.png',
	isDark: false,
	cssVariables: { '--loaf-accent': '#b45f37' }
};

void publicComponents;
void flavor;
`
	);

	run('npm', ['install', '--no-audit', '--no-fund', '--ignore-scripts'], consumerRoot);
	run('npm', ['run', 'check'], consumerRoot);
	run('npm', ['run', 'build'], consumerRoot);

	const installedPackageRoot = join(consumerRoot, 'node_modules', '@ciabi', 'loaf-web');
	const installedManifest = JSON.parse(
		readFileSync(join(installedPackageRoot, 'package.json'), 'utf8')
	);
	for (const exportName of ['./styles.css', './reset.css', './fonts.css', './app.css']) {
		if (!installedManifest.exports?.[exportName])
			throw new Error(`Missing package export ${exportName}`);
	}

	const forbiddenMatches = [
		...findForbiddenImports(join(projectRoot, 'dist')),
		...findForbiddenImports(join(installedPackageRoot, 'dist')),
		...findForbiddenImports(join(consumerRoot, '.svelte-kit', 'output'))
	];
	if (forbiddenMatches.length) {
		throw new Error(`Repository-only imports found:\n${forbiddenMatches.join('\n')}`);
	}

	const tarballSize = statSync(tarballPath).size;
	console.log(
		`Consumer smoke test passed: ${packResult.files.length} files, ${tarballSize} byte tarball, ${packResult.size} packed bytes.`
	);
} finally {
	rmSync(fixtureRoot, { recursive: true, force: true });
}
