Rails.application.routes.draw do
  root :to => 'home#main'
  resources :notes, :except => [:new, :edit]
end
