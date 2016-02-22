(function () {

    /* global angular */
    angular.module('angular-semantic-ui')
        .directive('uiCalendar', Directive);

    function Directive($parse, CALENDAR, APP) {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                var settings = $parse(attrs.uiCalendar)(scope)
                    , inputNgModel = angular.element(element[0].querySelector("[ng-model]"));

                if (!settings) {
                    settings = {};
                }

                if (inputNgModel) {
                    var ngModelCtrl = inputNgModel.controller('ngModel')
                        , ngModelAttr = inputNgModel.attr('ng-model')
                        , modelGetter = $parse(ngModelAttr)
                        , modelSetter = modelGetter.assign;
                }

                ngModelCtrl.$render = function () {
                    var value = ngModelCtrl.$modelValue;
                    if (value) {
                        value = new Date(value.split('-'));
                    }

                    element.calendar('set date', value);
                };

                settings.onChange = function (date, text) {
                    if (date) {
                        date = date.toISOString().slice(0, 10);
                    }

                    modelSetter(scope, date);
                    return true;
                };

                settings.text = CALENDAR[APP.locale.preferredLanguage.replace('-', '')];
                element.calendar(settings);
            }
        };
    }

})();