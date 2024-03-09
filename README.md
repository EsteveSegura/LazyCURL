# LazyCURL

**LazyCURL** provides a convenient approach for constructing HTTP queries, leveraging the powerful cURL library underneath.

![NodeJS](https://img.shields.io/badge/NodeJS-20.0.0-green)
![License](https://img.shields.io/badge/License-MIT-blue)
![Version](https://img.shields.io/badge/Version-0.0.1-blue)

![Showing the demo](./assets/demo.gif)

## Installation

To set up LazyCURL for development, follow these steps:

```bash
git clone https://github.com/EsteveSegura/LazyCURL.git
cd LazyCURL 
npm install
```

## Usage (CLI)

Once LazyCURL is installed for development, install it globally on your system using:

```bash
npm install -g .
```

After installation, you can access the command line tool using:

```bash
lazycurl
```

LazyCURL streamlines the process of crafting HTTP requests, providing a seamless experience for developers.

## Features

LazyCURL enhances the power of cURL by offering a suite of features designed to simplify and streamline the process of crafting HTTP requests. Each feature is aimed at providing specific functionality to cater to the diverse needs of web development and testing. Below is a list of features currently supported by LazyCURL, along with their descriptions:

- The emoji ✅ indicates that the feature is fully implemented and available for use.
- The emoji ❌ signifies that the feature is not yet implemented or is currently in development.

Explore the range of capabilities LazyCURL brings to your command line:

- ✅ **Method** (`-X [Method]`): Choose your HTTP method like GET or POST. It's how you tell the server what you want to do.
- ✅ **Header** (`-H [name:value]`): Add extra information to your request with custom headers, like content type or login tokens.
- ✅ **Data** (`--data [data]`): Send data to the server, like form inputs for POST requests.
- ✅ **Include**  (`-i`): Show server response headers in your output, useful for seeing what the server is sending back.
- ✅ **Output** (`--output [file]`): Save the server's response to a file, great for downloading files or saving API responses.
- ✅ **UserAgent** (`--user-agent`): Change your user agent to test how responses vary for different browsers or devices.
- ✅ **Location** (`--location`): Automatically follow redirects, so if the server points you to a new URL, LazyCURL will follow.
- ❌ **Insecure** (`--insecure`): Skip SSL certificate verification, handy for development with self-signed certificates.
- ❌ **Verbose** (`--verbose`): Get detailed info about your request and response, great for debugging.
- ❌ **User** (`--user [user:password]`): Pass login information for sites that require a username and password.
- ❌ **Cookie** (`--cookie [name=value]`): Include cookies with your request, important for sites that track sessions with cookies.
- ❌ **Proxy** (`--proxy [protocol://user:password]@ProxyHost:[port]`): Connect through a proxy server, useful for testing or privacy.
