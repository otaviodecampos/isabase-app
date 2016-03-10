(function () {

    angular.module('common')
        .directive('isaLoaderBind', Directive);

    function Directive($timeout) {
        return {
            restrict: 'A',
            require: '^isaLoader',
            transclude: true,
            link: function (scope, element, attr, ctrl, transcludeFn) {
                element.hide();
                scope.$watch(attr.isaLoaderBind, function (value) {
                    value = value == undefined ? '' : value;
                    element.text(value);
                    element.fadeIn('slow');
                });

                ctrl.onLoaded(function () {
                    transcludeFn(function (clone) {
                        element.fadeOut(200, function () {
                            element.html(clone);
                            element.fadeIn(100);
                        });
                    });
                });
            }
        };
    }

})();