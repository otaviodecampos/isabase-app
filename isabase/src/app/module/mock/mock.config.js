(function () {

    angular.module('isabase-mock')
        .config(Config);

    /* @ngInject */
    function Config($provide, DELAY_CONFIG) {

        $provide.decorator('$httpBackend', function($delegate) {
            var proxy = function(method, url, data, callback, headers) {
                var interceptor = function() {
                    var _this = this
                        , _arguments = arguments;

                    var delay = DELAY_CONFIG[url] || 0;

                    setTimeout(function() {
                        callback.apply(_this, _arguments);
                    }, delay);
                };
                return $delegate.call(this, method, url, data, interceptor, headers);
            };
            for(var key in $delegate) {
                proxy[key] = $delegate[key];
            }
            return proxy;
        });

    }

})();