(function () {

    angular.module('common')
        .directive('isaLoaderBind', Directive);

    function Directive($timeout) {
        return {
            restrict: 'A',
            require: '^isaLoader',
            transclude: true,
            link: function (scope, element, attr, ctrl, transcludeFn) {
                
                var transcluded = false
                    , loaderText;

                transcludeFn(function (clone) {
                    element.html(clone);
                });

                ctrl.beforeLoad(function(type) {
                    element.hide();

                    scope.$watch(attr.isaLoaderBind, function (value) {
                        $timeout(function() {
                            value = value == undefined ? '' : value;
                            if(ctrl.data && ctrl.data.$resolved) {
                                transclude(false);
                            } else {
                                loaderText = value;
                                element.text(value);
                                element.fadeIn('fast');
                            }
                        }, 100);
                    });

                    ctrl.onLoaded(function () {
                        transclude(true);
                    });

                    function transclude(animate) {
                        if(!transcluded) {
                            transcludeFn(function (clone) {
                                if(animate) {
                                    element.hide();
                                    element.html(clone);
                                    element.fadeIn();
                                } else {
                                    element.html(clone);
                                }
                                transcluded = true;
                            });
                        }
                    }
                });
            }
        };
    }

})();