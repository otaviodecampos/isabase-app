(function () {
    'use strict';

    angular.module('common')
        .service('modal', Service);

    /* @ngInject */
    function Service($templateRequest, $document, $compile, $rootScope, $q, $controller) {

        var defaultSettings = {
            blurring: true,
            observeChanges: true,
            templateUrl: 'isabase-app/modal.tpl.html'
        }

        this.open = function (userSettings) {
            var settings = angular.extend({}, defaultSettings, userSettings);
            return _open(settings);
        }

        function _open(settings) {
            var deferred = $q.defer()
                , templateUrl
                , scope;

            templateUrl = angular.isFunction(settings.templateUrl) ?
                settings.templateUrl() : settings.templateUrl;

            scope = settings.scope ?
                settings.scope.$new() : $rootScope.$new();

            if (settings.controller) {
                $controller(settings.controller, {$scope: scope});
            }

            $q.when($templateRequest(templateUrl)).then(function (template) {
                var element = $compile(template)(scope)
                    , target = $document.find('body').eq(0)
                    , approve;

                target.append(element);

                scope.$on('$destroy', function() {
                    element.remove();
                });

                element.modal({
                    blurring: settings.blurring,
                    observeChanges: settings.observeChanges,
                    onHide: function () {
                        if (approve) {
                            deferred.resolve();
                        } else {
                            deferred.reject();
                        }
                    },
                    onApprove: function () {
                        approve = true;
                    },
                    onHidden: function() {
                        scope.$destroy();
                    }
                });

                element.modal('show');
            });

            return deferred.promise;
        }
    }

})();