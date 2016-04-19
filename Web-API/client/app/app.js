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
      .otherwise('/login');

    $locationProvider.html5Mode(true);

    $stateProvider
      .state('login', {
        url: '/login',
        templateUrl: 'app/login/login.html',
        controller: 'LoginCtrl',
        controllerAs: 'loginCtrl'
      })

      .state('dashboard', {
        url: '/dashboard',
        templateUrl: 'app/dashboard/dashboard.html',
        controller: 'DashboardCtrl',
        controllerAs: 'dashboardCtrl'
      })
      // .state('dashboard.notifications', {
      //   url: '/notifications',
      //   templateUrl: 'app/dashboard/notifications/notifications.html',
      //   controller: 'NotificationsCtrl',
      //   controllerAs: 'notificationsCtrl'
      // });

      .state('dashboard.summary', {
        url: '/summary',
        templateUrl: 'app/dashboard/summary/summary.html',
        controller: 'SummaryCtrl',
        controllerAs: 'summaryCtrl'
      })
      // .state('dashboard.hardware', {
      //   url: '/hardware',
      //   templateUrl: 'app/dashboard/hardware/hardware.html',
      //   controller: 'HardwareCtrl',
      //   controllerAs: 'hardwareCtrl'
      // })
      .state('dashboard.user', {
        url: '/user',
        templateUrl: 'app/dashboard/user/user.html',
        controller: 'UserCtrl',
        controllerAs: 'userCtrl'
      });

  });
