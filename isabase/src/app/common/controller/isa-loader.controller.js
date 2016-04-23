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

        that.settings = {
            leaveOnlyFail: false
        };

        var callBeforeLoad = function (type) {
            angular.forEach(beforeLoadFn, function (fn) {
                fn.call(that.data, type);
            });
        }

        var callAfterLoaded = function (type) {
            angular.forEach(afterLoadedFn, function (fn) {
                fn.call(that.data, type);
            });
        };

        var bindSave = function (data) {
            var type = 'save'
                , $save = data.$save;

            if(!$save) {
                return;
            }

            data.$save = function () {
                $element.addClass('isa-' + type);
                loader.fadeIn();
                callBeforeLoad(type);

                $save.apply(this, arguments).then(function () {
                    loader.fadeOut();
                    callAfterLoaded(type);
                });
            }
        }

        var bindRemove = function (data) {
            var type = 'remove'
                , $remove = data.$remove;

            if(!$remove) {
                return;
            }

            data.$remove = function () {
                $element.addClass('isa-' + type);
                loader.fadeIn();
                callBeforeLoad(type);

                $remove.apply(this, arguments).then(function () {
                    loader.fadeOut();
                    callAfterLoaded(type);
                });
            }
        }

        this.onLoaded = function (fn) {
            onLoadedFn.push(fn);
        }

        this.afterLoaded = function (fn) {
            afterLoadedFn.push(fn);
        }

        this.beforeLoad = function (fn) {
            beforeLoadFn.push(fn);
        }

        this.onLoaded(function () {
            callAfterLoaded();
            loader.fadeOut();

            if (angular.isArray(that.data)) {
                angular.forEach(that.data, function (data) {
                    bindSave(data);
                    bindRemove(data);
                });
            } else {
                bindSave(that.data);
                bindRemove(that.data);
            }


        });

        $scope.$watch('isaLoaderCtrl.data', function (data) {
            loader.fadeIn();
            if (data) {
                var promise = that.data.$promise || that.data;

                $element.addClass('isa-loader-data');
                callBeforeLoad();

                angular.forEach(onLoadedFn, function (fn) {
                    if(that.settings.leaveOnlyFail) {
                        promise.then(null, fn);
                    } else {
                        promise.then(fn, fn);
                    }

                });
            }
        });

    }

})();