(function() {

    /* global angular */
    angular.module('isa-semantic')
        .directive('uiPopup', Directive);

    function Directive($parse) {
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {
                var settings = $parse(attrs.uiPopup)(scope);
                element.popup(settings);
            }
        };
    }

})();