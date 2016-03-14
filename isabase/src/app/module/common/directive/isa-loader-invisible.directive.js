(function () {

    angular.module('common')
        .directive('isaLoaderInvisible', Directive);

    function Directive() {
        return {
            restrict: 'A',
            require: '^isaLoader',
            link: function (scope, element, attr, ctrl) {

                var className = 'isa-loader-invisible';

                ctrl.beforeLoad(function() {
                    element.addClass(className);
                });

                ctrl.afterLoaded(function () {
                    element.removeClass(className);
                });

            }
        };
    }

})();