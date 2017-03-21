import app from './app';

describe('app', () => {

  describe('AppCtrl', () => {
    let ctrl, SpotifyService;

    beforeEach(() => {
      angular.mock.module(app);

      angular.mock.inject(($controller, $injector) => {
        SpotifyService = $injector.get('SpotifyService');
        ctrl = $controller('AppCtrl', {SpotifyService: SpotifyService});
      });
    });

    it('App should have SpotifyService service initiated correctly', () => {
      expect(ctrl.status.inProgress).toBe(false);
    });
  });
});