const fs = require('fs');
const path = require('path');

const pkgDepMap = new Map();
const packagesRoot = path.resolve(process.cwd(), 'packages');

function isDeprecatedPackageDir(dir) {
    const relativePath = path.relative(packagesRoot, dir);
    return relativePath === 'deprecated' || relativePath.startsWith(`deprecated${path.sep}`);
}

function scanDir(dir) {
    if (isDeprecatedPackageDir(dir)) {
        return;
    }

    // Read and validate package.json if present. A missing package.json is normal
    // (e.g. the `packages/` root itself is not a package); a present but malformed
    // or invalid one is a release-blocking error and must fail closed.
    const pkgPath = path.resolve(dir, 'package.json');
    if (fs.existsSync(pkgPath)) {
        let json;
        try {
            json = JSON.parse(fs.readFileSync(pkgPath, { encoding: 'utf-8' }));
        } catch (e) {
            console.error(`Malformed package.json at ${pkgPath}: ${e.message}`);
            process.exit(1);
        }
        if (typeof json.name !== 'string' || typeof json.version !== 'string') {
            console.error(`Invalid package.json at ${pkgPath}: "name" and "version" must be strings.`);
            process.exit(1);
        }
        const depVersionMap = new Map();
        const deps = {
            ...(json.dependencies || {}),
            ...(json.devDependencies || {}),
            ...(json.peerDependencies || {}),
        };
        Object.entries(deps).forEach(([pkgName, version]) => {
            const numVersion = getNumberVersion(version);
            if (numVersion) {
                depVersionMap.set(pkgName, numVersion);
            }
        });
        pkgDepMap.set(json.name, {
            version: json.version,
            depVersionMap,
        });
    }
    fs.readdirSync(dir).forEach((subDir) => {
        const newPath = path.resolve(dir, subDir);
        if (!['node_modules', 'lib'].includes(subDir) && fs.statSync(newPath).isDirectory()) {
            scanDir(newPath);
        }
    });
}
function getDepTree() {
    scanDir(path.resolve(process.cwd(), 'packages'));
}

function findMismatchPackage() {
    const resultMap = {};

    for (const [pkgName, pkgDepInfo] of pkgDepMap.entries()) {
        const misMatchDeps = [];
        const { depVersionMap } = pkgDepInfo;
        for (const [depName, version] of depVersionMap.entries()) {
            if (pkgDepMap.has(depName) && version !== pkgDepMap.get(depName).version) {
                misMatchDeps.push(depName);
            }
        }
        resultMap[pkgName] = misMatchDeps;
    }
    return resultMap;
}

function getNumberVersion(versionString) {
    return versionString.replace(/^[^\d]*/, '');
}

function run() {
    getDepTree();
    const resultMap = findMismatchPackage();
    for (const [pkgName, misMatchDeps] of Object.entries(resultMap)) {
        if (misMatchDeps.length === 0) {
            continue;
        }
        console.log(`The dependencies in ${pkgName} is mismatched:`);
        misMatchDeps.forEach((dep) => {
            console.log(`\t${dep} should have version ${pkgDepMap.get(dep).version}`);
        });
    }
    if (Object.values(resultMap).some((v) => v.length > 0)) {
        process.exit(1);
    }
}
run();
