
/* =========================================================
Twitter
============================================================ */
// jQuery(document).ready(function() {
    // var twitter_update_list = jQuery('.twitter_outer');
    // if(twitter_update_list.length > 0){
        // jQuery.each(twitter_update_list, function(){            
            // jQuery(this).find('.twitter_inner').first().tweet({
                // join_text: "auto",
                // username: jQuery(this).find('.tweet_id').first().val(),
                // avatar_size: 69,
                // count: jQuery(this).find('.tweet_count').first().val(),
                // auto_join_text_default: "",
                // auto_join_text_ed: "",
                // auto_join_text_ing: "",
                // auto_join_text_reply: "",
                // auto_join_text_url: "",
                // loading_text: "<center>loading tweets...</center><br/>",
                // template: "{avatar} {join} {text}"
            // });            
        // });
    // }
// });

/* =========================================================
Fix css
============================================================ */
jQuery(document).ready(function(){
	jQuery(".widget .other-categories li:last-child").css("padding-bottom",0);
	jQuery(".bottom-menu li:first-child").css({"border-left": "none", "padding-left":0, "margin-left":0});
	jQuery(".column-a .tweet_list li:last-child").css({"border-bottom": "none", "padding-bottom":0, "margin-bottom":0});
	jQuery(".widget .older-posts li:last-child").css({"border-bottom": "none", "padding-bottom":0, "margin-bottom":0});
	jQuery(".widget .recent-comments li:last-child").css({"border-bottom": "none", "padding-bottom":0, "margin-bottom":0});
	jQuery(".kopa-search-list li:last-child").css({"border-bottom": "none", "padding-bottom":0, "margin-bottom":0});
	jQuery(".pagination li:last-child").css("margin-right",0);
});

/* =========================================================
Flickr Feed
============================================================ */
jQuery(document).ready(function(){ 
	jQuery('#flickr-feed-1').jflickrfeed({
		limit: 6,
		qstrings: {
			id: '78715597@N07'
		},
		itemTemplate:
			'<li class="flickr-badge-image">' +
			'<a rel="prettyPhoto[kopa-flickr]" href="{{image}}" title="{{title}}">' +
			'<img src="{{image_s}}" alt="{{title}}" width="85px" heigth="85px" />' +
			'</a>' +
			'</li>'
	}, function(data) {
			jQuery("a[rel^='prettyPhoto']").prettyPhoto({
			show_title: false,
			deeplinking:false
		}).mouseenter(function(){
			//jQuery(this).find('img').fadeTo(500, 0.6);
		}).mouseleave(function(){
			//jQuery(this).find('img').fadeTo(400, 1);
		});
	});
});

/* =========================================================
Dropdown menu
============================================================ */
jQuery(document).ready(function(){
	
	jQuery("#main-menu li").hover(function() {
		jQuery(this).find("ul").first().slideDown(100);
			}, function() {
		jQuery(this).find("ul").first().slideUp(100);
	});
	
	jQuery("#main-menu li").each(function() {
		if(jQuery(this).has("ul").length > 0) {
			jQuery(this).addClass("menu-arrow");
		}
	});

});

/* =========================================================
Create mobile menu
============================================================ */
function createMobileMenu(menu_id, mobile_menu_id){
    // Create the dropdown base
    jQuery("<select />").appendTo(menu_id);
    jQuery(menu_id).find('select').first().attr("id",mobile_menu_id);
    
    // Populate dropdown with menu items
    jQuery(menu_id).find('a').each(function() {        
        var el = jQuery(this);       
        
        var selected = '';
        if (el.parent().hasClass('current-menu-item') == true){
            selected = "selected='selected'";
        }        
        
        var depth = el.parents("ul").size();
        var space = '';
        if(depth > 1){
            for(i=1; i<depth; i++){
                space += '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;';
            }
        }        
        
        jQuery("<option "+selected+" value='"+el.attr("href")+"'>"+space+el.text()+"</option>").appendTo(jQuery(menu_id).find('select').first());
    });
    jQuery(menu_id).find('select').first().change(function() {
        window.location = jQuery(this).find("option:selected").val();
    });    
}

jQuery(document).ready(function(){
    if(jQuery('#main-nav').length > 0){
        createMobileMenu('#main-nav','responsive-menu');	
    }
});

/* =========================================================
Social icons hover
============================================================ */
jQuery(document).ready(function(){
   
    jQuery(".social-links li").mouseenter(function(){
        jQuery(this).find('a').fadeTo(300, 0);
    }).mouseleave(function(){
        jQuery(this).find('a').fadeTo(300, 1);
    });	
});

/* =========================================================
Scroll to top
============================================================ */
jQuery(document).ready(function(){

	// hide #back-top first
	jQuery("#back-top").hide();
	
	// fade in #back-top
	jQuery(function () {
		jQuery(window).scroll(function () {
			if (jQuery(this).scrollTop() > 200) {
				jQuery('#back-top').fadeIn();
			} else {
				jQuery('#back-top').fadeOut();
			}
		});

		// scroll body to 0px on click
		jQuery('#back-top a').click(function () {
			jQuery('body,html').animate({
				scrollTop: 0
			}, 800);
			return false;
		});
	});

});

/* =========================================================
Home page slider
============================================================ */

var sliderfunction = function(){
  $('#home-slider').flexslider({
	animation: "slide",
	start: function(slider){
	  $('body').removeClass('loading');
	}
  });
};
$(document).on('ready', sliderfunction());
// $('home-slider').on('load', sliderfunction());

// $(document).ready(sliderfunction());
	
/* =========================================================
Featured widget slider
============================================================ */
// jQuery(window).load(function() {	
	// jQuery('.featured-news').carouFredSel({
		// responsive: true,
		// prev: '#prev-1',
		// next: '#next-1',
		// width: '100%',
		// scroll: 1,
		// auto: false,
		// items: {
			// width: 217,
			// height: 'auto',
			// visible: {				
				// min: 1,
				// max: 3
			// }
		// }
	// });
// });

/* =========================================================
prettyPhoto
============================================================ */
// jQuery(document).ready(function(){
    // jQuery("a[rel^='prettyPhoto']").prettyPhoto();
// });

/* =========================================================
Comment Form
============================================================ */
jQuery(document).ready(function(){
    if(jQuery("#comments-form").length > 0){
	// Validate the contact form
	  jQuery('#comments-form').validate({
	
		// Add requirements to each of the fields
		rules: {
			name: {
				required: true,
				minlength: 2
			},
			email: {
				required: true,
				email: true
			},
			message: {
				required: true,
				minlength: 10
			}
		},
		
		// Specify what error messages to display
		// when the user does something horrid
		messages: {
			name: {
				required: "Please enter your name.",
				minlength: jQuery.format("At least {0} characters required.")
			},
			email: {
				required: "Please enter your email.",
				email: "Please enter a valid email."
			},
			url: {
				required: "Please enter your url.",
				url: "Please enter a valid url."
			},
			message: {
				required: "Please enter a message.",
				minlength: jQuery.format("At least {0} characters required.")
			}
		},
		
		// Use Ajax to send everything to processForm.php
		submitHandler: function(form) {
			jQuery("#submit-comment").attr("value", "Sending...");
			jQuery(form).ajaxSubmit({
				success: function(responseText, statusText, xhr, $form) {
					jQuery("#response").html(responseText).hide().slideDown("fast");
					jQuery("#submit-comment").attr("value", "Comment");
				}
			});
			return false;
		}
	  });
	}
	
	if(jQuery("#contact-form").length > 0){
	// Validate the contact form
	  jQuery('#contact-form').validate({
	
		// Add requirements to each of the fields
		rules: {
			name: {
				required: true,
				minlength: 2
			},
			email: {
				required: true,
				email: true
			},
			message: {
				required: true,
				minlength: 10
			}
		},
		
		// Specify what error messages to display
		// when the user does something horrid
		messages: {
			name: {
				required: "Please enter your name.",
				minlength: jQuery.format("At least {0} characters required.")
			},
			email: {
				required: "Please enter your email.",
				email: "Please enter a valid email."
			},
			url: {
				required: "Please enter your url.",
				url: "Please enter a valid url."
			},
			message: {
				required: "Please enter a message.",
				minlength: jQuery.format("At least {0} characters required.")
			}
		},
		
		// Use Ajax to send everything to processForm.php
		submitHandler: function(form) {
			jQuery("#submit-contact").attr("value", "Sending...");
			jQuery(form).ajaxSubmit({
				success: function(responseText, statusText, xhr, $form) {
					jQuery("#response").html(responseText).hide().slideDown("fast");
					jQuery("#submit-contact").attr("value", "Submit");
				}
			});
			return false;
		}
	  });
	}
});

/* =========================================================
Tabs
============================================================ */
jQuery(document).ready(function() {    
    if( jQuery(".tab-content-1").length > 0){   
        //Default Action Product Tab
        jQuery(".tab-content-1").hide(); //Hide all content
        jQuery("ul.tabs-1 li:first").addClass("active").show(); //Activate first tab
        jQuery(".tab-content-1:first").show(); //Show first tab content
        //On Click Event Product Tab
        jQuery("ul.tabs-1 li").click(function() {
            jQuery("ul.tabs-1 li").removeClass("active"); //Remove any "active" class
            jQuery(this).addClass("active"); //Add "active" class to selected tab
            jQuery(".tab-content-1").hide(); //Hide all tab content
            var activeTab = jQuery(this).find("a").attr("href"); //Find the rel attribute value to identify the active tab + content
            jQuery(activeTab).fadeIn(); //Fade in the active content
            return false;
		
        });
    }
	
	if( jQuery(".tab-content-2").length > 0){   
        //Default Action Product Tab
        jQuery(".tab-content-2").hide(); //Hide all content
        jQuery("ul.tabs-2 li:first").addClass("active").show(); //Activate first tab
        jQuery(".tab-content-2:first").show(); //Show first tab content
        //On Click Event Product Tab
        jQuery("ul.tabs-2 li").click(function() {
            jQuery("ul.tabs-2 li").removeClass("active"); //Remove any "active" class
            jQuery(this).addClass("active"); //Add "active" class to selected tab
            jQuery(".tab-content-2").hide(); //Hide all tab content
            var activeTab = jQuery(this).find("a").attr("href"); //Find the rel attribute value to identify the active tab + content
            jQuery(activeTab).fadeIn(); //Fade in the active content
            return false;
		
        });
    }
});

/* =========================================================
Toggle Boxes
============================================================ */
jQuery(document).ready(function () {
     
    jQuery('#toggle-view li').click(function () {
 
        var text = jQuery(this).children('div.panel');
 
        if (text.is(':hidden')) {
            text.slideDown('300');
            jQuery(this).children('span').html('-');    
        } else {
            text.slideUp('300');
            jQuery(this).children('span').html('+');    
        }
         
    });
 
});

/* =========================================================
Accordion
========================================================= */
jQuery(document).ready(function() {
    (function() {
        var acc_wrapper=jQuery('.acc-wrapper');
        if (acc_wrapper.length >0) 
        {
            jQuery('.acc-wrapper .accordion-container').hide();
            jQuery.each(acc_wrapper, function(index, item){
                jQuery(this).find(jQuery('.accordion-title')).first().addClass('active').next().show();
				
            });
            jQuery('.accordion-title').on('click', function(e) {
                if( jQuery(this).next().is(':hidden') ) {
                    jQuery(this).parent().find(jQuery('.active')).removeClass('active').next().slideUp(300);
                    jQuery(this).toggleClass('active').next().slideDown(300);
                }
                e.preventDefault();
            });
        }
    })();
});

/* =========================================================
Hover effect jQuery
========================================================= */
jQuery(window).load(function() {
	var view_port_width = jQuery(window).width();
	if (view_port_width > 1145){
		jQuery('.hover-img').adipoli({
			'startEffect' : 'overlay',
			'hoverEffect' : 'foldLeft'
		});
	}
});
/* =========================================================
fancybox jQuery
========================================================= */
