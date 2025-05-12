
(function (blocks, element, components, blockEditor) {
	const { registerBlockType } = blocks;
	const { createElement: el, Fragment } = element;
	const { Button, PanelBody, TextControl, ToggleControl, URLInput } = components;
	const {
		MediaUpload,
		useBlockProps,
		InspectorControls,
	} = blockEditor;

	registerBlockType('custom/mp-hero-slider', {
		title: 'Hero Slider',
		icon: 'slides',
		category: 'variation-child-category',
		supports: {
			align: ['left', 'center', 'right', 'wide', 'full'],
			multiple: false,
            color: {
				background: true,
				text: true,
				gradients: true,
				link: false,
				heading: true,
				enableContrastChecker: true,
			},
		},

		attributes: {
			repeaterItems: {
				type: 'array',
				default: [],
			}
		},

		edit: function (props) {
            const { attributes, setAttributes } = props;
            const { repeaterItems } = attributes;
            const { URLInput  } = blockEditor;
            const blockProps = useBlockProps({
                style: {
                    minHeight: '200px', // Force visible size
                }
            });

            // Add a new slide
            function addRepeaterItem() {
                setAttributes({
                    repeaterItems: [
                        ...repeaterItems,
                        {
                            background_image_url: '',
                            background_image_id: null,
                            heading: '',
                            title: '',
                            description: '',
                            buttonLabel: '',
                            buttonURL: '',
                        }
                    ]
                });
            }

            // Update a specific slide's field
            function updateRepeaterItem(index, field, value) {
                const newItems = [...repeaterItems];
                newItems[index][field] = value;
                setAttributes({ repeaterItems: newItems });
            }

            // Remove a slide
            function removeRepeaterItem(index) {
                const newItems = repeaterItems.filter((_, i) => i !== index);
                setAttributes({ repeaterItems: newItems });
            }

            function onSelectImage(media) {
                setAttributes({
                    imageURL: media.url,
                    imageID: media.id,
                });
            }

            return el(Fragment, null, [
                el('div', {
                    className: `'mp-hero-slider ${blockProps.className}`,
                    ...blockProps, 
                }, [

                    // Repeater Field inside the block
                    repeaterItems.map((item, index) =>
                        el('div', { className: `slide_${index + 1 }`, key: index  ,
                                    style: {
                                        backgroundImage: item.background_image_url ? `url(${item.background_image_url})` : 'none',
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center',
                                        padding: '50px',
                                        minHeight: '200px',
                                    },
                                },
                            [
                                el('div', {className: 'hero-slide-content'}, [
                                    item.heading && el(index === 0 ? 'h1' : 'h2', {}, item.heading),
                                    item.title && el('h3', {}, item.title),
                                    item.description && el('p', {}, item.description),
                                    item.buttonURL && item.buttonLabel && el('a', {
                                        href: item.buttonURL,
                                        className: 'mp-hero-button',
                                        style: {
                                            display: 'inline-block',
                                            background: '#000',
                                            color: '#fff',
                                            padding: '10px 20px',
                                            textDecoration: 'none',
                                            marginTop: '10px'
                                        }
                                    }, item.buttonLabel),
                                ]),
                            
                        ])
                    )

                ]),


                el(InspectorControls, { className: 'wp-hero-block-inspector'},
                    el(PanelBody, { title: 'Hero Slider Settings', initialOpen: true }, [
                        
                        repeaterItems.map((item, index) =>
                            el(Fragment, { key: index }, [
                                el('p', { style: { fontWeight: 'bold', marginBottom: '5px' } }, `SLIDE ${index + 1}`),

                                el(MediaUpload, {
                                    onSelect: (media) => updateRepeaterItem(index, 'background_image_url', media.url),
                                    allowedTypes: ['image'],
                                    value: item.background_image_id,
                                    render: ({ open }) => el(Fragment, null, [
                                        item.background_image_url &&
                                            el('img', {
                                                src: item.background_image_url,
                                                style: { width: '100%', marginBottom: '10px' },
                                            }),
                                        el(Button, {
                                            onClick: open,
                                            isSecondary: true,
                                            style: { margin: '10px 10px 10px 0' },
                                        }, item.background_image_url ? 'Change Image' : 'Select Image'),
                                        item.background_image_url &&
                                            el(Button, {
                                                onClick: () => updateRepeaterItem(index, 'background_image_url', ''),
                                                isDestructive: true,
                                                className: 'components-button is-destructive',
                                                style: { marginTop: '10px' },
                                            }, 'Remove Image')
                                    ])
                                }),

                                el(TextControl, {
                                    label: 'Heading',
                                    value: item.heading,
                                    onChange: (val) => updateRepeaterItem(index, 'heading', val),
                                    default: 'Heading'
                                }),
                                el(TextControl, {
                                    label: 'Title',
                                    value: item.title,
                                    onChange: (val) => updateRepeaterItem(index, 'title', val),
                                    default: 'title'
                                }),
                                el(TextControl, {
                                    label: 'Description',
                                    value: item.description,
                                    onChange: (val) => updateRepeaterItem(index, 'description', val),
                                    default: 'description',
                                }),
                                el(TextControl, {
                                    label: 'Button Label',
                                    value: item.buttonLabel,
                                    onChange: (val) => updateRepeaterItem(index, 'buttonLabel', val),
                                    default: 'View'
                                }),
                                el('div', {
                                    className: 'components-base-control cdc-c-f-ae-fa-qy3gpb',
                                }, [
                                    
                                    el(URLInput, {
                                        label : 'BUTTON URL',
                                        value: item.buttonURL,
                                        style: {minWidth: '230px'},
                                        onChange: (val) => updateRepeaterItem(index, 'buttonURL', val),
                                        placeholder: 'Enter Url',
                                    })
                                ])
                            ])
                        ),
                        el(Button, { onClick: addRepeaterItem, isPrimary: true }, 'Add Slide'),
                    ])
                )
            ]) 
        },


       save: function (props) {
        const { attributes } = props;
        const { repeaterItems } = attributes;

        return (
            wp.element.createElement('div', { className: 'mp-hero-slider' },
                repeaterItems.map((item, index) =>
                    wp.element.createElement('div', {
                        key: index,
                        className: `slide_${index + 1}`,
                        style: {
                            backgroundImage: item.background_image_url ? `url(${item.background_image_url})` : 'none',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            padding: '50px',
                        }
                    }, [
                        wp.element.createElement('div', { className: 'hero-slider-content' },[
                            // Render <h1> for first item, <h2> otherwise
                            item.heading && wp.element.createElement(index === 0 ? 'h1' : 'h2', {}, item.heading),
                            item.title && wp.element.createElement('h3', {}, item.title),
                            item.description && wp.element.createElement('p', {}, item.description),
                            item.buttonURL && item.buttonLabel &&
                            wp.element.createElement('a', {
                                href: item.buttonURL,
                                className: 'mp-hero-button',
                                style: {
                                    display: 'inline-block',
                                    background: '#000',
                                    color: '#fff',
                                    padding: '10px 20px',
                                    textDecoration: 'none',
                                    marginTop: '10px'
                                }
                            }, item.buttonLabel)
                        ])
                    ])
                )
            )
        );
    }


	});
})(
	window.wp.blocks,
	window.wp.element,
	window.wp.components,
	window.wp.blockEditor
);
