module.exports = function (config) {
	config.set({
		basePath: '../',
		frameworks: ['jasmine', '@angular/cli'],
		plugins: [
			require('karma-jasmine'),
			require('karma-chrome-launcher'),
			require('karma-remap-istanbul'),
			require('karma-mocha-reporter'),
			require('@angular/cli/plugins/karma')
		],
		client:{
			clearContext: false // leave Jasmine Spec Runner output visible in browser
		},
		files: [
			{ pattern: '../src/test.ts', watched: false }
		],
		preprocessors: {
			'../src/test.ts': ['@angular/cli']
		},
		exclude: ['../src/libs/**/*.ts', '../src/libs/neon/**/*.ts'],
		mime: {
			'text/x-typescript': ['ts','tsx']
		},
		coverageIstanbulReporter: {
			reports: [ 'html', 'lcovonly' ],
			fixWebpackSourcePaths: true
		},
		angularCli: {
			config: './angular-cli.json',
			environment: 'dev'
		},
		reporters: config.angularCli && config.angularCli.codeCoverage
			? ['mocha', 'karma-remap-istanbul']
			: ['mocha'],
		port: 9876,
		colors: true,
		logLevel: config.LOG_INFO,
		autoWatch: true,
		browsers: ['ChromeNoSandbox'],
		singleRun: false,
		customLaunchers: {
			ChromeNoSandbox: {
				base: 'Chrome',
				flags: ['--test-type']  // '--no-sandbox''
			}
		}
	});
};