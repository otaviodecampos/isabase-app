(function () {

    angular.module('common')
        .directive('isaLoaderVisible', Directive);

    function Directive() {
        return {
            restrict: 'A',
            require: '^isaLoader',
            link: function (scope, element, attr, ctrl) {

                var className = 'isa-loader-visible';

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