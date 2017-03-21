export default () => {
    return {
        restrict: 'E',
        template: require('./album.directive.html'),
        replace: true,
        compile: function compile(tElement, tAttrs, transclude) {
            return {
                pre: function preLink(scope, iElement, iAttrs, controller) {                         
                    if(!scope.item.img || scope.item.img.length == 0) {
                        scope.item.img = {url: 'img/sample.jpg'};
                    }
                }                
            }            
        },
        scope: {
            item: '=',
            index: '@'
        }
    }
}