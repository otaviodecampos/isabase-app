(function () {
    'use strict'

    angular.module('isabase-app')
        .filter('uiCalendar', Filter);

    function Filter(uiCalendar) {

        var settings = angular.copy($.fn.calendar.settings);
        settings.type = 'date';
        settings.monthFirst = false;
        settings.text = uiCalendar.text;

        return function (date) {
            if (date) {
                return $.fn.calendar.settings.formatter.date(new Date(date.split('-')), settings);
            }
        }
    }

})();