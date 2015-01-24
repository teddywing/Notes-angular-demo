angular
	.module('nt.NoteService', ['ngResource'])
	.factory('NoteService', [
		'$resource',
		function($resource) {
			var Note = $resource('/notes/:id.json', { id: '@id' });
			
			return {
				notes: [],
				current_note: null,
				
				get_notes: function() {
					this.notes = Note.query();
				},
				
				get_note: function(note) {
					this.current_note = Note.get({ id: note.id });
				},
				
				save: function() {
					Note.save({
						id: this.current_note.id,
						title: this.current_note.title,
						body: this.current_note.body
					});
				}
			};
		}
	]);
