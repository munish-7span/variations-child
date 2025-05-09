<?php 

add_theme_support('menu');
add_theme_support('widgets');

function child_enqueue_script(){
    wp_enqueue_style('child-style', get_stylesheet_directory_uri() .'/style.css', array(), time());
    wp_enqueue_style('custom-style', get_stylesheet_directory_uri() .'/css/custom.css', array(), time());
    
    wp_enqueue_script('child-script', get_stylesheet_directory_uri() .'/js/custom.js', array(), time(), true);
}

add_action('wp_enqueue_scripts', 'child_enqueue_script');

// Register Elementor Widget
function register_new_widgets( $widgets_manager ) {
	require_once( get_stylesheet_directory() . '/elementor-widgets/testimonial-slider.php' );
	$widgets_manager->register( new \Elementor_Testimonial_Widget() );
}
add_action( 'elementor/widgets/register', 'register_new_widgets' );


add_action('elementor/editor/after_enqueue_styles', function () {
    wp_enqueue_style(
        'testimonial-slick-slider',
        'https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.css',
        [],
        '1.8.1'
    );

    wp_enqueue_style(
        'testimonial-slick-theme-slider',
        'https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick-theme.css',
        ['testimonial-slick-slider'],
        '1.8.1'
    );

    wp_enqueue_style(
        'testimonial-slider-widget-style',
        get_stylesheet_directory_uri() . '/elementor-widgets/assets/testimonial-slider.css',
        ['testimonial-slick-theme-slider'],
        filemtime(get_stylesheet_directory() . '/elementor-widgets/assets/testimonial-slider.css')
    );
});

add_action('elementor/editor/after_enqueue_scripts', function () {
    wp_enqueue_script(
        'testimonial-slick-script',
        'https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.min.js',
        ['jquery'],
        '1.8.1',
        true
    );

    wp_enqueue_script(
        'testimonial-slider-widget-script',
        get_stylesheet_directory_uri() . '/elementor-widgets/assets/testimonial-slider.js',
        ['testimonial-slick-script'],
        time(),
        true
    );
});




/**
 * Add Custom Block file (Develop with JS)
 */
require_once( get_stylesheet_directory(  ) .'/blocks/custom-block-functions.php');
