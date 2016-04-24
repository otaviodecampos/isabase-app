(function () {

    angular.module('isa-loader')
        .directive('isaLoaderVisible', Directive);

    function Directive($parse, $timeout) {
        return {
            restrict: 'A',
            require: '^isaLoader',
            link: function (scope, element, attr, ctrl) {

                var className = 'isa-loader-visible'
                    , settings = $parse(attr.isaLoaderVisible)(scope) || {};

                ctrl.beforeLoad(function(type) {
                    if(settings[type] == undefined || settings[type]) {
                        element.addClass(className);
                    }
                });

                ctrl.afterLoaded(function (type) {
                    if(settings[type] == undefined || settings[type]) {
                        $timeout(function() {
                            element.removeClass(className);
                        }, 1000);
                    }
                });

            }
        };
    }

})();