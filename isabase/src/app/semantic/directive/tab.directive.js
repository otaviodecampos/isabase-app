(function() {

    /* global angular */
    angular.module('angular-semantic-ui')
        .directive('uiTab', Directive);

    function Directive($parse) {
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {
                var settings = $parse(attrs.uiTab)(scope);
                element.find('.item').tab(settings);
            }
        };
    }

})();