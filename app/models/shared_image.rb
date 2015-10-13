class SharedImage < ActiveRecord::Base
  
  belongs_to :shared_image, :class_name => "Image"
  belongs_to :shared_user, :class_name => "User"
  
end
