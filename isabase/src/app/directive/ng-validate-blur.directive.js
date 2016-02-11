(function () {
    'use strict'

    angular.module('isabase-app')
        .directive('ngValidateBlur', Directive);

    /* @ngInject */
    function Directive($interpolate) {
        return {
            restrict: 'A',
            require: '?^form',
            link: function (scope, el, attrs, formCtrl) {
                if (formCtrl) {
                    var inputEl = el[0].querySelector("[name]")
                        , inputNgEl = angular.element(inputEl)
                        , inputName = $interpolate(inputNgEl.attr('name'))(scope);

                    inputNgEl.bind('input', function (e) {
                        scope.form[inputName].$setDirty();
                        //scope.$apply();
                    });

                    inputNgEl.bind('blur', function () {
                        scope.form[inputName].$setDirty();
                        scope.$apply();
                    });
                }
            }
        }
    }

})();