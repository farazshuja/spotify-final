import app from '../../../app/app.js';

describe('app', () => {

  describe('AppCtrl', () => {
    let ctrl, $rootScope, $compile, scope, directiveElem;

    beforeEach(() => {
      angular.mock.module(app);

      angular.mock.inject(($controller, $injector) => {
        $rootScope = $injector.get('$rootScope');
        $compile = $injector.get('$compile');

        scope=$rootScope.$new();
        scope.item = {
            id: 'xyz',
            name: 'Test Album',
            type: 'album'
        }

        //ctrl = $controller('AppCtrl', {SpotifyService: SpotifyService});
        directiveElem = getCompiledElement();
      });
    });

    function getCompiledElement(){
        var compiledDirective = $compile(angular.element('<album item="item"></album>'))(scope);
        scope.$digest();
        return compiledDirective;
    }

    it('Album directive hooking up correctly', function(){
        var isolatedScope = directiveElem.isolateScope();

        expect(isolatedScope.item.id).toEqual('xyz');

        isolatedScope.item.name = "new album";
        expect(scope.item.name).toEqual('new album');
        
    });
  });
});