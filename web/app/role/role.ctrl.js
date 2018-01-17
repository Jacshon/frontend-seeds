/**
 * Created by weijiang
 * data : 2018/1/16.
 * version :v1.0.0
 */
(function () {
    angular.module('app.role')
        .controller('RoleController', RoleController);

    RoleController.$inject = ['DTOptionsBuilder'];
    function RoleController(DTOptionsBuilder) {
        var vm = this;
        this.dtOptions = DTOptionsBuilder.newOptions()
            .withDOM('<"html5buttons"B>lTfgitp')
            .withButtons([
                {extend: 'copy'},
                {extend: 'csv'},
                {extend: 'excel', title: 'ExampleFile'},
                {extend: 'pdf', title: 'ExampleFile'},

                {extend: 'print',
                    customize: function (win){
                        $(win.document.body).addClass('white-bg');
                        $(win.document.body).css('font-size', '10px');

                        $(win.document.body).find('table')
                            .addClass('compact')
                            .css('font-size', 'inherit');
                    }
                }
            ]);

        /**
         * persons - Data used in Tables view for Data Tables plugin
         */
        this.persons = [
            {
                id: '1',
                firstName: 'Monica',
                lastName: 'Smith'
            },
            {
                id: '2',
                firstName: 'Sandra',
                lastName: 'Jackson'
            },
            {
                id: '3',
                firstName: 'John',
                lastName: 'Underwood'
            },
            {
                id: '4',
                firstName: 'Chris',
                lastName: 'Johnatan'
            },
            {
                id: '5',
                firstName: 'Kim',
                lastName: 'Rosowski'
            }
        ];
    }
})();