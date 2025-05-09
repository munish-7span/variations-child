<?php


function my_custom_block_enqueue() {
    wp_enqueue_script(
        'user-profile-block',
        get_stylesheet_directory_uri() . '/blocks/user-profile/user-profile.js', // Place this file in your theme root
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


function enqueue_user_profile_block_styles($block_content, $block) {
    if ($block['blockName'] === 'custom/my-block') {
        wp_enqueue_style(
            'user-profile-block-style',
            get_stylesheet_directory_uri() . '/blocks/user-profile/user-profile.css',
            array(),
            filemtime( get_stylesheet_directory() . '/blocks/user-profile/user-profile.css' )
        );
    }
    return $block_content;
}
add_filter('render_block', 'enqueue_user_profile_block_styles', 10, 2);
