(function () {

    angular.module('angular-semantic-ui')
        .provider('uiCalendar', Provider);

    /* @ngInject */
    function Provider() {

        var settings = {
            text: ''
        };

        this.setSetting = function (name, text) {
            if (settings[name] == undefined) {
                throw new Error('uiCalendar setting not exists: ' + name);
            }
            settings[name] = text;
        }

        this.$get = function () {
            return angular.copy(settings);
        };

        return this;

    }

})();