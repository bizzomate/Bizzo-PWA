![Mendix PWA Logo](https://github.com/bizzomate/Bizzo-PWA/blob/master/mendix_pwa.png?raw=true)

# Bizzo Mendix PWAs Generator
Convert Mendix Apps to [Progressive Web Apps PWAs](https://developers.google.com/web/progressive-web-apps/) 

## Demo
Check & install [Demo](https://mxpwa.mxapps.io/) app, a simple Todo App 

Or you can also take a quick look [here!](https://github.com/bizzomate/Bizzo-PWA#demo-show-)

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
1. [Download Bizzo PWA Package](https://github.com/bizzomate/Bizzo-PWA/releases/tag/v1.0)

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
>
>
> **What are these sizes ?**
>
> `512x512` icon will be used in your app's splash screen as an icon/ a logo.
>
> `128x128` & `192x192` icons will be used for your app's icon on smart devices home screens.
>


* ### offlineEnabled (Type : `boolean`, Default `False`)
Mendix has the ability to create offline enabled apps, set this property to true if your app is offline enabled.



# Best Practices 👌🐱‍👤:
* During development, it's recommended to create a separate mendix project settings (different port number) for your PWA, as in your PWA, `service worker` will intersect your app's requests and serve cached static contents (scripts, styles, images, icons, etc ...) if exist, although each time you run `npm run bizzo-pwa` the cached content will be updated, it's better to have a separated settings for your PWA in order to prevent any confusion.

You can achieve that in your Mendix Modeler by doing the following : 

 1. Create new project configuration.

![New Mendix Project Configuration](https://github.com/bizzomate/Bizzo-PWA/blob/master/docs/images/set_project_settings.png?raw=true)

 2. And select it while working on your app.

![Select the newly created Mendix Project Configuration](https://github.com/bizzomate/Bizzo-PWA/blob/master/docs/images/new_project_settings.png?raw=true)

 3. Now let's say you wanna continue working on your project, for instance working on theming your project, you can return to use your previous project settings ( port number ) and have to go `index.html` and comment out the following script `bizzo-sw-register.js` : 
```html

<!-- <script src="bizzo-sw-register.js"></script> -->

```

By doing that you'll ensure that there are NO side effects coming from your PWA scripts or settings.


* What browser to use for development? 

**Chrome** 👍


* During development, in your chrome dev tools in Service Workers tab check the option **update on reload**, this option will ensure that your service worker `bizzo-sw.js` is always in sync and up to date with the generated version using this generator.

![Chrome dev tools service workers](https://github.com/bizzomate/Bizzo-PWA/blob/master/docs/images/chrome-sw.PNG?raw=true)



* How to delete an installed PWA ? 

1. On your desktop/laptop you can delete an installed PWA by typing in the address bar of your chrome browser `chrome://apps/` and then hitting `Enter`, a page with all installed apps will open, then right click on your app's icon and `Remove from chrome`. 

![Chrome dev tools service workers](https://github.com/bizzomate/Bizzo-PWA/blob/master/docs/images/delete-pwa.png?raw=true)

2. On your smart device (phone / tablet), you can just uninstall it as it is a native app.

<p align="center">
  <img src="https://github.com/bizzomate/Bizzo-PWA/blob/master/docs/images/uninstall-pwa.png?raw=true" alt="Chrome dev tools service workers" width="400px"/>
</p>



And you can clear your chrome browser cache on your smart device by typing in your address bar `chrome://offline-internals`



# Demo Show 🎦:



### App installed on a desktop
<p align="center">
<img src="https://github.com/bizzomate/Bizzo-PWA/blob/master/docs/images/desktop_open.PNG?raw=true" alt="app installed on desktop"/>
</p>


### Install app on your smart device
<p align="center">
<img src="https://github.com/bizzomate/Bizzo-PWA/blob/master/docs/images/install_app.png?raw=true" alt="install app" width="400px"/>
</p>

<p align="center">
<img src="https://github.com/bizzomate/Bizzo-PWA/blob/master/docs/images/web_apk.png?raw=true" alt="web apk" width="400px"/>
</p>





### Open installed app
<p align="center">
<img src="https://github.com/bizzomate/Bizzo-PWA/blob/master/docs/images/open_installed_app.png?raw=true" alt="open installed app" width="400px"/>
</p>


### Splash screen
<p align="center">
<img src="https://github.com/bizzomate/Bizzo-PWA/blob/master/docs/images/splash_screen.png?raw=true" alt="splash screen" width="400px"/>
</p>


### App opened  (displayed in 'full-screen mode' as a native app)
<p align="center">
<img src="https://github.com/bizzomate/Bizzo-PWA/blob/master/docs/images/landing_page.png?raw=true" alt="App opened" width="400px"/>
</p>


<p align="center">
<img src="https://github.com/bizzomate/Bizzo-PWA/blob/master/docs/images/app_open.png?raw=true" alt="App opened" width="400px"/>
</p>


###

<p align="center">
<img src="https://github.com/bizzomate/Bizzo-PWA/blob/master/docs/images/edit_todo.png?raw=true" alt="App opened" width="400px"/>
</p>




### App icon 

<p align="center">
<img src="https://github.com/bizzomate/Bizzo-PWA/blob/master/docs/images/pwa_icon.png?raw=true" alt="App icon" width="400px"/>
</p>

<p align="center">
<img src="https://github.com/bizzomate/Bizzo-PWA/blob/master/docs/images/android_app_feel.png?raw=true" alt="App icon" width="400px"/>
</p>


## Issues
If encountered any issue while using the generator please report it [here](https://github.com/bizzomate/Bizzo-PWA/issues)

