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
    "sourceFolderPath",
    "deploymentFolderPath",
    "extentionsToBeCached",
    "themeColor",
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
    .pipe(gulpCopy(`${config.sourceFolderPath}/`, { prefix: 1 }));
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

gulp.task("inject:tags", () => {
  gulp
    .src(`${config.sourceFolderPath}/index.html`)
    .pipe(change(content =>{
      return content.replace(/^<!-- bizzo-tags -->$[\s\S]*^<!-- bizzo-tags-end -->$/m,getBizzoTagsContent(config.themeColor));
    }))
    .pipe(gulp.dest(`${config.sourceFolderPath}/`));
});

gulp.task("inject:scripts", () => {
  gulp
    .src(`${config.sourceFolderPath}/index.html`)
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
    "inject:tags",
    "inject:scripts"
  ]
));



const getBizzoTagsContent = (themeColor)=>{
  let content = fs.readFileSync(`${assetsDir}/_bizzo-tags`,'utf-8');
  return `<!-- bizzo-tags -->\n${content.replace(/\#\$theme\#/,themeColor)}\n<!-- bizzo-tags-end -->`;
};

const getBizzoScriptsContent = (offlineEnabled)=>{
  let content = fs.readFileSync(`${assetsDir}/_bizzo-scripts`,'utf-8');
  if(offlineEnabled){
    content = content.replace(/<!-- bizzo-hook -->[\s\S]*<!-- bizzo-hook-end -->/g,"");
  }
  
  content = content.replace(/<!--(.)*-->/g,"").trim();// remove comments
  return `<!-- bizzo-scripts -->\n${content}\n<!-- bizzo-scripts-end -->`;
}


