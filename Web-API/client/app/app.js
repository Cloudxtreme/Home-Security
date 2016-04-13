'use strict';

angular.module('webApiApp', [
  'webApiApp.constants',
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'btford.socket-io',
  'ui.router',
  'ui.bootstrap'
])
  .config(function($urlRouterProvider, $locationProvider, $stateProvider) {
    $urlRouterProvider
      .otherwise('/notifications');

    $locationProvider.html5Mode(true);

    $stateProvider
      .state('home', {
        url: '/home',
        templateUrl: 'app/home/home.html',
        controller: 'HomeCtrl',
        controllerAs: 'homeCtrl'
      })

      .state('login', {
        url: '/login',
        templateUrl: 'app/login/login.html',
        controller: 'LoginCtrl',
        controllerAs: 'loginCtrl'
      })

      .state('notifications', {
        url: '/notifications',
        templateUrl: 'app/notifications/notifications.html',
        controller: 'NotificationsCtrl',
        controllerAs: 'notificationsCtrl'
      });

  });
