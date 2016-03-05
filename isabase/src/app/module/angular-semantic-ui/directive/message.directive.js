(function () {

    /* global angular */
    angular.module('angular-semantic-ui')
        .directive('uiMessage', Directive);

    function Directive() {
        return {
            restrict: 'A',
            link: function (scope, element) {

                element.find('.close')
                    .on('click', function () {
                        $(this)
                            .closest('.message')
                            .transition('fade')
                        ;
                    })
                ;

            }
        };
    }

})();