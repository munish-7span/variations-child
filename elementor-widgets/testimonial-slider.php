
<?php
use Elementor\Widget_Base;
use Elementor\Controls_Manager;

if (!defined('ABSPATH')) exit;

class Elementor_Testimonial_Widget extends Widget_Base {
    

    public function get_name() {
        return 'client_testimonial_testimonial';
    }

    public function get_title() {
        return __('Client Testimonial Slider', 'textdomain');
    }

    public function get_icon() {
        return 'eicon-slider-push';
    }

    public function get_categories() {
        return ['general'];
    }

    public function get_style_depends() {
        // External CDN styles (no filemtime on external URLs)
        wp_register_style(
            'testimonial-slick-slider',
            'https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.css',
            [],
            time(), // You can use a fixed version number like '1.8.1' if not debugging cache
            'all'
        );
    
        wp_register_style(
            'testimonial-slick-theme-slider',
            'https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick-theme.css',
            ['testimonial-slick-slider'], // Optional dependency
            time(),
            'all'
        );
    
        // Local CSS with file versioning
        wp_register_style(
            'testimonial-slider-widget-style',
            get_stylesheet_directory_uri() . '/elementor-widgets/assets/testimonial-slider.css',
            ['testimonial-slick-theme-slider'],
            filemtime(get_stylesheet_directory() . '/elementor-widgets/assets/testimonial-slider.css'),
            'all',
            false
        );
    
        return [
            'testimonial-slick-slider',
            'testimonial-slick-theme-slider',
            'testimonial-slider-widget-style',
        ];
    }
    

    public function get_script_depends() {
        wp_register_script(
            'testimonial-slick-script',
            'https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.min.js',
            ['jquery'],
            null,
            false
        );
    
        wp_register_script(
            'testimonial-slider-widget-script',
            get_stylesheet_directory_uri() . '/elementor-widgets/assets/testimonial-slider.js',
            ['testimonial-slick-script'],
            ['jquery'],
            null,
            false
        );
    
        return [
            'testimonial-slick-script',
            'testimonial-slider-widget-script',
        ];
    }
    

    protected function register_controls(): void {

        $this->start_controls_section(
            'section_content',
            [
                'label' => esc_html__('Content', 'textdomain'),
                'tab' => Controls_Manager::TAB_CONTENT,
            ]
        );

        $this->add_control(
            'client_list',
            [
                'label' => esc_html__('Client List', 'textdomain'),
                'type' => Controls_Manager::REPEATER,
                'fields' => [
                    [
                        'name' => 'client_image',
                        'label' => esc_html__('Company Logo', 'textdomain'),
                        'type' => Controls_Manager::MEDIA,
                        'default' => [
                            'url' => '',
                        ],
                        
                    ],
                    [
                        'name' => 'company_description',
                        'label' => esc_html__('Company Description', 'textdomain'),
                        'type' => Controls_Manager::TEXTAREA,
                        'placeholder' => esc_html__('This is an IT company', 'textdomain'),
                    ],
                    [
                        'name' => 'client_name',
                        'label' => esc_html__('Client Name', 'textdomain'),
                        'type' => Controls_Manager::TEXT,
                        'default' => esc_html__('Client Name', 'textdomain'),
                    ],
                    [
                        'name' => 'client_designation',
                        'label' => esc_html__('Designation', 'textdomain'),
                        'type' => Controls_Manager::TEXT,
                        'default' => esc_html__('CEO', 'textdomain'),
                    ],
                    
                ],
                'default' => [
                    [
                        'client_name' => 'John Doe',
                        'company_description' => 'This is an IT company',
                        'client_designation' => 'CEO at tcs',
                    ],
                    [
                        'client_name' => 'Jane Smith',
                        'company_description' => 'This is Marketing Company',
                        'client_designation' => 'Marketing Head at Hyperlink',
                    ],
                
                ],
                'title_field' => '{{{ client_name }}}',
            ]
        );

        $this->end_controls_section();
    }

    protected function render() {
        $settings = $this->get_settings_for_display();

        if (empty($settings['client_list'])) {
            return;
        }
        ?>
        <Section>
            <div class="container">
                <div class="slide-main">
                    <div class="slider slider-for">
                        <?php foreach ($settings['client_list'] as $item): ?>
                            <?php if (!empty($item['client_image']['url'])): ?>
                                <div class="slider-image_wrapper">
                                    <img src="<?php echo esc_url($item['client_image']['url']); ?>" alt="<?php echo esc_attr($item['client_name']); ?>" class="slider-image">
                                </div>
                            <?php endif; ?>
                        <?php endforeach;?>
                    </div>
                    <div class="slider slider-nav">
                        <?php foreach ($settings['client_list'] as $item): ?>
                            <div class="slider-content_wrapper">
                                <div class="slider-content">
                                    <?php if (!empty($item['company_description'])): ?>
                                        <p class="slider-content_text"><?php echo esc_html($item['company_description']); ?></p>
                                    <?php endif; ?>
                                    <div class="author">
                                        <?php if (!empty($item['client_name'])): ?>
                                            <h4><?php echo esc_html($item['client_name']); ?></h4>
                                        <?php endif; ?>
                                        <?php if (!empty($item['client_designation'])): ?>
                                            <div class="designation"><?php echo esc_html($item['client_designation']); ?></div>
                                        <?php endif; ?>
                                    </div>
                                </div>
                            </div>
                        <?php endforeach; ?>
                    </div>
                </div>
            </div>
	    </Section>
      
        <?php
    }

    protected function content_template() {
        ?>
        <Section>
            <div class="container">
                <div class="slide-main">
                    <div class="slider slider-for">
                        <# _.each(settings.client_list, function(item) { #> 
                            <# if (item.client_image && item.client_image.url) { #>
                                <div class="slider-image_wrapper">
                                    <img src="{{{ item.client_image.url }}}" alt="{{{ item.client_name }}}" class="slider-image">
                                </div>
                            <# } #>
                        <# }); #>
                    </div>
                    <div class="slider slider-nav">
                        <# _.each(settings.client_list, function(item) { #>        
                            <div class="slider-content_wrapper">
                                <div class="slider-content">
                                    <# if (item.company_description) { #>
                                        <p class="slider-content_text">{{{ item.company_description }}}</p>
                                    <# } #>
                                    <div class="author">
                                        <# if (item.client_name) { #>
                                            <h4>{{{ item.client_name }}}</h4>
                                        <# } #>
                    
                                        <# if (item.client_designation) { #>
                                            <div class="">{{{ item.client_designation }}}</div>
                                        <# } #>
                                    </div>
                                </div>
                            </div>
                        <# }); #>
                    </div>
                        
                </div>
            </div>
        </Section>
        <?php
    }
    
}
