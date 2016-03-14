(function () {

    angular.module('common')
        .controller('IsaLoaderCtrl', Controller);

    /* @ngInject */
    function Controller($scope, $element, resourceUtil) {

        var that = this
            , onLoadedFn = []
            , beforeLoadFn = []
            , afterLoadedFn = []
            , loader = $element.children('.isa-loader');

        var callBeforeLoad = function() {
            angular.forEach(beforeLoadFn, function (fn) {
                fn.call(that.data);
            });
        }

        var callAfterLoaded = function() {
            angular.forEach(afterLoadedFn, function (fn) {
                fn();
            });
        };

        var bindRemove = function(data) {
            var $remove = data.$remove;
            data.$remove = function() {
                $element.addClass('isa-remove');
                loader.fadeIn();
                callBeforeLoad();
                $remove.apply(this, arguments).then(function () {
                    loader.fadeOut();
                    callAfterLoaded();
                });
            }
        }

        this.onLoaded = function (fn) {
            onLoadedFn.push(fn);
        }

        this.afterLoaded = function (fn) {
            afterLoadedFn.push(fn);
        }

        this.beforeLoad = function(fn) {
            beforeLoadFn.push(fn);
        }

        this.onLoaded(function () {
            var $save = that.data.$save;

            callAfterLoaded();
            loader.fadeOut();

            that.data.$save = function () {
                $element.addClass('isa-save');
                loader.fadeIn();
                callBeforeLoad();
                $save.apply(this, arguments).then(function () {
                    loader.fadeOut();
                    callAfterLoaded();
                });
            }

            if(angular.isArray(that.data)) {
                angular.forEach(that.data, function(data) {
                   bindRemove(data);
                });
            } else {
                bindRemove(that.data);
            }



        });

        $scope.$watch('isaLoaderCtrl.data', function (data) {
            if (data) {
                callBeforeLoad();

                angular.forEach(onLoadedFn, function (fn) {
                    that.data.$promise.then(fn)
                });
            }
        });

    }

})();