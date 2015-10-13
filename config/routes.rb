Rails.application.routes.draw do

  resources :images
  
  # note: Ruby is moving towards all actions being by get and post. 
  # unfortunately, devise_for logs out using the special "DELETE". Therefore, the below
  # sign_out_via : part is required in order that the destroy_user_session path uses GET instead of DELETE.
  # see: http://rubydoc.info/github/plataformatec/devise/master/ActionDispatch/Routing/Mapper:devise_for
  devise_for :users, sign_out_via: [:get]
  
  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

  # You can have the root of your site routed with "root"
  root 'images#index'
  
  # Routes for sharing images
  
  
  get 'images/:id/share' => 'images#share', as: :share_image
   
  post 'images/share' => 'images#create_share', as: :create_share
  
  post 'images/unshare' => 'images#cancel_share', as: :cancel_share
  
  # Routes for applying filters
  get 'images/:id/filter' => 'images#filter', as: :filter
  
  post 'images/:id/create_filt_copy' => 'images#create_filt_copy', as: :create_filt_copy
  
  #Routes for shared images
  
  get 'shared_images' => 'images#shared_images', as: :shared_images
  
  #Routes for deleting images
  
  post 'delete' => 'images#move_to_trash', as: :delete
  
  post 'cancel_delete' => 'images#return_from_trash', as: :return_back
  
  get 'trash' => 'images#trash', as: :trash
  
  post 'clear_trash' => 'images#clear_trash', as: :clear_trash
  
  # Routes for viewing image set
  
  get 'images/:id/view_set' => 'images#view_set', as: :view_set
  
  # Routes for viewing tagged images
  get 'images/:tag/tagged', to: 'images#view_tagged', as: :view_tagged
  
  # Routes for downloading shared images
  
  post 'download' => 'images#download', as: :download
  
  # Example of regular route:
  #   get 'products/:id' => 'catalog#view'

  # Example of named route that can be invoked with purchase_url(id: product.id)
  #   get 'products/:id/purchase' => 'catalog#purchase', as: :purchase

  # Example resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Example resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Example resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Example resource route with more complex sub-resources:
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', on: :collection
  #     end
  #   end

  # Example resource route with concerns:
  #   concern :toggleable do
  #     post 'toggle'
  #   end
  #   resources :posts, concerns: :toggleable
  #   resources :photos, concerns: :toggleable

  # Example resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end
end
