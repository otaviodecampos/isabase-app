(function () {

    angular.module('isabase-app')
        .service('resourceUtil', Service);

    function Service() {

        this.decorateThen = function (Resource, methodNames, decorator) {
            _.forEach(methodNames, function (methodName) {
                decorateMethod(Resource[methodName]);
                decorateMethod(Resource.prototype[methodName], true);

                function decorateMethod(method, prototype) {
                    if (method) {
                        prototype ? Resource.prototype[methodName] = apply : Resource[methodName] = apply;
                    }

                    function apply() {
                        var resource = method.apply(Resource, arguments);
                        resource.$promise.then(decorator);
                        return resource;
                    }
                }
            });
        }

        this.decorateGetAndQuery = function (Resource, decorator) {
            this.decorateThen(Resource, ['get'], decorator);
            this.decorateThen(Resource, ['query'], function (resources) {
                _.forEach(resources, function (resource) {
                    decorator(resource);
                });
            });
        }

        this.decorateWithNewIndicator = function (Resource) {
            this.decorateGetAndQuery(Resource, function (resource) {
                resource.$new = resource.id == undefined;
            });
        }

        this.decorateWithCreateOrUpdateByProperty = function (Resource, property) {
            var idProperty = property || 'id';
            Resource.prototype.$save = function () {
                var method = this[idProperty] == undefined ? this.$create : this.$update;
                return method.apply(this, arguments);
            };
        }

    }

})();