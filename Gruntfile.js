//����������� ������� ������ � nodejs
module.exports = function(grunt) {
var mapValues = require('lodash.mapvalues');
//var elixir = require('laravel-elixir');
//var config = elixir.config;
//config.js.babel.options.ignore = 'client/js/lb-services.js';
require('load-grunt-tasks')(grunt);
  // ������������� ������� GruntJS
  grunt.initConfig({
     //���� ��� ����������� less � css
        less: {
            development: {
                options: {
                    //�������, �������������� �� ����
                    compress: false
                },
                files: {
                    //��� �������������� ������� ���� ��� ���������
                    //�������������� ����
                    "src/sass/stylemain.css": "src/less/stylemain.less"
                }
            }
        },
    //���������� JS ������
    concat: {
        main: { src: ['src/js/mysimpleslider.js', 'src/js/slider.js'], dest: 'src/js/scripts.js' }
    },
     imagemin: {
      options: {
        cache: false
      },
      dist: {
        files: [{
          expand: true,
          cwd: 'src/img',
          src: ['**/*.{png,jpg,gif}'],
          dest: 'src/img/'
        }]
      }
    },
    // ������ ������ JS �����
    uglify: {
       options: {
                //����� �� �������������� (false) ��� ������ ������� (true)
                beautify: false
            },
            my_target: {
                files: {
                        //���� �� ������ ����� main.js, � ����� �� ����� ��������� �
                        //������� �� �������.
                        'src/js/scripts.js': [
                        'src/js/sliderjs',
                        'src/js/mysimpleslider.js'
                    ]
                }
            }
    },

    // SASS
    sass: {
      dist: {
        files: [{
		   expand: true,
		   cwd: 'src/css',
		   src: ['*.scss'],
		   dest: 'src/sass',
		   ext: 'main.css'
        }]
      }
    },
	'jsmin-sourcemap': {
      all: {
        src: ['src/js/scripts.js'],
        dest: 'src/js/scripts.jsmin-grunt.js',
        destMap: 'src/js/scripts.jsmin-grunt.js.map'
      }
    },
    // CSS Min
    cssmin: {
         minify: {
    files: [{
      expand: true,
      cwd: 'src/css/',
      src: ['*.css', '!*.min.css'],
      dest: 'src/sass/',
      ext: '.css'
    }, {
      expand: true,
      cwd: 'src/css/',
      src: ['*.min.css'],
      dest: 'src/sass/',
      ext: '.min.css'
    }]
  }
        },
		
     //���� ���� �� ����� postcss, �� ������ �� ����� ����� ����� ������ �������� � css
        //autoprefixer ������� ��� ���, ���� ����� � caniuse.com
        autoprefixer: {
                //�������� ���� � ������� ����� ���������� ��������, �� ��� ��� �����������
                no_dest: {
                    src: "src/sass/stylemain.css"
                }
            },
    watch: {
        options: {
    livereload: true
  },
   gruntfile: {
    files: ['Gruntfile.js'],
    tasks: ['src:dev']
  },
      scripts: {
            files: ['js/*.js'],
            tasks: ['concat', 'uglify'],
            options: {
                spawn: false
            }
        },
     css:{
	         files: ['src/css/*.scss'],
			 tasks: ['sass'],
			 options: {
            spawn: false,
        },
	   },
	   //��� ����� �� ����� ����� ������ �������
            less: {
                //��� ��������� �� ������ ������� ������� **/**/*.less - ��������
                //������� �� ����� .less �������, ������� ��������� �� 2� �������
                //����������� �� ����� less/
                files: ['src/sass/*.less'],
                //����� ����� ���� ��������� ��� ��������� ������ .less
                tasks: ['less', 'autoprefixer']
            },
			babel:{
			    files: 'src/js/*.js',
				tasks: ['babel']
			}
    },
	connect: {
      server: {
        options: {
          port: 3000,
                    livereload: 35729,
                    hostname: 'localhost',
                    base: ['src']
        },
                livereload: {
                    options: {
                        open:true,
                        base: ['src']
                    }
                }
      }
    },
	
	babel: {
        options: {
            "sourceMap": true,
			presets: ['babel-preset-es2015']
        },
        dist: {
            files: [{
                "expand": true,
                "cwd": "src/js",
                "src": ["**/*.js"],
                "dest": "src/dist/",
                "ext": "-compiled.js"
            }]
        }
    },
	cssnano:{
	     options: {
		      sourcemap: true
		 },
		 dist: {
		       files: {
			        'src/dist/app.css' : 'src/sass/app.css'
			   }
		 }
	},
	 postcss: {
      options: {
        map: {
		   inlone: false,
		   annotation: 'src/dist/css/maps/'
		},
		processors: [
		    // require['pixrem'](),
		     require('autoprefixer')({browsers: 'last 2 versions'}),
			 require('cssnano')()
		]
      },
      dist: {
        src: ['src/sass/*.css'],
        dest: 'src/dist/grunt.css'
      }
    },
	postcss: {
      	options: {
      		processors: [
      			require('precss'),
      			require('autoprefixer')({ 
      				browsers: ['Android >=2.1',
    		                   'Chrome >=21',
    		                   'Firefox >=16',
    		                   'Explorer >=8',
    		                   'Edge >=12',
    		                   'iOS >=3.2',
    		                   'Opera >=21',
    		                   'Safari >=4',
    		                   'OperaMobile >=12',
    		                   'OperaMini >=5.0',
    		                   'ChromeAndroid >=46',
    		                   'FirefoxAndroid >=42',
    		                   'ExplorerMobile >=10'] 
              }),
      			require('postcss-flexbugs-fixes'),
      			require('pixrem')(),
                        require('postcss-cssnext'),
                        require('cssnano'),
                        require('postcss-font-magician'),
                        require('postcss-normalize')
          	]
        }


  });

  // �������� �������, ������� �������������� �����������
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
   grunt.loadNpmTasks('grunt-jsmin-sourcemap');
   grunt.loadNpmTasks('grunt-contrib-connect');
   //��������� �������� ������� ����������� ��� ������
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-connect');
  grunt.loadNpmTasks('grunt-lodash');
  grunt.loadNpmTasks('grunt-jasmine-nodejs');
  grunt.loadNpmTasks('grunt-babel');
    grunt.loadNpmTasks('grunt-postcss');
  // ��� ������� ����� ���������� ����� �� ����� �� � ������� ����������� grunt, � ������� Enter
  grunt.registerTask('default', ['concat', 'jsmin-sourcemap', 'uglify', 'sass','cssmin','autoprefixer','less','babel']);
 grunt.registerTask('dev',['connect','concat','sass','uglify','imagemin','watch','postcss', 'cssnano']);
  
  };