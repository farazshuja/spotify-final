import angular from 'angular';
import ngRoute from 'angular-route';
import HomeCtrl from '../components/home/home.js';
import ArtistCtrl from '../components/artist/artist.js';
import SpotifyService from '../components/common/SpotifyService.js';
import AlbumDirective from '../components/common/album/album.directive.js';

import '../style/app.css';

/* Simple directives and controllers to hookup the main application, so no need of moving to separate files */
let app = () => {
  return {
    template: require('./app.html'),
    controller: 'AppCtrl',
    controllerAs: 'app'
  }
};

class AppCtrl {
  constructor(SpotifyService) {     
    this.status = SpotifyService.status;
  }  
}

const MODULE_NAME = 'app';

/* Initializaing all the modeuls required for the app */
angular.module(MODULE_NAME, ['ngRoute'])
  .directive('app', app)
  .directive('album', AlbumDirective)
  .service('SpotifyService', SpotifyService)  
  .controller('AppCtrl', AppCtrl)
  .controller('HomeCtrl', HomeCtrl)
  .controller('ArtistCtrl', ArtistCtrl) 
  /* Simple Routing, so better to put it here, isntead of separate module */
  .config(function($routeProvider) {
    $routeProvider
      .when('/', {template: require('../components/home/home.view.html'), controller: 'HomeCtrl', controllerAs: 'home'})
      .when('/artist/:id', {
        template: require('../components/artist/artist.view.html'), 
        controller: 'ArtistCtrl', 
        controllerAs: 'artist',
        resolve: {
          Albums: function($route, SpotifyService) {   
            return SpotifyService.searchArtist($route.current.params.id);
          }
        }
      })            
      .otherwise('/');
  });

export default MODULE_NAME;