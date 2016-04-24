(function () {

    angular.module('isa-loader')
        .directive('isaLoaderBind', Directive);

    function Directive($timeout) {
        return {
            restrict: 'A',
            require: '^isaLoader',
            transclude: true,
            link: function (scope, element, attr, ctrl, transcludeFn) {

                var transcluded
                    , loaderText;

                transcludeFn(function (clone) {
                    element.html(clone);
                });

                ctrl.beforeLoad(function (type) {
                    transcluded = false;

                    scope.$watch(attr.isaLoaderBind, function (value) {
                        $timeout(function () {
                            value = value == undefined ? '' : value;
                            if (ctrl.data && ctrl.data.$resolved) {
                                transclude(false);
                            } else {
                                loaderText = value;
                                element.text(value);
                            }
                        }, 100);
                    });

                    ctrl.onLoaded(function () {
                        transclude(true);
                    });

                    function transclude(animate) {
                        if (!transcluded) {
                            transcludeFn(function (clone) {
                                element.html(clone);
                                transcluded = true;
                            });
                        }
                    }
                });
            }
        };
    }

})();