<h1>⚡️ quick starter</h1>
<pre align="center">npx <b>quick-starter</b></pre>

<p align='center'>
<img src='./screenshots/help.png' width='600'/>
</p>

## Features
- Manage your templates via configuration files
- [More](https://www.npmjs.com/package/giget#Features)

## Usage(CLI)
```shell
quick-starter [template] [dir] [...options]
```
### Arguments
- **template**:
    - Template name or a URI describing provider, repository, sub dir, and branch/ref. (See [Examples](https://www.npmjs.com/package/giget#Examples))
    - from your config
- **dir**: A relative or absolute path where to extract the template. By default, it is the current directory.

### Options
`--dir`: A relative or absolute path where to extract the template, with the highest priority.

`--force`: Clone and overwrite an existing directory.

[More options](https://www.npmjs.com/package/giget#Options)

### Examples

1. Clone starter from your starter config file

```shell
⚡  npx quick-starter
```
<p align='center'>
<img src='./screenshots/default.png' width='600'/>
</p>

> At present, the data in the dropdown list comes from a fixed configuration file, and in the future, users will be able to customize and select the starter configuration file

<p align='center'>
<img src='./screenshots/data.png' width='600'/>
</p>

2. Clone starter from local

```shell
npx quick-starter ./dir/filename ./
```

3. Clone starter from git repo
```shell
npx quick-starter gh:antfu/starter-ts ./
```

4. [More Examples](https://www.npmjs.com/package/giget#Examples)

## Starter Config

## Alternatives
- [giget](https://github.com/unjs/giget)
- [cac](https://github.com/cacjs/cac)

## License

MIT License © 2024 [Ardanas](https://github.com/Ardanas)
