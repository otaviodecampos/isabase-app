(function () {

    /* global angular */
    angular.module('angular-semantic-ui')
        .directive('uiDropdown', Directive);

    function Directive($parse, $timeout) {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                var settings = $parse(attrs.uiAccordion)(scope);

                $timeout(function () {
                    element.dropdown(settings);
                });
            }
        };
    }

})();