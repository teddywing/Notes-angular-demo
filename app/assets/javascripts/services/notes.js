(function(angular) {
	angular
		.module('nt.NotesService', [
			'ngResource'
		])
		.service('NotesService', [
			'$resource',
			function($resource) {
				var Note = $resource('/notes/:id.json',
					{ id: '@id' },
					{
						update: {
							method: 'PUT'
						}
					}
				);

				this.notes = null;
				this.current_note = null;

				this.fetch = function() {
					this.notes = Note.query();

					return this.notes.$promise;
				};

				this.open = function(note) {
					this.current_note = note;
				};

				this.update = function() {
					this.current_note.$update();
				};

				this.create = function(note_title) {
					if (note_title) {
						Note.save({
							title: note_title,
							body: ''
						},
						(response) => {
							delete this.new_note_title;
							this.show_create = false;
							this.fetch().then(() => {
								this.current_note = this.notes.find((el) => {
									return el.id === response.id;
								});
							});
						});
					}
				};

				this.delete = function(note) {
					this.notes.splice(this.notes.indexOf(note), 1);
					note.$delete().then(() => {
						this.current_note = null;
					});
				};
			}
		]);
})(window.angular);
