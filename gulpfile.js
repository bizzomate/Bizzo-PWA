

// importing bizzo config object.
const config = require("./bizzo.config.json");
const gulp = require("gulp");
const gulpSync = require("gulp-sync")(gulp);
const gulpCopy = require("gulp-copy");
const swPreChache = require("sw-precache");
const colors = require("colors");
const change = require('gulp-change');
const fs = require("fs");
const assetsDir = "./assets";


// handle required config props
if (config) {
  const requiredConfProps = [
    "appShortName",
    "appName",
    "sourceFolderPath",
    "deploymentFolderPath",
    "extentionsToBeCached",
    "themeColor",
    "backgroundColor",
    "appIcons",
    "offlineEnabled"
  ];
  const bizzoAssistantTitle = "\n### Bizzo Assistant ###\n".bold.blue;

  requiredConfProps.forEach(prop => {
    if (config[prop] === undefined) {
      let problemMessage = `\n==> Problem : '${prop}' property is required.\n\xa0\xa0\xa0\xa0( couldn't find '${prop}' in 'bizzo.config.json' )\n`
        .yellow;
      let issueSolution = `\n==> Solution : Add '${prop}' to your 'bizzo.config.json'\n\xa0\xa0\xa0\xa0 your 'bizzo.config.json' should look like this:\n\xa0\xa0{\n\xa0\xa0\xa0...\n\n\xa0\xa0\xa0'${prop}':'SOME_VALUE',\n\xa0\xa0\xa0...\n\xa0\xa0}`
        .green;
      console.log(bizzoAssistantTitle + problemMessage + issueSolution);
      process.exit(0);
    }
  });
}

gulp.task("write:sw", () => {
  swPreChache.write(`${config.sourceFolderPath}/bizzo-sw.js`, {
    staticFileGlobs: [
      `${
        config.deploymentFolderPath
      }/**/*.{${config.extentionsToBeCached.join()}}`,
      `${config.deploymentFolderPath}/index.html`,
      `${config.deploymentFolderPath}/login.html`
    ],
    stripPrefix: `${config.deploymentFolderPath}`,
    navigateFallback: "/"
  });
});

gulp.task("watch:sw", () => {
  const exts = config.extentionsToBeCached.map(
    ext => `${config.deploymentFolderPath}/**/*.${ext}`
  );
  const watcher = gulp.watch(exts, ["generate-sw"]);
  watcher.on("change", event => {
    console.log(`[Captured ${event.type} in ${event.path}]`);
  });
});

gulp.task("write:manifest.json", () => {
  gulp
    .src("./assets/manifest.json")
    .pipe(change(content=>{
      return setAppManifest(config,content);
    }))
    .pipe(gulp.dest(`${config.sourceFolderPath}/`));
});
gulp.task("write:icons", () => {
  gulp
    .src("./assets/pwa_icons/*.png")
    .pipe(gulpCopy(`${config.sourceFolderPath}/`, { prefix: 1 }));
});

gulp.task("write:bizzo-sw-register", () => {
  gulp
    .src([
      "./assets/bizzo-sw-register.js",
      "./assets/bizzo-connectivity-listener.js"
    ])
    .pipe(gulpCopy(`${config.sourceFolderPath}/`, { prefix: 1 }));
});

gulp.task("inject", () => {
  gulp
    .src(`${config.sourceFolderPath}/index.html`)
    //inject tags
    .pipe(change(content =>{
      return content.replace(/<!-- bizzo-tags -->[\s\S]*<!-- bizzo-tags-end -->/g,getBizzoTagsContent(config.themeColor));
    }))
    //inject scripts
    .pipe(change(content =>{
      return content.replace(/<!-- bizzo-scripts -->[\s\S]*<!-- bizzo-scripts-end -->/g,getBizzoScriptsContent(config.offlineEnabled));
    }))
    .pipe(gulp.dest(`${config.sourceFolderPath}/`));
});


gulp.task("mx-pwa", gulpSync.sync(
  [
    "write:sw",
    "write:manifest.json",
    "write:icons",
    "write:bizzo-sw-register",
    "inject"
  ]
));





//bizzo pwa utils
const getBizzoTagsContent = (themeColor)=>{
  let content = fs.readFileSync(`${assetsDir}/_bizzo-tags`,'utf-8');
  return `<!-- bizzo-tags -->\n${content.replace(/\#theme\#/g,themeColor)}\n<!-- bizzo-tags-end -->`;
};

const getBizzoScriptsContent = (offlineEnabled)=>{
  let content = fs.readFileSync(`${assetsDir}/_bizzo-scripts`,'utf-8');
  if(offlineEnabled){
    content = content.replace(/<!-- bizzo-hook -->[\s\S]*<!-- bizzo-hook-end -->/g,"");
  }
  // remove comments
  content = content.replace(/<!--(.)*-->/g,"").trim();
  return `<!-- bizzo-scripts -->\n${content}\n<!-- bizzo-scripts-end -->`;
}

const setAppManifest = (config,content)=>{
  //1. set app short name
  if(config.appShortName){
    content = content.replace(`#appShortName#`,config.appShortName);
  }
  //1. set app name
  if(config.appName){
    content = content.replace(`#appName#`,config.appName);
  }
  //3. set app icons
  if(typeof config.appIcons.length === "number" ){
    config.appIcons.forEach((icon)=>{
      const iconKey = Object.keys(icon)[0];
      content = content.replace(`#${iconKey}#`,icon[iconKey]);
    });
  }
  //4. set app theme color
  if(config.themeColor){
    content = content.replace(`#themeColor#`,config.themeColor);
  }
  //5. set app background color ( splash screen bg)
  if(config.backgroundColor){
    content = content.replace(`#backgroundColor#`,config.backgroundColor);
  }
  return content;
};

