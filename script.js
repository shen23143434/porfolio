(function($) {
    var SliceSlider = {
      settings: {
        delta: 0,
        currentSlideIndex: 0,
        scrollThreshold: 40,
        slides: $('.slide'),
        numSlides: $('.slide').length,
        navLinks: $('.nav-link'), // Select navigation links
      },
      init: function() {
        s = this.settings;
        this.bindEvents();

        // Dynamically set the form's return URL to the current page URL with a success flag
        var nextUrlInput = document.getElementById('next-url');
        if(nextUrlInput) {
            var baseUrl = window.location.href.split('?')[0]; // Get URL without parameters
            nextUrlInput.value = baseUrl + '?success=true';
        }

        // Check if we just successfully submitted the form
        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.get('success') === 'true') {
            // Show SweetAlert
            Swal.fire({
                title: 'Success!',
                text: 'Your message has been sent. I will get back to you soon!',
                icon: 'success',
                confirmButtonText: 'Awesome',
                confirmButtonColor: '#1e1e24'
            });

            // Navigate to the contact slide (index 4)
            s.currentSlideIndex = 4;
            this.showSlide();

            // Clean up the URL so it doesn't show next time you refresh
            window.history.replaceState({}, document.title, window.location.pathname);
        }
      },
      bindEvents: function(){
        // Mouse Scroll
        s.slides.on({ 'DOMMouseScroll mousewheel' : SliceSlider.handleScroll });
  
        // Keyboard
        $(document).keyup(function(e) {
          if ((e.which === 37) || (e.which === 38)){ SliceSlider.prevSlide(); }
          if ((e.which === 39) || (e.which === 40)) { SliceSlider.nextSlide(); }
        });
  
        // CLICK HANDLER FOR HEADER NAVIGATION
        s.navLinks.on('click', function(e){
            e.preventDefault();
            
            // Get the index from data-index="x"
            var index = $(this).data('index');

            s.currentSlideIndex = index;
            SliceSlider.showSlide();
        });
  
        // Special handler for "Contact Info" button in Home
        $('.js-contact').on('click', function(e){
            e.preventDefault();
            s.currentSlideIndex = 4; // Index 4 is the Contact Slide
            SliceSlider.showSlide();
        });

        // Handler for "Send Message" button in Contact
        $('.js-send-email').on('click', function(e){
            e.preventDefault();
            
            var name = $('#contact-name').val();
            var email = $('#contact-email').val();
            var message = $('#contact-message').val();
            
            if(!name || !email || !message) {
                alert("Please fill in all fields.");
                return;
            }
            
            var subject = encodeURIComponent("Portfolio Contact from " + name);
            var body = encodeURIComponent("Name: " + name + "\nEmail: " + email + "\n\nMessage:\n" + message);
            
            window.location.href = "mailto:lastydante1@gmail.com?subject=" + subject + "&body=" + body;
        });
      },
      handleScroll: function(e){
        if (e.originalEvent.detail < 0 || e.originalEvent.wheelDelta > 0) { 
          s.delta--;
          if ( Math.abs(s.delta) >= s.scrollThreshold) { SliceSlider.prevSlide(); }
        } else {
          s.delta++;
          if (s.delta >= s.scrollThreshold) { SliceSlider.nextSlide(); }
        }
        return false;
      },
      showSlide: function(){ 
        s.delta = 0;
        if ($('body').hasClass('is-sliding')){ return; }
        
        // Update Navigation Active State
        s.navLinks.removeClass('active');
        $(s.navLinks[s.currentSlideIndex]).addClass('active');
  
        s.slides.each(function(i, slide) {
          $(slide).toggleClass('is-active', (i === s.currentSlideIndex)); 
          $('body').addClass('is-sliding');
          setTimeout(function(){ $('body').removeClass('is-sliding'); }, 1000);
        });
      },
      prevSlide: function(){
        if (s.currentSlideIndex <= 0) { s.currentSlideIndex = s.numSlides; }
        s.currentSlideIndex--;
        SliceSlider.showSlide();
      },
      nextSlide: function(){
        s.currentSlideIndex++;
        if (s.currentSlideIndex >= s.numSlides) { s.currentSlideIndex = 0; }
        SliceSlider.showSlide();
      },
    };
    SliceSlider.init();
  })(jQuery);