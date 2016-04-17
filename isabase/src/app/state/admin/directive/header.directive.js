(function() {

    angular.module('isabase-app')
        .directive('header', Directive);

    function Directive() {
        return {
            restrict: 'E',
            templateUrl: 'isabase-app/header.tpl.html',
            controller: 'HeaderCtrl as header',
            replace: true
        }
    }

})();