/**
 * Created by otaviodecampos on 04/2015.
 */

(function() {
    'use strict'

    angular.module('isabase-app')
        .directive('ngValidateBlur', Directive);

    /* @ngInject */
    function Directive($interpolate) {
        return {
            restrict: 'A',
            require: '^form',
            link: function (scope, el, attrs, formCtrl) {
                // find the text box element, which has the 'name' attribute
                var inputEl = el[0].querySelector("[name]");
                // convert the native text box element to an angular element
                var inputNgEl = angular.element(inputEl);
                // get the name on the text box so we know the property to check
                // on the form controller
                var inputName = $interpolate(inputNgEl.attr('name'))(scope);

                // disable has-error on input
                inputNgEl.bind('input', function (e) {
                    el.removeClass('error');
                });

                // only apply the has-error class after the user leaves the text box
                inputNgEl.bind('blur', function () {
                    el.toggleClass('error', formCtrl[inputName].$invalid);
                })
            }
        }
    }

})();