(function() {
    
    /* global angular */
    angular.module('isa-semantic')
        .directive('uiAccordion', Directive);

    function Directive($parse) {
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {
                var settings = $parse(attrs.uiAccordion)(scope);
                element.accordion(settings);
            }
        };
    }

})();