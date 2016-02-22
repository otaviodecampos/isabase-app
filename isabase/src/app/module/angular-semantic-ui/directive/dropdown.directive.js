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
                        if (!newValue) {
                            defaultText = element.find('option').first().text();
                            textElement = element.parent().children('.text');
                            textElement.addClass('default').text(defaultText);
                        } else {
                            $timeout(function () {
                                $timeout(function () {
                                    if(angular.isArray(newValue)) {
                                        angular.forEach(newValue, function(value) {
                                            element.dropdown('set selected', typeof(value) + ':' + value);
                                        });
                                    } else {
                                        element.dropdown('set selected', typeof(newValue) + ':' + newValue);
                                    }
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