(function () {

    /* global angular */
    angular.module('angular-semantic-ui')
        .directive('uiDropdown', Directive);

    function Directive($parse, $timeout, $compile) {
        return {
            restrict: 'A',
            require: '?ngModel',
            link: function (scope, element, attrs, ngModel) {
                var settings = $parse(attrs.uiDropdown)(scope) || {}
                    , defaultText
                    , textElement;

                /*console.log(ngModel);

                settings.onChange = function(value, text, $choice) {
                    console.log(arguments);
                }*/

                if (ngModel) {
                    scope.$watch(function () {
                        return ngModel.$modelValue;
                    }, function (newValue) {
                        if (!newValue || (angular.isArray(newValue) && !newValue.length)) {
                            element.parent().children('[data-value]').remove();
                            defaultText = element.find('option').first().text();
                            textElement = element.parent().children('.text');
                            textElement.addClass('default').text(defaultText);
                        } else {
                            if (newValue.$promise) {
                                newValue.$promise.then(function() {
                                    setSelected(newValue);
                                });
                            } else {
                                setSelected(newValue);
                            }
                        }
                    });
                }

                $timeout(function () {
                    element.dropdown(settings);
                });

                function setSelected(value) {
                    $timeout(function () {
                        $timeout(function () {
                            var val = element.val();
                            if(settings.selectBy) {
                                val = value[settings.selectBy];
                            };
                            element.dropdown('set selected', val);
                        });
                    });
                }
            }
        };
    }

})();