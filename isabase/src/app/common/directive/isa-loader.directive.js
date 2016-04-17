(function () {

    angular.module('common')
        .directive('isaLoader', Directive);

    function Directive() {
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
            link: function (scope, element, attr, ctrl, transcludeFn) {
                transcludeFn(function (clone) {
                    element.append(clone);
                });
            }
        };
    }

})();