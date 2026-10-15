# Security Policy

## Supported Versions

Security fixes are prioritized for the supported release channels listed below.

| Version         | Supported |
| --------------- | --------- |
| `1.0.0-rc.x`    | Yes       |
| `1.0.0-beta.x`  | Yes       |
| `1.0.0-alpha.x` | No        |

## Reporting a Vulnerability

Please do not report security vulnerabilities through public GitHub issues.

Use GitHub private vulnerability reporting if it is enabled for this repository. If private vulnerability reporting is not enabled, contact the maintainer privately through the repository owner's published GitHub contact methods.

Include as much detail as possible:

- affected package version
- affected component or export
- reproduction steps
- impact and expected attack scenario
- any known workaround

You can expect an initial response as soon as the report is reviewed. Valid reports will be fixed privately when practical and disclosed after a patched release is available.

## Dependency Security

This repository uses Dependabot configuration to monitor GitHub Actions and npm dependencies. Security updates should be reviewed, tested, and merged promptly when they affect published package consumers.
