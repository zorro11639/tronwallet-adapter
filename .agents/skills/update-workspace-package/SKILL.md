---
name: update-workspace-package
description: Safely implement code updates, document APIs, and bump version numbers for a specific package in the adapter-tronweb3 monorepo.
---

# Update Workspace Package

You are a senior frontend engineer maintaining the `adapter-tronweb3` monorepo. When a user asks you to modify or add new functionality to a specific workspace (e.g., `packages/react/react-hooks`, `packages/adapters/ledger`), you MUST follow these precise steps to ensure code quality, proper documentation, and exact version management.

## Step 1: Analyze and Implement Code Changes

1. **Locate the target workspace**: Use the `list_dir` and `view_file` tools to properly navigate to the target workspace and read the source files you need to change.
2. **Implement**:
    - Apply the requested updates, whether modifying existing code logic or adding new APIs.
    - Use the `replace_file_content` or `multi_replace_file_content` tools to surgically modify files.
3. **Add Inline Comments**: Any new functions, classes, interfaces, or significant logic blocks MUST be documented with JSDoc / TSDoc comments explaining parameters, return types, and usage context.

## Step 2: Add Unit Tests

1. **Evaluate**: Determine if the updates introduced any new APIs or complex logic.
2. **Implement Tests**: If necessary, add simple but effective test cases in the workspace's `tests` directory to verify the newly added APIs.

## Step 3: Update the Workspace Documentation

1. **Evaluate Impact**: Determine if your changes affect the public API surface.
2. **Modify README**: If an API was added or changed, use `view_file` to read the target workspace's `README.md`.
3. **Document**: Use code editing tools to add the new API signature, description, and a brief code example to the corresponding section of the `README.md`.

## Step 4: Bump the Workspace Version

1. **Read Package JSON**: Read the `package.json` of the target workspace.
2. **Increment Patch Version**: Increment the patch version (the last digit, e.g., `1.1.12` -> `1.1.13`).
3. **Save**: Update the `version` field using `replace_file_content`.

## Step 5: Bump the Aggregator Package Version

1. **Target**: The `packages/adapters/adapters` workspace acts as an aggregator. Its version must also reflect the updates in its sub-dependencies.
2. **Read**: Read `packages/adapters/adapters/package.json`.
3. **Increment Patch Version**: Increment its patch version as well (e.g., `1.2.23` -> `1.2.24`).
4. **Save**: Apply the update and ensure any explicit dependency ranges for the updated sub-workspace are still valid.

## Step 6: Verification

1. **Test**: Proactively run `pnpm test --filter <target-workspace>` to ensure the changes did not break existing logic.
2. **Build**: Proactively run `pnpm build --filter <target-workspace>` to verify that TypeScript compilation and packaging remain successful.

## Rules & Constraints

-   ALWAYS use strictly targeted modifications. Do not rewrite entire files unless absolutely necessary.
-   DO NOT bump MINOR or MAJOR versions unless strongly requested by the user. Only bump the PATCH version.
-   NEVER skip the README.md update if a public API is modified.
