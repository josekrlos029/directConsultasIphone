// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
var app;
(function(){
  app = angular.module('starter', ['ionic', 'starter.controllers', 'starter.services','ngCordova'])

  .run(function($ionicPlatform,$cordovaStatusbar) {
    $ionicPlatform.ready(function() {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);

      }
      
    });
  })

  .config(function($stateProvider, $urlRouterProvider) {

    // Ionic uses AngularUI Router which uses the concept of states
    // Learn more here: https://github.com/angular-ui/ui-router
    // Set up the various states which the app can be in.
    // Each state's controller can be found in controllers.js
    $stateProvider

    // setup an abstract state for the tabs directive
    .state('tab', {
      url: '/tab',
      abstract: true,
      templateUrl: 'templates/tabs.html'
    })

    // Each tab has its own nav history stack:

    .state('tab.dash', {
      url: '/dash',
      views: {
        'tab-dash': {
          templateUrl: 'templates/tab-dash.html',
          controller: 'DashCtrl'
        }
      }
    })

    .state('tab.chats', {
        url: '/chats',
        views: {
          'tab-chats': {
            templateUrl: 'templates/tab-chats.html',
            controller: 'ChatsCtrl'
          }
        }
      })
      .state('tab.chat-detail', {
        url: '/chats/:chatId',
        views: {
          'tab-chats': {
            templateUrl: 'templates/chat-detail.html',
            controller: 'ChatDetailCtrl'
          }
        }
      })

    .state('tab.home', {
        url: '/home',
        views: {
          'tab-home': {
            templateUrl: 'templates/home.html',
            controller: 'homeController'
          }
        }
      })
      
    .state('tab.pautas', {
        url: '/pautas/:idSubcategoria/:nombre',
        views: {
          'tab-home': {
            templateUrl: 'templates/pautas.html',
            controller: 'pautasController'
          }
        }
      })
      
    .state('tab.account', {
      url: '/account',
      views: {
        'tab-account': {
          templateUrl: 'templates/tab-account.html',
          controller: 'AccountCtrl'
        }
      }
    });

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/tab/home');

  });
})();

var session = {
    
    setCiudad: function(ciudad){
      
        localStorage.setItem("ciudad",ciudad);
       
    },

    getCiudad: function(){
      
        return this.validarObjectLocal("ciudad")? localStorage.getItem("ciudad") :  null;
       
    },

    setUsuario: function(user){
      
        localStorage.setItem("usuario",JSON.stringify(user));
       
    },
    
    getUsuario: function(){
      
        return this.validarObjectLocal("usuario")? JSON.parse(localStorage.getItem("usuario")) :  null;
       
    },
    
    validarObjectLocal: function(string){
        
        return localStorage.getItem(string) !== "" && localStorage.getItem(string) !== undefined && localStorage.getItem(string) !== null;
        
    },
    
    cerrarSesion: function(){
        localStorage.setItem("usuario","");
        location.href = "index.html";
    }

};
