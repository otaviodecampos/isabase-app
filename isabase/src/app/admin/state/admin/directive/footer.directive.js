(function() {

    angular.module('isabase-app')
        .directive('footer', Directive);

    function Directive() {
        return {
            restrict: 'E',
            templateUrl: 'isabase-app/footer.tpl.html',
            replace: true
        }
    }

})();