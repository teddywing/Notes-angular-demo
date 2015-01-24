class NotesController < ApplicationController
  protect_from_forgery with: :null_session
  
  def index
    render :json => Note.all.order(:created_at => :desc)
  end

  def show
    render :json => Note.find(params[:id])
  end

  def create
    note = Note.create(note_params)
    render :json => note
  end

  def update
    note = Note.find(params[:id])
    note.update(note_params)
    render :json => note
  end

  def destroy
    note = Note.find(params[:id])
    note.destroy
    render :json => note
  end
  
  private
  
    def note_params
      params.require(:note).permit(:title, :body)
    end
end
