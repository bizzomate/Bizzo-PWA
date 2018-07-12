// importing bizzo config object.
const config = require("./bizzo.config.json");
const gulp = require("gulp");
const gulpCopy = require("gulp-copy");
const inject = require("gulp-inject");
const swPreChache = require("sw-precache");

// handle required config props
if (config) {
  const requiredConfProps = [
    "sourceFolderPath",
    "deploymentFolderPath",
    "extentionsToBeCached",
    "themeColor"
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
