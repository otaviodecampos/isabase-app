(function () {

    /* global angular */
    angular.module('isa-semantic')
        .directive('uiDropdown', Directive);

    function Directive($parse, $timeout, $compile) {
        return {
            restrict: 'A',
            require: '?ngModel',
            link: function (scope, element, attrs, ngModel) {
                var settings = $parse(attrs.uiDropdown)(scope) || {}
                    , defaultText
                    , textElement;
    
                if (ngModel) {
                    scope.$watch(function () {
                        return ngModel.$modelValue;
                    }, function (newValue) {
                        if (newValue == undefined || (angular.isArray(newValue) && !newValue.length)) {
                            element.parent().children('[data-value]').remove();
                            defaultText = element.find('option').first().text();
                            textElement = element.parent().children('.text');
                            textElement.addClass('default').text(defaultText);
                        } else {
                            if (newValue.$promise) {
                                newValue.$promise.then(function() {
                                    initValue(newValue);
                                });
                            } else {
                                initValue(newValue);
                            }
                        }
                    });
                }

                $timeout(function () {
                    element.dropdown(settings);
                });
                
                function initValue(value) {
                    if(settings.wait && settings.wait.$promise) {
                        settings.wait.$promise.then(function() {
                            setSelected(value);    
                        });
                    } else {
                        setSelected(value);
                    }
                }
                
                function setSelected(value) {
                    $timeout(function () {
                        $timeout(function () {
                            var val = element.val();
                            if(settings.selectBy) {
                                val = value[settings.selectBy];
                            };
                            if(!angular.isArray(val)) {
                                val = val + '';
                            }
                            element.dropdown('set selected', val);
                        });
                    });
                }
            }
        };
    }

})();