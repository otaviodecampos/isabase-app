(function () {

    angular.module('isa-mock')
        .config(Config);

    /* @ngInject */
    function Config($provide, MOCKDELAY) {

        $provide.decorator('$httpBackend', function($delegate) {
            var proxy = function(method, url, data, callback, headers) {
                var interceptor = function() {
                    var _this = this
                        , _arguments = arguments;

                    var delay = MOCKDELAY[url] || 750;

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