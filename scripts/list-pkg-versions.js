const { execFileSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Reused from scripts/check-version.js. Guards against command injection from a
// malicious or accidentally malformed "name" field in any package.json that
// reaches this script.
const VALID_PACKAGE_NAME_REGEX = /^(@[a-zA-Z0-9-._]+\/)?[a-zA-Z0-9-._]+$/;

const EVM_PKGS = [
    '@tronweb3/abstract-adapter-evm',
    '@tronweb3/tronwallet-adapter-metamask-evm',
    '@tronweb3/tronwallet-adapter-tronlink-evm',
    '@tronweb3/tronwallet-adapter-binance-evm',
    '@tronweb3/tronwallet-adapter-okxwallet-evm',
    '@tronweb3/tronwallet-adapter-trust-evm',
    '@tronweb3/tronwallet-adapter-ledger-evm',
];
const DIRS = [
    path.resolve(__dirname, '../packages/adapters'),
    path.resolve(__dirname, '../packages/adapters/evm'),
    path.resolve(__dirname, '../packages/react'),
    path.resolve(__dirname, '../packages/vue'),
];
const pkgVersions = [];
const pkgsToBeReleased = [];
const pkgsNotChanged = [];
DIRS.forEach((dir) => {
    const subDirs = fs.readdirSync(dir).filter((pkg) => !pkg.startsWith('.') && pkg !== 'evm');
    subDirs.forEach((pkg) => {
        const pkgPath = path.resolve(dir, pkg, 'package.json');
        let parsed;
        try {
            parsed = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
        } catch (e) {
            console.error(`Malformed package.json at ${pkgPath}: ${e.message}`);
            process.exit(1);
        }
        const { name, version } = parsed;
        if (typeof name !== 'string' || typeof version !== 'string') {
            console.error(`Invalid package.json at ${pkgPath}: "name" and "version" must be strings.`);
            process.exit(1);
        }
        if (!VALID_PACKAGE_NAME_REGEX.test(name)) {
            console.error(`Invalid or potentially malicious package name at ${pkgPath}: ${name}`);
            process.exit(1);
        }
        pkgVersions.push({ name, version });
    });
});

pkgVersions.forEach(({ name, version }) => {
    try {
        console.log(`Get info for ${name}...`);
        const oldVersion = execFileSync('npm', ['view', name, 'version'], { stdio: 'pipe' }).toString().trim();
        console.log(`${name} old version: ${oldVersion}`);
        if (oldVersion !== version) {
            pkgsToBeReleased.push({ name, version, oldVersion });
        } else {
            pkgsNotChanged.push({ name, version });
        }
    } catch (e) {
        if (e.toString().includes('E404')) {
            pkgsToBeReleased.push({ name, version, oldVersion: '0.0.0' });
        }
        // ignore
    }
});
console.log('\nPackages to be released: ');
pkgsToBeReleased.forEach(({ name, version, oldVersion }) => {
    console.log(`${name}: ${oldVersion} -> ${version}`);
});

console.log('\nPackages not changed: ');
pkgsNotChanged.forEach(({ name, version }) => {
    console.log(`${name}: ${version}`);
});

console.log('\nTag Content: \n# Package Latest Version\n## TRON');

pkgVersions
    .filter(({ name }) => !EVM_PKGS.includes(name))
    .forEach(({ name, version }) => {
        console.log(`- [${name}@${version}](https://www.npmjs.com/package/${name})`);
    });

console.log('\n## EVM');
pkgVersions
    .filter(({ name }) => EVM_PKGS.includes(name))
    .forEach(({ name, version }) => {
        console.log(`- [${name}@${version}](https://www.npmjs.com/package/${name})`);
    });
