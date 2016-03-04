(function() {
    'use strict'

    angular.module('isabase-app')
        .filter('uiCalendar', Filter);

    function Filter(CALENDAR, APP_CONFIG) {
        return function(date) {
            if(date) {
                var settings = angular.copy($.fn.calendar.settings);
                settings.type = 'date';
                settings.monthFirst = false;
                settings.text = CALENDAR[APP_CONFIG.locale.preferredLanguage.replace('-', '')];

                date = new Date(date.split('-'));

                return $.fn.calendar.settings.formatter.date(date, settings);
            }
        }
    }

})();