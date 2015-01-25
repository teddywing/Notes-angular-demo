angular
	.module('nt.NoteService', ['ngResource'])
	.factory('NoteService', [
		'$resource',
		function($resource) {
			var Note = $resource('/notes/:id.json',
				{ id: '@id' },
				{
					update: {
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
				
				update: function() {
					this.current_note.$update();
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
