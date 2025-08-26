<?php
/**
 * Plugin Name: Latest Posts Grid Block
 * Description: Custom Gutenberg block that fetches latest posts via WPGraphQL and renders a responsive grid (React + Tailwind).
 * Version: 1.1.0
 * Author: You
 */

if ( ! defined( 'ABSPATH' ) ) { exit; }

add_action('init', function () {
    register_block_type(__DIR__);
});

add_action('wp_enqueue_scripts', function () {
    $handle = 'latest-posts-grid-view-script';
    if ( wp_script_is( $handle, 'enqueued' ) || wp_script_is( $handle, 'registered' ) ) {
        wp_localize_script($handle, 'LATEST_POSTS_GRID_VARS', [
            'graphqlEndpoint' => home_url('/graphql'),
        ]);
    }
});

add_action('enqueue_block_editor_assets', function () {
    wp_localize_script(
        'latest-posts-grid-editor-script',
        'LATEST_POSTS_GRID_VARS',
        [
            'graphqlEndpoint' => home_url('/graphql'),
        ]
    );
});

add_action('wp_enqueue_scripts', function () {
    wp_localize_script(
        'latest-posts-grid-view-script',
        'LATEST_POSTS_GRID_VARS',
        [
            'graphqlEndpoint' => home_url('/graphql'),
        ]
    );
});
