(function() {

    angular.module('isabase-app')
        .directive('container', Directive);

    function Directive() {
        return {
            restrict: 'E',
            templateUrl: 'isabase-app/container.tpl.html',
            replace: true
        }
    }

})();