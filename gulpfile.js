// importing bizzo config object.
const config = require("./bizzo.config.json");
const gulp = require("gulp");
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
    console.log(`[Captured Change in ${event.path} : ${event.type}`);
  });
});

gulp.task("write:index.html",()=>{
    gulp.src("./assets/index.html").pipe(gulp.dest("./theme/",{overwrite:true}));
});