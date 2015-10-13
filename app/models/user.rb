class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
  
  # set up relations to images, 
  # if user is deleted; associated images are deleted
  has_many :images, dependent: :destroy
  
  # Database relations for image sharing between users
  has_many :shared_images, :foreign_key => :shared_user_id, :dependent => :destroy
  has_many :viewable_images, :through => :shared_images, :source => :shared_image
  
end
