(function() {
    'use strict'
    
    angular.module('isabase-app')
        .controller('AdminCtrl', Controller);

    /* @ngInject */
    function Controller($rootScope, $state, $stateParams, navigation, APP_CONFIG) {
        
        var that = this;
        
        this.stateParams = $stateParams;
        this.appConfig = APP_CONFIG;
        this.back = navigation.back;
        
        this.toasterOptions = {
            'time-out': this.appConfig.notification.timeout, 
            'position-class': this.appConfig.notification.positionClass, 
            'close-button': this.appConfig.notification.closeButton, 
            'body-output-type': 'trustedHtml' 
        }

        $rootScope.$on('$stateChangeStart', function (event, toState) {
            that.moveToParent = $state.includes(toState.name);
        });

    }

})();