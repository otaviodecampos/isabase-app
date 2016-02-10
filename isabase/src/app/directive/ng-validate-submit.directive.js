/**
 * Created by otaviodecampos on 04/2015.
 */

(function() {
    'use strict'

    angular.module('isabase-app')
        .directive('ngValidateSubmit', Directive);

    /* @ngInject */
    function Directive($interpolate) {
        return {
            restrict: 'A',
            require: '^form',
            link: function (scope, el, attrs, formCtrl) {
                var inputEl = el[0].querySelector("[name]");
                var inputNgEl = angular.element(inputEl);
                var inputName = $interpolate(inputNgEl.attr('name'))(scope);
                var formEl = inputNgEl.closest("form");

                formEl.bind('submit', function (e) {
                    e.preventDefault();
                    el.toggleClass('error', formCtrl[inputName].$invalid);
                });
            }
        }
    }

})();