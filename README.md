![Mendix PWA Logo](https://github.com/bizzomate/Bizzo-PWA/blob/master/mendix_pwa.png?raw=true)

# Bizzo Mendix PWAs Generator
Convert Mendix Apps to [Progressive Web Apps PWAs](https://developers.google.com/web/progressive-web-apps/) 

## Getting Started
These instructions will walk with you step by step through the process of creating/converting Mendix Apps to Progressive Web Apps. 

### Prerequisites
This Generator requires [node](https://nodejs.org/en/) & [gulp-cli](https://gulpjs.com/) to be installed on your machine.

1. you can check if you already have node installed by opening your command line tool and typing : 

```sh
$ node --version
>> v8.9.4 // output your installed node version number
```
_If you don't have node on your machine, you can download it from its official website [Nodejs.org](https://nodejs.org/en1/download/)_ 

2. After making sure that you have node installed, let's check if you have **gulp-cli** installed, you can do that by typing in your command line tool: 
```sh
$ gulp -v
>> CLI version 1.3.0 // output your installed node version number

``` 
_If you don't have gulp-cli installed on your machine, you can install it by typing the following command in your command line tool:_ 
```sh
$ npm install gulp-cli -g

```
After having node & gulp-cli installed we are now ready to go! 👍 

### Usage : 
1. [Download Bizzo PWA Package](https://github.com/bizzomate/Bizzo-PWA/raw/master/build/dist/bizzo-pwa.zip)

2. Extract the content of the downloaded `bizzo-pwa.zip` into your Mendix Application root folder.

your root folder now should have a structure like this : 

```
YOUR-MENDIX-APP-NAME
├── deployment
├── javasource
├── pwa_assets
│   ├── pwa_icons
│   ├── _bizzo-scripts
│   └── _bizzo-tags 
│   └── bizzo-connectivity-listener.js 
│   └── bizzo-sw-register.js 
│   └── manifest.json
├── resources
├── theme
│   ├── styles
│   ├── index.html
│   └── ...
├── userlib
├── widgets
├── .classpath
├── .project
├── bizzo.config.json
├── gulpfile.js
├── package.json
├── YOUR_APP_NAME.mpr
└── ...
```
3. Open your command line and run `npm install` _[Make sure that you all the requirements set and installed on your machine](https://github.com/bizzomate/Bizzo-PWA/wiki/Home/_edit#prerequisites)_
4. type ` gulp mx-pwa ` _(make sure that you your deployment directory is not empty)_



