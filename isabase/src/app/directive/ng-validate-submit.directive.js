(function () {
    'use strict'

    angular.module('isabase-app')
        .directive('ngValidateSubmit', Directive);

    /* @ngInject */
    function Directive($timeout, $interpolate) {
        return {
            restrict: 'A',
            require: '?^form',
            link: function (scope, el, attrs, formCtrl) {
                if (formCtrl) {
                    $timeout(function() {
                        var inputEl = el[0].querySelector("[name]")
                            , inputNgEl = angular.element(inputEl)
                            , inputName = $interpolate(inputNgEl.attr('name'))(scope)
                            , formEl = inputNgEl.closest("form");

                        formEl.bind('submit', function (e) {
                            e.preventDefault();
                            scope.form[inputName].$setDirty();
                            scope.$apply();
                        });
                    });
                }
            }
        }
    }

})();