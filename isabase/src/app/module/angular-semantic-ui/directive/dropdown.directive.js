(function () {

    /* global angular */
    angular.module('angular-semantic-ui')
        .directive('uiDropdown', Directive);

    function Directive($parse, $timeout, $compile) {
        return {
            restrict: 'A',
            require: '?ngModel',
            link: function (scope, element, attrs, ngModel) {
                var settings = $parse(attrs.uiDropdown)(scope)
                    , defaultText
                    , textElement;

                if (ngModel) {
                    scope.$watch(function () {
                        return ngModel.$modelValue;
                    }, function (newValue) {
                        if (!newValue || (angular.isArray(newValue) && !newValue.length) ) {
                            element.parent().children('[data-value]').remove();
                            defaultText = element.find('option').first().text();
                            textElement = element.parent().children('.text');
                            textElement.addClass('default').text(defaultText);
                        } else {
                            $timeout(function () {
                                $timeout(function () {
                                    element.dropdown('set selected', element.val());
                                }, 100);
                            }, 100);
                        }
                    });
                }

                $timeout(function () {
                    element.dropdown(settings);
                });
            }
        };
    }

})();