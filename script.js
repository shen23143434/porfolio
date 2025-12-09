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