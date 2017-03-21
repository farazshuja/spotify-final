import app from '../../app/app.js';

var mockedResponse = {
  "albums" : {    
    "items" : [ {
      "id" : "4XE9M8giGvwLFebTgpCwSc",
      "images" : [ {
        "height" : 640,
        "url" : "https://i.scdn.co/image/77444e2c007a4d62b1cecfd4f89e545336efcb2e",
        "width" : 640
      }],
      "name" : "Rap God",
      "type" : "album"      
    }],
    "limit" : 1,
    "total" : 4626
  },
  "artists" : {
    "items" : [ {
      "id" : "0Rq2hV3S3O4JMWbL2B510w",
      "images" : [ {
        "height" : 640,
        "url" : "https://i.scdn.co/image/e2850baa1445b078a50479108639305bcb744910",
        "width" : 640
      }],
      "name" : "Epic Rap Battles of History",
      "popularity" : 58,
      "type" : "artist"
    } ],
    "limit" : 1,
    "total" : 695
  }
};

describe('app', () => {

  describe('HomeCtrl', () => {
    let ctrl, SpotifyService, $httpBackend;

    beforeEach(() => {
      angular.mock.module(app);

      angular.mock.inject(($controller, $injector) => {
        SpotifyService = $injector.get('SpotifyService');
        $httpBackend = $injector.get('$httpBackend');
        ctrl = $controller('HomeCtrl', {SpotifyService: SpotifyService});
        
      });
    });

    it('HomeCtrl should have initiated correctly', () => {
      expect(ctrl.noResult).toBe(false);
      expect(ctrl.hasMoreRecords()).toBe(false);
    });

    it('Search and load new should work correctly', () => {
        let url = 'https://api.spotify.com/v1/search?limit=5&offset=0&q=rap&type=artist,album';

        $httpBackend.when('GET', url).respond(mockedResponse);

        ctrl.search = 'rap';
        ctrl.searchIt();
        $httpBackend.flush();

        expect(ctrl.results.items.length).toBe(2);

        //test load next method
        let urlNext = 'https://api.spotify.com/v1/search?limit=5&offset=2&q=rap&type=artist,album';        
        $httpBackend.when('GET', urlNext).respond(mockedResponse);

        ctrl.loadNewResults();
        $httpBackend.flush();

        expect(ctrl.results.items.length).toBe(4);

    });
    
  });
});