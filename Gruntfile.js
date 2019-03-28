// Voir README.md
'use strict';
module.exports = function (grunt) {
  const sass = require('node-sass');
  require('load-grunt-tasks')(grunt); // Utilise le module load-grunt-tasks pour charger automatiquement les tâches à partir du fichier package.json
  grunt.initConfig({
    standard: { // Javascript (https://standardjs.com/)
        src: ['js/**/*.js'] // On scan tout le dossier script et ses sous dossiers. Les configurations sont intégrés dans le module. Utiliser le CLI pour réparer les erreurs automatiquements.
    },
    stylelint: { // CSS et SASS (https://stylelint.io/)
      all: ['css/sass/**/*.scss'] // On scan tout le dossier sass et ses sous dossiers. Les configurations viennent des modules stylelint-config-standard et stylelint-order. Utiliser le CLI pour réparer les erreurs automatiquements.
    },
    sass: {
      options: {
          outputStyle: 'compressed',
          implementation: sass,
          sourceMap: true
      },
      dist: {
          files: {
            'css/normes-ul.css': 'css/sass/assemblage.scss'
          },
      },
    },
    watch: {
      configFiles: {
        files: [ 'Gruntfile.js'],
        options: {
          reload: true
        }
      },
      sass: {
        files: ['css/sass/**/*.scss'],
        tasks: ['sass'],
      },
    },
  })
  grunt.registerTask('build', [ // Construit un environnement de test local
    'ci',
    'sass',
  ]);
  grunt.registerTask('serve', [ // Démarre les services nécessaires au développement
    'build',
    'watch',
  ]);
  grunt.registerTask('ci', [ // Validation du code
    'standard',
    'stylelint',
  ]);
  grunt.registerTask('default', [ // Exécuté avec la commande "grunt" seule
    'build'
  ]);
};
