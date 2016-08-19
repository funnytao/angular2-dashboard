// Angular-CLI build configuration
// This file lists all the node_modules files that will be used in a build
// Also see https://github.com/angular/angular-cli/wiki/3rd-party-libs

/* global require, module */

var Angular2App = require('angular-cli/lib/broccoli/angular2-app');

var Funnel = require('angular-cli/node_modules/broccoli-funnel');
var mergeTrees = require('angular-cli/node_modules/broccoli-merge-trees');

module.exports = function (defaults) {
  var lazyVendorFiles =  [
    // 'select2/dist/js/select2.min.js',
    // 'summernote/dist/summernote.min.js',
    // 'chart.js/dist/Chart.min.js',
    // 'dropzone/dist/dropzone-amd-module.js',
    'js/bootstrap.min.js',
    'js/bootstrap-datetimepicker.js',
    'js/Chart.bundle.min.js',
    'js/flipclock.min.js',
    'js/jquery.js',
    'js/jquery-jvectormap-2.0.3.min.js',
    'js/jquery-jvectormap-world-mill.js',
    'js/ng2-bs3-modal.min.js',
    'js/jquery.ezdz.min.js',
  ];

  var appTree = new Angular2App(defaults, {
    vendorNpmFiles: [
      'systemjs/dist/system-polyfills.js',
      'systemjs/dist/system.src.js',
      'zone.js/dist/**/*.+(js|js.map)',
      'es6-shim/es6-shim.js',
      'reflect-metadata/**/*.+(ts|js|js.map)',
      'rxjs/**/*.+(js|js.map)',
      '@angular/**/*.+(js|js.map)',
      'angularfire2/**/*.js',
      'firebase/*.js',
      'chart.js/dist/Chart.min.js',
      'ng2-charts/**/*.js',
      'ng2-bs3-modal/**/*.js',
      'ng2-file-upload/**/*.js',
      'js/bootstrap.min.js',
      'js/bootstrap-datetimepicker.js',
      'js/Chart.bundle.min.js',
      'js/flipclock.min.js',
      'js/jquery.js',
      'js/jquery-jvectormap-2.0.3.min.js',
      'js/jquery-jvectormap-world-mill.js',
      'js/ng2-bs3-modal.min.js',
      'js/jquery.ezdz.min.js',
    ].concat(lazyVendorFiles.slice())
  });

  var lazyVendorFilesTree = new Funnel('node_modules', {
    include: lazyVendorFiles.slice(),
    destDir: 'vendor'
  });

  return mergeTrees([lazyVendorFilesTree, appTree], { overwrite: true });
};

// module.exports = function(defaults) {
//   return new Angular2App(defaults, {
//     vendorNpmFiles: [
//       'systemjs/dist/system-polyfills.js',
//       'systemjs/dist/system.src.js',
//       'zone.js/dist/**/*.+(js|js.map)',
//       'es6-shim/es6-shim.js',
//       'reflect-metadata/**/*.+(ts|js|js.map)',
//       'rxjs/**/*.+(js|js.map)',
//       '@angular/**/*.+(js|js.map)',
//       'angularfire2/**/*.js',
//       'firebase/*.js',
//       'chart.js/dist/Chart.min.js',
//       'ng2-charts/**/*.js',
//       'ng2-bs3-modal/**/*.js',
//       'js/**/*.js'
//     ]
//   });
// };
