(function() {

    angular.module('isabase-app')
        .directive('topmenu', Directive);

    function Directive() {
        return {
            restrict: 'E',
            templateUrl: 'isabase-app/topmenu.tpl.html',
            replace: true
        }
    }

})();