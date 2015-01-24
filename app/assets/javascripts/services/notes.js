angular
	.module('nt.NoteService', ['ngResource'])
	.factory('NoteService', [
		'$resource',
		function($resource) {
			var Note = $resource('/notes/:id.json',
				{ id: '@id' },
				{
					save: {
						method: 'PUT'
					}
				});
			
			return {
				notes: [],
				current_note: null,
				
				get_notes: function() {
					this.notes = Note.query();
				},
				
				get_note: function(note) {
					this.current_note = note;
				},
				
				save: function() {
					console.log(this.current_note.body);
					Note.save({
						id: this.current_note.id,
						title: this.current_note.title,
						body: this.current_note.body
					});
				},
				
				create: function () {
					var _this = this;
					
					if (this.new_note_title) {
						Note.save({
							title: this.new_note_title,
							body: ''
						}, function(response) {
							_this.show_create = false;
							delete _this.new_note_title;
							_this.current_note = response;
							_this.get_notes();
						});
					}
				}
			};
		}
	]);
