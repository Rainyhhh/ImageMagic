class ImagesController < ApplicationController
  before_action :set_image, only: [:show, :edit, :update, :destroy, :filter, :create_filt_copy, :view_set]
  before_action :set_tags, only: [:index, :view_set, :view_tagged]
  before_action :authenticate_user!, only: [:edit,:new,:update,:destroy, :index]

  # GET /images
  # GET /images.json
  def index
    # display only the current user's images
    @allImages = current_user.images
    @images = @allImages.where(in_trash: false)
        
    # @images = Image.all
  end

  # GET /images/1
  # GET /images/1.json
  def show
  end

  # GET /images/new
  def new
    @image = Image.new
  end

  # GET /images/1/edit
  def edit
      
  end

  # POST /images
  # POST /images.json
  def create
    @image = Image.new(image_params)

    # NOTE: populate with current user: (current user is 
    # a built in devise function)
    @image.user = current_user

    respond_to do |format|
      if @image.save
        
        # create link to original id
        @image.original_id = @image.id
        @image.save
        
        format.html { redirect_to @image, notice: 'Image was successfully created.' }
        format.json { render :show, status: :created, location: @image }
      else
        format.html { render :new }
        format.json { render json: @image.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /images/1
  # PATCH/PUT /images/1.json
  def update
    respond_to do |format|
      if @image.update(image_params)
        format.html { redirect_to @image, notice: 'Image was successfully updated.' }
        format.json { render :show, status: :ok, location: @image }
      else
        format.html { render :edit }
        format.json { render json: @image.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /images/1
  # DELETE /images/1.json
  def destroy
    @image.destroy
    respond_to do |format|
      format.html { redirect_to images_url, notice: 'Image was successfully destroyed.' }
      format.json { head :no_content }
    end
  end
  
  # view shared images
  def shared_images

    # images shared with this user
    @viewable_images = current_user.viewable_images
    
    # @images = Image.all
  end
  
  # move images to trash
  def move_to_trash
    @image = Image.find(delete_params[:delete_image_id])
    @image.in_trash = 1
    @image.save
    respond_to do |format|
      format.html { redirect_to root_path }
      format.json { head :no_content }
    end 
  end
  
  # move images out from trash
  def return_from_trash
    @image = Image.find(delete_params[:delete_image_id])
    @image.in_trash = 0
    @image.save
    respond_to do |format|
      format.html { redirect_to trash_path }
      format.json { head :no_content }
    end 
  end
  
  # show images in trash
  def trash
    @allImages = current_user.images
    @images = @allImages.where(in_trash: true)
  end
  
  # clear trash
  def clear_trash
    @allImages = current_user.images
    @images = @allImages.where(in_trash: true).destroy_all
    respond_to do |format|
      format.html { redirect_to trash_path }
      format.json { head :no_content }
    end
  end

  # Share image page
  def share
    set_image
    
    # Users able to access the image
    @viewers = @image.viewers
    
    # List of potential users to share the image with
    @candidate_users = User.all.select {|user| user != current_user}
    @candidate_users = @candidate_users - @viewers
  end
  
  # Create share
  def create_share
    @image = Image.find(share_params[:shared_image_id])
    @share = SharedImage.new(share_params)
    @share.save
    respond_to do |format|
      format.html { redirect_to share_image_path(@image), notice: 'Shares updated!' }
      format.json { head :no_content }
    end 
  end
  
  # Delete share
  def cancel_share
    @image = Image.find(share_params[:shared_image_id])
    @share = SharedImage.find_by(shared_user_id: share_params[:shared_user_id],
             shared_image_id: share_params[:shared_image_id])
    @share.destroy
    respond_to do |format|
      format.html { redirect_to share_image_path(@image), notice: 'Shares updated!' }
      format.json { head :no_content }
    end
  end
  
  # Apply a filter
  def filter
    # Provide list of available filters to the view
    @filters = @image.picture.filters
  end
  
  
  # Function to create a copy of an image and apply filter to it
  def create_filt_copy
    
    @filter = filter_params[:filter_choice].to_s
    
    # Duplicate record and save to database
    @new = @image.dup
    @new.save
    
    # Re-upload image from local store
    @new.picture = @image.picture
    
    # Recreate tags
    @image.tag_list.each do |tag|
      @new.tag_list.add tag
    end
    
    # Apply filter and move from cache to local store
    @new.picture.send("#{@filter}_filter".to_sym)
    @new.save
    
    # Recreate thumbnail versions
    @new.picture.recreate_versions!
        
    respond_to do |format|
      format.html { redirect_to image_path(@new), notice: "Filter #{@filter} applied!" }
      format.json { head :no_content }
    end 
    
  end
  
  # function to show set of images (i.e. original images and
  # associated filtered images)
  def view_set
    @images = Image.where(original_id: @image.original_id, in_trash: false)
    render "index"
  end
  
  # function to show set of images associated with a tag
  def view_tagged
    @images = current_user.images.tagged_with(params[:tag]).where(in_trash: false)
    render "index"
  end
  
  # download shared image
  def download
    @image = Image.find(download_params[:download_image_id])
    send_file "public/#{@image.picture.url}"
  end
  
  private
    # Use callbacks to share common setup or constraints between actions.
    def set_image
      @image = Image.find(params[:id])
    end
    
    # Get this user's tags
    def set_tags 
      @tags = []
      if user_signed_in?
        current_user.images.where(in_trash: false).each do |i|
          i.tags.each {|tag| @tags << tag.name}
        end
      end
      @tags.uniq!
    end
    
    # Never trust parameters from the scary internet, only allow the white list through.
    def image_params
      params.fetch(:image, {}).permit(:picture, :tag_list)
    end
    
    def share_params
      params.require(:shared_image).permit(:shared_user_id, :shared_image_id)
    end
    
    def filter_params
      params.require(:filter).permit(:filter_choice)
    end
    
    def delete_params
      params.require(:delete).permit(:delete_image_id)
    end
    
    def download_params
      params.require(:download).permit(:download_image_id)
    end


end

