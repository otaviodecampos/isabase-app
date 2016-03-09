(function () {

    angular.module('common')
        .directive('isaMessages', Directive);

    function Directive() {
        return {
            restrict: 'E',
            scope: {
                form: "=",
                fields: "="
            },
            templateUrl: 'isabase-app/isa-messages.tpl.html',
            transclude: true,
            replace: true
        };
    }

})();