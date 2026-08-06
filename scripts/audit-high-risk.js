/**
 * Pre-commit dependency audit check.
 *
 * Runs `pnpm audit --json` and exits non-zero when any Critical or High
 * advisory is found.
 *
 * Usage: node scripts/audit-high-risk.js
 */

const { execSync } = require('child_process');

try {
    const output = execSync('pnpm audit --json', {
        encoding: 'utf-8',
        stdio: ['pipe', 'pipe', 'pipe'],
    });

    const data = JSON.parse(output);
    checkAdvisories(data);
} catch (err) {
    // pnpm audit exits non-zero when vulnerabilities exist, but still
    // writes valid JSON to stdout.
    if (err.stdout) {
        try {
            const data = JSON.parse(err.stdout);
            checkAdvisories(data);
        } catch (parseErr) {
            console.error('❌ Failed to parse pnpm audit output:', parseErr.message);
            process.exit(1);
        }
    } else {
        console.error('❌ Failed to run pnpm audit:', err.message);
        process.exit(1);
    }
}

function checkAdvisories(data) {
    const advisories = data.advisories || {};
    const dominated = ['high', 'critical'];
    const failures = [];

    for (const [id, info] of Object.entries(advisories)) {
        if (dominated.includes(info.severity)) {
            failures.push({
                id: Number(id),
                severity: info.severity,
                module: info.module_name,
                title: info.title,
                url: info.url,
            });
        }
    }

    if (failures.length === 0) {
        console.log('✅ No high-risk vulnerabilities found.');
        process.exit(0);
    }

    console.error('❌ High or Critical vulnerabilities detected:\n');
    for (const f of failures) {
        console.error(`  [${f.severity.toUpperCase()}] ${f.module} (id: ${f.id})`);
        console.error(`    ${f.title}`);
        console.error(`    ${f.url}\n`);
    }
    console.error(`Found ${failures.length} unresolved high-risk vulnerabilit${failures.length === 1 ? 'y' : 'ies'}.`);
    console.error('Fix them before committing.');
    process.exit(1);
}
