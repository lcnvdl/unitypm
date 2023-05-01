# Unity Local Package Manager
UnityPM is a simple command-line tool that helps you manage local Unity packages. With this tool, you can easily publish a package to a local repository and then install it in other Unity projects.

## Installation
To install this tool, follow these steps:

### Alternative 1: Using the published CLI.
1. Run the following command:
```bash
npm i -g @forjagames/unitypm
```

### Alternative 2: Compiling and installing the CLI in your local machine.
1. Clone this repository to your local machine.
2. Open a terminal window and navigate to the repository folder.
3. Run the following command: `npm install -g .`.

## Usage
The tool provides the following commands:
* init: Creates a `package.json` file with metadata such as the package name, version, and description that only needs to be configured once before publishing.
* publish: Adds the package to the local repository.
* unpublish: Removes a package from the local repository.
* install: Installs a package from the local repository into the current Unity project.
* update: Updates the installed packages to the latest version.

To use the tool, open a terminal window in the Unity project folder and run the desired command.

## Example
Here's an example of how to use the tool:

1. Open a terminal window in your Unity project `Assets` folder (or any subdirectory inside `Assets`).
2. Run the following command: `upm init` and configure your `package.json` file. *Package name for the example: `MyPackage`*.
3. Run the following command: `upm publish`. This will create a new package and add it to the local repository.
5. To install the package in another Unity project, open a terminal window in that project `Assets` folder (or any subdirectory inside `Assets`) and run the following command: `upm install MyPackage`.
This will install the MyPackage package into the current project.

## Contributing
If you'd like to contribute to this tool, feel free to submit a pull request. All contributions are welcome!

## License
This tool is released under the MIT License. See LICENSE for details.

## Acknowledgments
This tool was inspired by the npm Package Manager.
