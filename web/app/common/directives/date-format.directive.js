(function() {
	angular.module('app.common')
		.directive('dateFormat', DateFormat);
	
	DateFormat.$inject = ['$filter'];
	
	function DateFormat($filter) {
		return {
			require: 'ngModel',
			link: function(scope, elem, attr, ngModelCtrl) {
				ngModelCtrl.$formatters.push(function(modelValue){
					if(modelValue) {
						return new Date(modelValue);
					}
				});
	  
				ngModelCtrl.$parsers.push(function(modelValue){
					if(modelValue) {
						return $filter('date')(modelValue, 'yyyy-MM-dd','GMT+8');
					}
				});
			}
		};
	}
})();