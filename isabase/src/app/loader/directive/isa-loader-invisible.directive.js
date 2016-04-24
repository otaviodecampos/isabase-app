(function () {

    angular.module('isa-loader')
        .directive('isaLoaderInvisible', Directive);

    function Directive($parse, $timeout) {
        return {
            restrict: 'A',
            require: '^isaLoader',
            link: function (scope, element, attr, ctrl) {
                var className = 'isa-loader-invisible'
                    , settings = $parse(attr.isaLoaderInvisible)(scope) || {};

                ctrl.beforeLoad(function(type) {
                    if(settings[type] == undefined || settings[type]) {
                        element.addClass(className);
                    }
                });

                ctrl.afterLoaded(function (type) {
                    if(settings[type] == undefined || settings[type]) {
                        element.removeClass(className);
                    }
                });

            }
        };
    }

})();