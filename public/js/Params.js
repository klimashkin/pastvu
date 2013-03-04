/*global requirejs:true, require:true, define:true*/
/**
 * Params
 */
define(['jquery', 'underscore', 'knockout', 'knockout.mapping', 'socket', 'Utils'], function ($, _, ko, ko_mapping, socket, Utils) {
	'use strict';

	var $window = $(window),
		Params = ko_mapping.fromJS(
			{
				window: {
					w: $window.width(),
					h: $window.height(),
					square: $window.width() * $window.height()
				},
				settings: {
					domain: 'localhost',
					port: 3000,
					uport: 8888,

					appVersion: 0,
					appHash: 0,

					USE_OSM_API: true,
					USE_GOOGLE_API: true,
					USE_YANDEX_API: true,

					FIRST_CLIENT_WORK_ZOOM: 17,
					CLUSTERING_ON_CLIENT: true,
					CLUSTERING_ON_CLIENT_PIX_DELTA: {17: 25, 18: 15, 19: 10, 20: 5, 'default': 15},


					locDef: {lat: 40, lng: -17, z: 3},
					locDefRange: ['gpsip', '_def_'],
					locDefRangeUser: ['last', 'home', 'gpsip', '_def_'],

					REGISTRATION_ALLOWED: false,
					LoggedIn: false
				},
				photoDirsArr: ['w', 'nw', 'n', 'ne', 'e', 'se', 's', 'sw', 'aero'],
				photoDirsTxt: {
					n: 'North',
					ne: 'Northeast',
					e: 'East',
					se: 'Southeast',
					s: 'South',
					sw: 'Southwest',
					w: 'West',
					nw: 'Northwest',
					aero: 'Aerial photo'
				}
			}
		);

	$window.on('resize', _.debounce(function () {
		Params.window.w($window.width());
		Params.window.h($window.height());
		Params.window.square(Params.window.w() * Params.window.h());
	}, 50, false));

	return Params;
});