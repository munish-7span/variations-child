<?php
/**
 * This File Conain all the block js and css file
 */

function my_custom_block_enqueue() {
    // Add User Profile Block
    wp_enqueue_script(
        'user-profile-block',
        get_stylesheet_directory_uri() . '/blocks/user-profile/user-profile.js', // Place this file in your theme root
        ['wp-blocks', 'wp-element', 'wp-editor'], // Dependencies from WP
        false,
        true
    );

    // Add Hero Section Block
    wp_enqueue_script(
        'hero-slider', // Add handler
        get_stylesheet_directory_uri() . '/blocks/Hero Slider/hero-slider.js', // Place this file in your theme root
        ['wp-blocks', 'wp-element', 'wp-editor'], // Dependencies from WP
        false,
        true
    );

    // Add block to theme using below code
    // wp_enqueue_script(
    //     '', // Add handler
    //     get_stylesheet_directory_uri() . '/blocks/', // Place this file in your theme root
    //     ['wp-blocks', 'wp-element', 'wp-editor'], // Dependencies from WP
    //     false,
    //     true
    // );
}
add_action('enqueue_block_editor_assets', 'my_custom_block_enqueue');

// Enqueue CSS File the particular block
function enqueue_custom_block_assets() {
    // Frontend + Editor (shared styles)
    if (has_block('custom/mp-hero-slider')) {
        
        wp_enqueue_style(
            'hs-slick',
            'https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.9.0/slick.css',
            array(),
            '1.9.0',
        );
        
        wp_enqueue_style(
            'hs-slick-theme',
            'https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.9.0/slick-theme.css',
            array(),
            '1.9.0',
        );

        wp_enqueue_style(
            'mp-hero-slider-style',
            get_stylesheet_directory_uri() . '/blocks/Hero Slider/hero-slider-block.css',
            array(),
            filemtime(get_stylesheet_directory() . '/blocks/Hero Slider/hero-slider-block.css')
        );

        wp_enqueue_script(
            'hs-slick-min',
            'https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.9.0/slick.min.js', // JS file path
            array('jquery'),
            '1.9.0',
            true
        );

        wp_enqueue_script(
            'hs-hero-slider-init',
            get_stylesheet_directory_uri() . '/blocks/Hero Slider/hero-slider-init.js', // JS file path
            array('jquery'), // Dependencies (jquery and slick carousel)
            filemtime(get_stylesheet_directory() . '/blocks/Hero Slider/hero-slider-init.js'), // Version from file modification timestamp
            true // Load the script in the footer
        );
    }

    if (has_block('custom/my-block')) {
        
        wp_enqueue_style(
            'user-profile-block-style',
            get_stylesheet_directory_uri() . '/blocks/user-profile/user-profile.css',
            array(),
            filemtime(get_stylesheet_directory() . '/blocks/user-profile/user-profile.css')
        );
    }
}
add_action('enqueue_block_assets', 'enqueue_custom_block_assets');


// Add Gutenberg Block Category

function my_custom_block_category($categories, $post){
    $new_category = array(
        'slug' => 'variation-child-category',
        'title' => __('Variation', 'textdomain'),
    );
    array_unshift($categories, $new_category);
    return $categories;  
}

function my_custom_blocks(){
    add_filter('block_categories_all', 'my_custom_block_category', 10, 2);
}
add_action('init', 'my_custom_blocks');
