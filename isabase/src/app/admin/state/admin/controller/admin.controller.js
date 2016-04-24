(function() {
    'use strict'
    
    angular.module('isabase-app')
        .controller('AdminCtrl', Controller);

    /* @ngInject */
    function Controller($rootScope, $state, ADMINSETTINGS) {
        
        var that = this;
        
        this.toasterOptions = {
            'time-out': ADMINSETTINGS.notification.timeout,
            'position-class': ADMINSETTINGS.notification.positionClass,
            'close-button': ADMINSETTINGS.notification.closeButton,
            'body-output-type': 'trustedHtml' 
        }

        $rootScope.$on('$stateChangeStart', function (event, toState) {
            that.moveToParent = $state.includes(toState.name);
            that.moveToChild = toState.$$state().includes[$state.current.name];
        });

    }

})();