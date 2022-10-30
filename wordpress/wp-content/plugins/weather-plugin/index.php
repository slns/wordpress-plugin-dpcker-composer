<?php
   /**
    * Plugin Name: Weather-Plugin
    * Plugin URI: https://my-awesomeness-emporium.com
    * description: A plugin to get weather
    * Version: 1.0.0
    * Author: <Sérgio Santos sergiolns75@gmail.com>
    * Author URI: https://mrtotallyawesome.com
    * License: GPL2
    */


    add_shortcode('weather-plugin', 'weatherFunction');
    wp_enqueue_script('jQuery', 'https://code.jquery.com/jquery-3.6.1.min.js');
    wp_enqueue_script('vue', 'https://cdn.jsdelivr.net/npm/vue/dist/vue.js');
    wp_enqueue_script('pooper', 'https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.6/dist/umd/popper.min.js');
    wp_enqueue_script('bootstrapJS', 'https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/js/bootstrap.min.js');
    wp_enqueue_style('bootstrap','https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/css/bootstrap.min.css');
    wp_enqueue_style('bootstrapIcons','https://cdn.jsdelivr.net/npm/bootstrap-icons@1.9.1/font/bootstrap-icons.css');

    function weatherFunction() {
        $blogName = get_bloginfo('name');

        if (!defined("REST_REQUEST")) {
            echo(
                "<div id='appvue'>
                    <weather-plugin author='". $blogName ."'/>
                </div>" 
            );
        }
        

        wp_enqueue_script('app', plugin_dir_url(__FILE__).'app.js');
        wp_enqueue_style('weatherCss',plugin_dir_url(__FILE__).'weather.css');

    }
?>

