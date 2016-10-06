(function(angular) {
	angular
		.module('nt.Notes', [
			'nt.NotesService'
		])
		.controller('MainController', [
			'$scope',
			'NotesService',
			function($scope, NotesService) {
				$scope.notesService = NotesService;
				NotesService.fetch();
			}
		]);
})(window.angular);
