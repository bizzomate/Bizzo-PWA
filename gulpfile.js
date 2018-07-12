// importing bizzo config object.
const config = require("./bizzo.config.json");
const gulp = require("gulp");
const gulpCopy = require('gulp-copy');
const swPreChache = require("sw-precache");

// handle required config props
if (config) {
  const requiredConfProps = [
    "sourceFolderPath",
    "deploymentFolderPath",
    "extentionsToBeCached"
  ];
  requiredConfProps.forEach(prop => {
    if (!config[prop]) {
      throw new ReferenceError(
        `'${prop}' property is required`,
        "bizzo.config.json"
      );
    }
  });
}

gulp.task("generate-sw", () => {
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

gulp.task("write:index.html",()=>{
    gulp.src("./assets/index.html")
        .pipe(gulpCopy(`${config.sourceFolderPath}/`,{prefix:1}));  
});
gulp.task("write:manifest.json",()=>{
    gulp.src("./assets/manifest.json")
        .pipe(gulpCopy(`${config.sourceFolderPath}/`,{prefix:1}));
});
gulp.task("write:icons",()=>{
    gulp.src("./assets/icons/*.png")
        .pipe(gulpCopy(`${config.sourceFolderPath}/`,{prefix:1}));
});

