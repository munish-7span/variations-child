jQuery(document).ready(function($) {
    // Initialize Slick Slider
    $('.mp-hero-slider, .mp-hero-slider .block-editor-block-list__block ').slick({
        autoplay: true,
        autoplaySpeed: 3000,
        dots: true,
        arrows: true,
        infinite: true,
        speed: 500,
        fade: false,
        cssEase: 'linear'
    });
});
