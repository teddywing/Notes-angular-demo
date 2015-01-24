(function() {
	angular
		.module('nt.Notes', [
			'nt.NoteService'
		])
		.controller('MainController', [
			'$scope',
			'NoteService',
			function($scope, NoteService) {
				$scope.noteService = NoteService;
				
				$scope.noteService.get_notes();
			}
		]);
})();
