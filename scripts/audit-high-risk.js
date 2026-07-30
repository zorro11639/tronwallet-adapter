/**
 * Pre-commit dependency audit check.
 *
 * Runs `pnpm audit --json` and exits non-zero when any Critical or High
 * advisory is found that is NOT in the known-exception list.
 *
 * Exceptions are advisories for which no patch exists (e.g. the upstream
 * library is unmaintained) or where the advisory range is imprecise
 * (e.g. brace-expansion <=5.0.7 matching v2.x which has no separate fix).
 *
 * Usage: node scripts/audit-high-risk.js
 */

const { execSync } = require('child_process');

// ── Known exceptions (GHSA IDs) ──────────────────────────────────────────────
// Add the GHSA advisory URL suffix here when a high/critical advisory cannot
// be resolved and has been explicitly accepted.
const KNOWN_EXCEPTIONS = new Set([]);

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
        const numericId = Number(id);
        if (KNOWN_EXCEPTIONS.has(numericId)) continue;
        if (dominated.includes(info.severity)) {
            failures.push({
                id: numericId,
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
    console.error('Fix them, or add the advisory ID to KNOWN_EXCEPTIONS in scripts/audit-high-risk.js if accepted.');
    process.exit(1);
}
