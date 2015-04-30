'use strict';

var app = angular.module(
  'BBC-Calendar', [
    'ngResource',    
    'ngRoute',    
    'firebase'
  ])
  .constant('FURL', 'https://bbc-calendar.firebaseio.com/')
  .config(function($routeProvider){
    $routeProvider
      .when('/', {
        templateUrl: '/views/browse.html',
        controller: 'OutreachController'
      })
      .when('/login', {
        templateUrl: '/views/login.html',
        controller: 'AuthController'
      })
      .when('/register', {
        templateUrl: '/views/register.html',
        controller: 'AuthController'
      })
      .when('/create', {
        templateUrl: '/views/create.html',
        controller: 'DisplayController'
      })
      .when('/outreach/:oid', {
        templateUrl: '/views/outreach.html',
        controller: 'DisplayController'
      })
      .when('/admin', {
        templateUrl: '/views/admin.html',
        controller: 'AdminController'
      })
      .when('/settings', {
        templateUrl: '/views/settings.html',
        controller: 'SettingsController'
      })
      .otherwise({
        redirectTo: '/'
      });
  });