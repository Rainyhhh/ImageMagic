class Image < ActiveRecord::Base
  
  # Ensure user selects a file to upload
  validates :picture, presence: true
  
  belongs_to :user
   
  # Mount the uploader for picture uploads
  mount_uploader :picture, PictureUploader
  
  # Database relations for sharing images
  # Join table
  has_many :shared_images, :foreign_key => :shared_image_id, :dependent => :destroy
  # The "through" link to authorised viewers 
  has_many :viewers, :through => :shared_images, :source => :shared_user
  
  
  # Self join to associate filtered images with original images
  has_many :progeny, class_name: "Image", foreign_key: "original_id"
  belongs_to :original, class_name: "Image"
  
  # For tagging functionality
  acts_as_taggable
  
end
