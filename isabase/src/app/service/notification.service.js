(function () {
    'use strict'

    angular.module('isabase-app')
        .service('Notification', Notification);

    /* @ngInject */
    function Notification(toaster, $translate, APP_CONFIG) {

        var _this = this
            , history = []
            , Last
            , Clear;

        $translate(['history', 'empty-notification', 'clear-notification']).then(function (translates) {
            Last = ['info', translates['history'], translates['empty-notification']];
            Clear = ['info', translates['history'], translates['clear-notification']];
        });

        this.pop = function (type, title, text, text2) {

            var args = Array.prototype.slice.call(arguments);
            $translate(args).then(function (translates) {
                var text = '';
                for(var i = 1; i < args.length; i++) {
                    if(typeof(args[i]) == 'string') {
                        args[i] = translates[args[i]];
                    }

                    if(typeof(args[i]) == 'object') {
                        var keys = Object.keys(args[i]);
                        var list = '';
                        for(var ik = 0; ik < keys.length; ik++) {
                            var item = args[i][keys[ik]];
                            if(item.message) {
                                list = list + '<li>' + item.message + '</li>';
                            }
                        }
                        args[i] = '<ul>' + list + '</ul>';
                    }

                    if(i == 2) {
                        text = '<b>' + args[i] + '</b>';
                    } else if( i > 2) {
                        text = text + '<br/>' + args[i];
                    }
                }

                args[2] = text;
                args = [args[0], args[1], args[2]];
                history.push(args);
                if (history.length > APP_CONFIG.notification.history) {
                    history = history.slice(history.length - APP_CONFIG.notification.history, history.length);
                }

                toaster.pop.apply(toaster, args);
            });

        }

        this.success = function () {
            var args = Array.prototype.slice.call(arguments);
            args.unshift('success');
            _this.pop.apply(this, args);
        }

        this.error = function () {
            var args = Array.prototype.slice.call(arguments);
            args.unshift('error');
            _this.pop.apply(this, args);
        }

        this.warning = function () {
            var args = Array.prototype.slice.call(arguments);
            args.unshift('warning');
            _this.pop.apply(this, args);
        }

        this.info = function (title, text, text2) {
            var args = Array.prototype.slice.call(arguments);
            args.unshift('info');
            _this.pop.apply(this, args);
        }

        this.showLast = function () {

            var last;

            if (history.length) {
                last = history[history.length - 1];
            }
            else {
                last = Last;
            }

            toaster.pop.apply(toaster, last);
        }

        this.showHistory = function () {
            if (history.length) {
                for (var i in history) {
                    toaster.pop.apply(toaster, history[i]);
                }
            }
            else {
                toaster.pop.apply(toaster, Last);
            }
        }

        this.clearHistory = function () {
            history = [];

            toaster.pop.apply(toaster, Clear);
        }

    }

})();