# Contributing

Thanks for helping improve Ixia UI React. This project is a React and TypeScript component library, so changes should keep public APIs predictable, accessible, and easy to compose.

## Development Setup

This project uses Vite+ (`vp`) as its unified toolchain for package installation and frontend development. Use `vp` commands for dependency installation, development, and validation. See the README for npm, pnpm, Yarn, and Bun commands to install the published library in consumer projects.

```sh
vp install
vp run storybook
```

Before opening a pull request, run the focused checks for your change and the full validation suite when practical:

```sh
vp check
vp test
vp run build
vp run build-storybook
```

`vp check` runs formatting, lint, and type checks. `vp test` runs the Vitest and Storybook test suite. Use `vp run <script>` to invoke a script from `package.json` when needed.

## Branches and Releases

- Use feature branches for individual changes.
- Target `alpha` for new components, API exploration, and breaking prerelease work.
- Target `beta` only when the API is intended to be stable for `1.0.0` testing.
- Target `rc` only for release-candidate fixes.
- Target `main` for stable releases.

## Pull Requests

Keep pull requests focused. A good component PR usually includes:

- the component implementation
- exported types and index exports
- Storybook stories for common states
- tests for behavior that can regress
- accessibility considerations for keyboard and screen reader behavior

Use conventional commit messages where possible, for example:

```txt
feat(button): add loading state
fix(select): preserve controlled value
docs(calendar): add usage examples
```

## Support the Project

Code contributions are not the only way to help. If Ixia UI React is useful to you or your team, you can [sponsor its ongoing development on GitHub](https://github.com/sponsors/PHNTMbandit). Sponsorship helps support maintenance, accessibility, documentation, testing, and future component work; it is entirely optional.

## Component Guidelines

- Prefer existing local patterns over new abstractions.
- Keep components composable and typed with clear public props.
- Avoid breaking exported names or prop shapes after beta unless the change is required.
- Include `className` support when the component renders a DOM element.
- Keep styling token-driven and consistent with the rest of the library.
- Validate keyboard, focus, disabled, loading, and controlled/uncontrolled behavior where relevant.

## Reporting Bugs

When reporting a bug, include:

- the package version
- React version
- browser and operating system
- a minimal reproduction or Storybook scenario
- expected and actual behavior

## Security Issues

Do not open public issues for vulnerabilities. Follow [SECURITY.md](SECURITY.md) instead.
