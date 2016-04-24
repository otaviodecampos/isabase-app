(function () {

    /* global angular */
    angular.module('isa-semantic')
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