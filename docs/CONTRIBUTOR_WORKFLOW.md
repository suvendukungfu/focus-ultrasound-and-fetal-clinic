# 🤝 Contributor Workflow

We follow a Git-based workflow with strict adherence to Conventional Commits.

## Branches

- `main`: Production-ready code (protected)
- `develop`: Integration branch (protected)
- `feature/*`: Feature development
- `fix/*`: Bug fixes
- `hotfix/*`: Production hotfixes

## Commit Messages

We use [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/).

- `feat: add new login page`
- `fix: resolve api timeout`
- `docs: update readme`
- `chore: update dependencies`
- `test: add user service tests`

## Pull Request Guidelines

1.  Create a feature branch from `develop`.
2.  Commit changes with clear messages.
3.  Push to origin.
4.  Open a Pull Request to `develop`.
5.  Ensure CI checks pass.
6.  Request review from code owners.

## Code Quality

- Linting: `npm run lint` must pass.
- Testing: `npm run test` must pass (min 80% coverage).
- Formatting: Prettier check.

Thank you for contributing to Antigravity!
