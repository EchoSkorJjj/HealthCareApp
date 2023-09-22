# My Healthcare App (HealthPortalPro)

## Table of Contents
- [Introduction](#introduction)
- [Pre-requisites](#pre-requisites)
- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [API Documentation](#api-documentation)
- [Contributing](#contributing)
- [License](#license)

## Introduction
Brief overview of the healthcare app and its purpose.

## Pre-requisites
1. Docker
2. Docker Compose
3. Make

## Installation
1. For Ubuntu
2. For Windows

### Installing Make on Ubuntu
#### 1. Update apt Database
```bash
$ sudo apt update
```
#### 2. Install Make
```bash
$ sudo apt -y install make
```
#### 3. Verify Installation
```bash
$ make --version
```

### Installing Make on Windows
##### 1. Run Powershell as an administrator
Windows Search > Windows Powershell > Right Click > Run as Administrator

##### 2. Check output of `Get-ExecutionPolicy`
If `Get-ExecutionPolicy` returns `Restricted`, run the following command.
```
$ Set-ExecutionPolicy AllSigned
```
If it is already unrestricted, then you can skip this step.

##### 3. Install `chocolatey`
```
$ Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))
```

##### 4. Install `Make`
```
$ choco install make
```

##### 5. Test Make installation
```
$ make -version
```

##### 6. Reset Execution Policy
```
$ Set-ExecutionPolicy Restricted
```

### Deployment Guide
#### 1. Clone the repository
```bash
$ gh repo clone HelloTech69/HealthCareApp
```

## Usage
Guidance on how to use the app effectively.

## Features

1. **Feature 1**
    - Description of feature 1
    - Description of feature 1
    - Description of feature 1

2. **Feature 2**
    - Description of feature 2
    - Description of feature 2
    - Description of feature 2

3. **Feature 3**
    - Description of feature 3
    - Description of feature 3
    - Description of feature 3

4. **Feature 4**
    - Description of feature 4
    - Description of feature 4
    - Description of feature 4

## API Documentation
Explanation of the API endpoints and data structures.

## Contributing
Guidelines for contributing to the project.

## License
Information about the project's license and usage rights.
