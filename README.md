<h1>⚡️ quick starter</h1>
<pre align="center"><b>npx quick-starter</b></pre>

## Features
- Manage your templates via configuration files
- [More](https://www.npmjs.com/package/giget#Features)

## Usage(CLI)
```shell
quick-starter [<template>] [<dir>] [...options]
```
Arguments
- **template**:
    - Template name or a URI describing provider, repository, sub dir, and branch/ref. (See [Examples](https://www.npmjs.com/package/giget#Examples))
    - from your config
- **dir**: A relative or absolute path where to extract the template. By default, it is the current directory.

Options

`--force`: Clone and overwrite an existing directory.

[More options](https://www.npmjs.com/package/giget#Options)

Examples

```shell
# Clone starter from your starter config file
quick-starter

# Clone starter from local
quick-starter ./localDir/localName ./
```
[More Examples](https://www.npmjs.com/package/giget#Examples)

## Starter Config

## Alternatives
- [giget](https://github.com/unjs/giget)
- [cac](https://github.com/cacjs/cac)

## License

MIT License © 2024 [Ardanas](https://github.com/Ardanas)
