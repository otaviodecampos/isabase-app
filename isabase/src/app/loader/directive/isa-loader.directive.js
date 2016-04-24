(function () {

    angular.module('isa-loader')
        .directive('isaLoader', Directive);

    function Directive($parse) {
        return {
            restrict: 'A',
            scope: {
                data: "=isaLoader"
            },
            templateUrl: 'isabase-app/isa-loader.tpl.html',
            transclude: true,
            controller: 'IsaLoaderCtrl',
            controllerAs: 'isaLoaderCtrl',
            bindToController: true,
            link: function (scope, element, attrs, ctrl, transcludeFn) {
                var ctrl = scope.isaLoaderCtrl;
                var settings = $parse(attrs.isaLoaderSettings)(scope);

                if(settings) {
                    angular.extend(ctrl.settings, settings);
                }

                transcludeFn(function (clone) {
                    element.append(clone);
                });
            }
        };
    }

})();