(function () {

    angular.module('common')
        .controller('IsaLoaderCtrl', Controller);

    /* @ngInject */
    function Controller($element) {

        var afterFn = [];

        this.onLoaded = function (fn) {
            this.data.$promise.then(fn);
        }

        this.onLoaded(function () {

            angular.forEach(afterFn, function (fn) {
                fn();
            });

            $element.children('.isa-loader')
                .fadeOut(function () {
                    $(this).remove();
                });
        });

        this.afterLoaded = function (fn) {
            afterFn.push(fn);
        }

    }

})();