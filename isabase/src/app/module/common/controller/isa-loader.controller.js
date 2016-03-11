(function () {

    angular.module('common')
        .controller('IsaLoaderCtrl', Controller);

    /* @ngInject */
    function Controller($scope, $element) {

        var that = this
            , onLoadedFn = []
            , afterLoadedFn = [];

        this.onLoaded = function (fn) {
            onLoadedFn.push(fn);
        }

        $scope.$watch('isaLoaderCtrl.data', function (data) {
            if (data) {
                angular.forEach(onLoadedFn, function (fn) {
                    that.data.$promise.then(fn)
                });
            }
        });

        this.onLoaded(function () {

            angular.forEach(afterLoadedFn, function (fn) {
                fn();
            });

            $element.children('.isa-loader')
                .fadeOut(function () {
                    $(this).remove();
                });
        });

        this.afterLoaded = function (fn) {
            afterLoadedFn.push(fn);
        }

    }

})();