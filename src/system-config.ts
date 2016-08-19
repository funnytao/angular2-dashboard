// SystemJS configuration file, see links for more information
// https://github.com/systemjs/systemjs
// https://github.com/systemjs/systemjs/blob/master/docs/config-api.md

/***********************************************************************************************
 * User Configuration.
 **********************************************************************************************/
/** Map relative paths to URLs. */
const map: any = {
  'firebase': 'vendor/firebase/firebase.js',
  'angularfire2': 'vendor/angularfire2',
  'ng2-charts': 'vendor/ng2-charts',
  'ng2-bs3-modal': 'vendor/ng2-bs3-modal',
  // 'bootstrap-min-js': 'vendor/js/bootstrap.min.js',
  // 'bootstrap-datetimepicker-js': 'vendor/js/bootstrap-datetimepicker.js',
  // 'chart-bundle-min-js': 'vendor/js/Chart.bundle.min.js',
  // 'flipclock-min-js': 'vendor/js/flipclock.min.js',
  // 'jquery-js': 'vendor/js/jquery.js',
  // 'jquery-jvectormap-min-js': 'vendor/js/jquery-jvectormap-2.0.3.min.js',
  // 'jquery-jvectormap-world-js': 'vendor/js/jquery-jvectormap-world-mill.js',
  // 'ng2-bs3-modal-js': 'vendor/js/ng2-bs3-modal.min.js',
};

/** User packages configuration. */
const packages: any = {
  angularfire2: {
    defaultExtension: 'js',
    main: 'angularfire2.js'
  },
  'ng2-charts': {
    main: 'bundles/ng2-charts.min.js'
  },
  'ng2-bs3-modal': {
    main: 'ng2-bs3-modal.js'
  },
  // 'ng2-file-upload':{
  //     format: 'cjs',
  //     defaultExtension:'js',
  //     main: 'ng2-file-upload.js'
  // }
  // 'bootstrap-min-js': {
  //   format: 'global'
  // },
  // 'bootstrap-datetimepicker-js': {
  //   format: 'global'
  // },
  // 'chart-bundle-min-js': {
  //   format: 'global'
  // },
  // 'flipclock-min-js': {
  //   format: 'global'
  // },
  // 'jquery-js': {
  //   format: 'global'
  // },
  // 'jquery-jvectormap-min-js': {
  //   format: 'global'
  // },
  // 'jquery-jvectormap-world-js': {
  //   format: 'global'
  // },
  // 'ng2-bs3-modal-js': {
  //   format: 'global'
  // },
};

////////////////////////////////////////////////////////////////////////////////////////////////
/***********************************************************************************************
 * Everything underneath this line is managed by the CLI.
 **********************************************************************************************/
const barrels: string[] = [
  // Angular specific barrels.
  '@angular/core',
  '@angular/common',
  '@angular/compiler',
  '@angular/http',
  '@angular/router',
  '@angular/platform-browser',
  '@angular/platform-browser-dynamic',

  // Thirdparty barrels.
  'rxjs',

  // App specific barrels.
  'app',
  'app/shared',
  'app/upload',
  'app/chat',
  /** @cli-barrel */
];

const cliSystemConfigPackages: any = {};
barrels.forEach((barrelName: string) => {
  cliSystemConfigPackages[barrelName] = { main: 'index' };
});

/** Type declaration for ambient System. */
declare var System: any;

// Apply the CLI SystemJS configuration.
System.config({
  map: {
    '@angular': 'vendor/@angular',
    'rxjs': 'vendor/rxjs',
    'main': 'main.js'
  },
  packages: cliSystemConfigPackages
});

// Apply the user's configuration.
System.config({ map, packages });
