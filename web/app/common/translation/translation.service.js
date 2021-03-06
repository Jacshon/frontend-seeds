(function() {
    angular.module('app.common').service('translationService', translationService);

    translationService.$inject = ['serverAPI'];

    function translationService(serverAPI) {
        this.changeLocale = changeLocale;

        function changeLocale(language) {
            return serverAPI.getData(InspiniaURLs.getURLS('app').changeLocale, {
                'language': language
            });
        }
    }
})();
