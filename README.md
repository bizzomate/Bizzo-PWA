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
3. Open your command line and run `npm install` _[Make sure that all the requirements are set and installed on your machine](https://github.com/bizzomate/Bizzo-PWA/wiki/Home/_edit#prerequisites)_

 > IMPORTANT NOTE: after running `npm install` DO NOT forget to add `node_modules` folder to your `svn ignore list`


4. Now, in your `index.html` add the following comments:
* Before the closing tag `<head>...</head>` add : 
```html
    <head>
        ....... meta tags
        ........ link tags
        ......... etc
        .........
        <!-- bizzo-tags -->
        <!-- bizzo-tags-end -->
    </head>
```
the generator will use this comment/hook to inject the required meta tags into your `index.html` file.

* Before the closing tag `<body>...</body>` add : 
```html
    <body>
        ....... html tags
        ........ 
        ......... script tags
        ......... etc
        <!-- bizzo-scripts -->
        <!-- bizzo-scripts-end -->
    </body>
```
the generator will use this comment/hook to inject the required scripts into your `index.html` file.

5. From your Mendix app root folder, open your command line tool and run the following command : 
```sh

npm run bizzo-pwa

```
6. We're done! re-run your Mendix App which became now a progressive web app. 😎🥇 

> ### What does `npm run bizzo-pwa' do ?
> It will read the config file `bizzo.config.json` in your root folder ( read how to set configuration ) and 
> generate/inject/add the required files/tags for your mendix project. 

###  ⚙ Configuration: bizzo.config.json

This file contains the configuration for your Mendix PWA project,and is the only place that you need to work with while you're using this generator. Below we will explore all properties in this file : 

```json
{
    "appShortName":"Bizzo MX-PWA",
    "appName" :"Bizzo MX-PWA Boilerplate",
    "deploymentFolderPath": "./deployment/web",
    "extentionsToBeCached":["html","js","css","svg","png","jpg"],
    "sourceFolderPath":"./theme",
    "themeColor" : "#000000",
    "backgroundColor":"#ffffff",
    "appIcons":[
        {"img_512":"https://raw.githubusercontent.com/bizzomate/Bizzo-PWA/master/static/lab_512.png"},
        {"img_192":"https://raw.githubusercontent.com/bizzomate/Bizzo-PWA/master/static/lab_192.png"},
        {"img_128":"https://raw.githubusercontent.com/bizzomate/Bizzo-PWA/master/static/lab_128.png"}
    ],
    "offlineEnabled" : false
}

```  
> _The contnten above is the default configuration_

* ### appShortName (Type : `String`)
Progressive Web Apps are installable therefore this property will be used to provide a short human-readable name for the application. This is intended for when there is insufficient space to display the full name of the web application, like device (desktop / mobile) homescreens.

* ### appName (Type : `String`)
The name that will be displayed in the app splash screen after installing the app.

* ### deploymentFolderPath (Type : `String`, Default : `./deployment/web`)
The directory from which your web app is being served _**99.99% you won't change this property**_


* ### extentionsToBeCached (Type : `Array Of String`)
Array of file formats that your app contains and you'd like these files to be cached.

* ### sourceFolderPath (Type : `String`, Default : `./theme`)
The directory which contains your source files ( index.html, styles, scripts ...etc ) _**99.99% you won't change this property**_

* ### themeColor (Type : `String`)
A Hex number which represents your app theme color.


* ### backgroundColor (Type : `String`)
A Hex number which represents your app's splash screen background color.

* ### appIcons (Type : `Array of Objects`): 
This piece of configuration requires you to set **3** different sizes for your app's icons **[512x512, 192x192, 128x128]**, by default it has the following value: 
``` json
"appIcons":[
        {"img_512":"https://raw.githubusercontent.com/bizzomate/Bizzo-PWA/master/static/lab_512.png"},
        {"img_192":"https://raw.githubusercontent.com/bizzomate/Bizzo-PWA/master/static/lab_192.png"},
        {"img_128":"https://raw.githubusercontent.com/bizzomate/Bizzo-PWA/master/static/lab_128.png"}
    ]
```
> ### How to edit this property ?
> After running `npm run bizzo-pwa` a folder named `pwa_icons` will be added to your `theme` folder, add your icons to this > folder, let's say that your icons have the following names [my-icon-512.png, my-icon-192.png, my-icon-128.png]; Now, back 
> to your config file you need only to add your icons names as the following : 
>
> ``` json
> "appIcons":[
>         {"img_512":"my-icon-512.png"},
>         {"img_192":"my-icon-192.png"},
>         {"img_128":"my-icon-128.png"}
>     ]
> ```
>
> **IMPORTANT** : Icons Must always be placed in your `pwa_icons` folder.


* ### offlineEnabled (Type : `boolean`, Default `False`)
Mendix has the ability to create offline enabled apps, set this property to true if your app is offline enabled.
