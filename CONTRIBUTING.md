# Contributing to GRAPHANE

Thank you for considering contributing to GRAPHANE! Contributions, whether they are bug reports,
feature suggestions, code improvements, or documentation, are highly appreciated. Here’s a guide to
help you get started.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How to Contribute](#how-to-contribute)
- [Reporting Issues](#reporting-issues)
- [Pull Requests](#pull-requests)
- [Development Setup](#development-setup)
- [Examples](#examples)
- [Documentation](#documentation)

## Code of Conduct

Please read and follow
our [Code of Conduct](https://github.com/graphery/graphane/CODE_OF_CONDUCT.md) to ensure a welcoming
environment for all.

## How to Contribute

1. **Fork the repository** on GitHub.
2. **Create a new branch** for your contribution:
   ```bash
   git checkout -b feature/my-new-feature
   ```
3. **Make your changes** in your local repository.
4. **Test your changes** to ensure everything works as expected.
5. **Commit and push** your changes to your branch.
6. **Create a Pull Request (PR)** on GitHub to the `main` branch.

### What can you contribute?

- **Bug Fixes**: Find and fix any bugs, even small ones!
- **New Features**: Submit new ideas or features that you believe will benefit the library.
- **Documentation**: Improvements to the documentation are always welcome.
- **Tests**: Writing and improving tests is a valuable contribution.
- **Examples**: Design and develop examples and demos is a precious contribution.

## Reporting Issues

If you encounter a bug or would like to suggest a new feature, please report it by opening an issue
in the GitHub repository. Before submitting a new issue, please:

1. **Search existing issues** to make sure it hasn’t been reported already.
2. **Provide a clear and descriptive title** and as much information as possible to help reproduce
   or understand the issue.

Submit issues [here](https://github.com/graphery/graphane/issues).

## Pull Requests

When submitting a pull request:

1. Add the necessary tests if applicable.
2. Explain the changes and reasoning behind your pull request in the description.
3. Link to any related issues or discussions.

If your pull request closes an issue, please reference it using:

```markdown
Closes #<issue_number>
```

We will review your pull request as soon as possible. Please be patient!

## Development Setup

To set up the development environment:

1. Clone the repository:
   ```bash
   git clone https://github.com/graphery/graphane.git
   cd graphane
   ```
2. Install develop dependencies:
   ```bash
   npm install
   npx playwright install
   ```
3. To interactively test each of the cases, you can use the workbench tool. To run it with:
   ```bash
   npm run workbench:<package-name>
   ``` 
4. Run the tests:
   ```bash
   npm test
   ```

## Contributing Examples

We encourage you to contribute new examples or demos for GRAPHANE that showcase how the library can
be used. These examples will be featured in
the [GRAPHANE Playground](https://playground.graphane.dev).

### How to Contribute Examples

1. Go to the [GRAPHANE Playground](https://playground.graphane.dev).
2. Create or modify an example to demonstrate features of GRAPHANE.
3. Test your example thoroughly in the playground environment.
4. Submit your example through the playground interface.
5. Describe the purpose of the example.

Contributing examples is a great way to help others understand how to use GRAPHANE and inspire new
use cases!

## Documentation

If you're contributing to the documentation:

- All documentation is located in the [graphane-doc](https://github.com/graphery/graphane-doc) repo.
- Use Markdown for documentation changes.
- Follow existing formatting styles and structure.

For any major changes to the documentation, refer to
the [official GRAPHANE documentation](https://graphane.dev/).

---

Thank you for contributing to GRAPHANE!

```

