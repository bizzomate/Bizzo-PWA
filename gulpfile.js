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
  requiredConfProps.forEach(prop=>{
    if(!config[prop]){
        throw new ReferenceError(
            `'${prop}' property is required`,
            "bizzo.config.json"
          );
    }
  });
}


gulp.task('generate-sw', function() {
    swPrecache.write(`${config.sourceFolderPath}/bizzo-sw.js`, {
      staticFileGlobs: [ `${config.deploymentFolderPath}/**/*.{${config.extentionsToBeCached.join()}}`,`${config.deploymentFolderPath}/index.html`,`${config.deploymentFolderPath}/login.html`],
      stripPrefix: `${config.sourceFolderPath}`,
      navigateFallback: '/index.html'
    });
});
