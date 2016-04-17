(function () {

    angular.module('common')
        .directive('decimalStep', Directive);

    function Directive($parse) {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                var settings = $parse(attrs.decimalStep)(scope)
                    , step = "0.01";

                if (settings.scale != undefined) {
                    var scale = "";
                    for (var i = 0; i < settings.scale; i++) {
                        var char = "0";
                        if (i == settings.scale - 1) {
                            char = "1";
                        }
                        scale = scale + char;
                    }
                    step = step.substring(0, step.lastIndexOf(".") + 1) + scale;
                }

                element.removeAttr('decimal-step');
                element.attr('step', step);
            }
        }
    }

})();