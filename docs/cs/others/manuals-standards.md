---
title: Manuals & Standards
---

## Semantic Versioning

**Refer to**: [Semantic Versioning](https://semver.org/).

Given a version number `MAJOR.MINOR.PATCH`, increment the:

 - `MAJOR` version when you make incompatible API changes.
 - `MINOR` version when you add functionality in a backward compatible manner.
 - `PATCH` version when you make backward compatible bug fixes.

---

## Conventional Commits

**Refer to**: [Conventional Commits](https://www.conventionalcommits.org/) / [Angular Convention](https://github.com/angular/angular/blob/main/CONTRIBUTING.md#-commit-message-format).

Structure of the commit message:

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

 - **`fix`**: correlates with `PATCH` in SemVer.
 - **`feat`**: correlates with `MINOR` in SemVer.
 - **`BREAKING CHANGE`**: a commit that has a footer `BREAKING CHANGE`, or appends a `!` after the type/scope, correlating with `MAJOR` in SemVer.
 - **`<type>`**: `build`, `chore`, `ci`, `docs`, `style`, `refactor`, `perf`, `test`, etc.
 - **`<description>`**:
    - use the imperative, present tense: "change" not "changed" nor "changes".
    - don't capitalize the first letter.
    - no dot (`.`) at the end.

Example:

```
chore!: drop support for Node 6

BREAKING CHANGE: use JavaScript features not available in Node 6.
```
