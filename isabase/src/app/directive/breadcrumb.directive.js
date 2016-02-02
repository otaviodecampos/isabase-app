(function() {

    angular.module('isabase-app')
        .directive('breadcrumb', Directive);

    function Directive() {
        return {
            restrict: 'E',
            templateUrl: 'isabase-app/breadcrumb.tpl.html',
            replace: true
        }
    }

})();