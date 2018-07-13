// importing bizzo config object.
const config = require("./bizzo.config.json");
const gulp = require("gulp");
const gulpCopy = require("gulp-copy");
const inject = require("gulp-inject");
const swPreChache = require("sw-precache");
const colors = require('colors');

// handle required config props
if (config) {
  const requiredConfProps = [
    "sourceFolderPath",
    "deploymentFolderPath",
    "extentionsToBeCached",
    "themeColor"
    
  ];
  const bizzoAssistantTitle = '\n### Bizzo Assistant ###\n'.bold.blue;


  requiredConfProps.forEach(prop => {
    if (!config[prop]) {
      let problemMessage = `\n==> Problem : '${prop}' property is required.\n\xa0\xa0\xa0\xa0( couldn't find '${prop}' in 'bizzo.config.json' )\n`.yellow;
      let issueSolution = `\n==> Solution : Add '${prop}' to your 'bizzo.config.json'\n\xa0\xa0\xa0\xa0 your 'bizzo.config.json' should look like this:\n\xa0\xa0{\n\xa0\xa0\xa0...\n\n\xa0\xa0\xa0'${prop}':'SOME_VALUE',\n\xa0\xa0\xa0...\n\xa0\xa0}`.green;
      console.log(bizzoAssistantTitle+problemMessage+issueSolution);
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
    .src("./assets/bizzo-sw-register.js")
    .pipe(gulpCopy(`${config.sourceFolderPath}/`, { prefix: 1 }));
});

gulp.task("inject:tags", () => {
  gulp
    .src(`${config.sourceFolderPath}/index.html`)
    .pipe(
      inject(gulp.src("./assets/_bizzo-tags.html"), {
        name: "bizzo:tags",
        starttag: "<!-- bizzo:tags -->",
        transform: (path, file) => {
          let content = file.contents.toString("utf8");
          content = content.replace("#$theme#", config.themeColor);
          return content;
        }
      })
    )
    .pipe(gulp.dest(`${config.sourceFolderPath}/`));
});

gulp.task("inject:scripts", () => {
  gulp
    .src(`${config.sourceFolderPath}/index.html`)
    .pipe(
      inject(gulp.src("./assets/_bizzo-scripts.html"), {
        name: "bizzo:scripts",
        starttag: "<!-- bizzo:scripts -->",
        transform: (path, file) => {
          let content = file.contents.toString("utf8");
          return content;
        }
      })
    )
    .pipe(gulp.dest(`${config.sourceFolderPath}/`));
});

gulp.task("mx-pwa", [
  "write:sw",
  "write:manifest.json",
  "write:icons",
  "write:bizzo-sw-register",
  "inject:tags",
  "inject:scripts"
]);
