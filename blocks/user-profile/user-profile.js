( function( blocks, element, components, blockEditor ) {
	const { registerBlockType } = blocks;
	const { createElement: el } = element;
	const { Button } = components;
	const { MediaUpload, RichText, PlainText, useBlockProps, InspectorControls } = blockEditor;
	const { PanelBody, TextControl } = components;

	registerBlockType( 'custom/my-block', {
		title: 'User Profile',
		icon: 'format-image',
		category: 'common',
		supports: {
			align: [ 'left', 'center', 'right', 'wide', 'full' ],
			anchor: true,
			html: false,
			multiple: false,
			dimensions: {
				aspectRatio: true,
				minHeight: true
			},
			color: {
				background: true,
				text: true,
				gradients: true,
				link: true,
				heading: true,
				enableContrastChecker: true,
			},
			background: {
				backgroundImage: true,
				backgroundSize: true,
			},
			__experimentalBorder: {
				color: true,
				radius: true,
				style: true,
				width: true
			},
			shadow: true,
			typography: {
				fontSize: true,
				lineHeight: true,
				letterSpacing: true,
				appearance: true, 
				textTransform: true,
				textDecoration: true
			},
			spacing: {
				margin: true,
				padding: true,
				blockGap: true,
				units: [ 'px', '%', 'em', 'rem' ]
			},
			renaming: true
		},
		attributes: {
			content: { type: 'string' },
			username: { type: 'string' },
			heading: { type: 'string' },
			imageURL: { type: 'string' },
			imageID: { type: 'number' },
			repeaterItems: {
				type: 'array',
				default: []
			},
		},
        example: {
            content: 'Enter profile description',
            username: 'Munish Prajapati',
            heading: 'Section Title',
            imageURL: 'https://example.com/default-image.jpg', // Optional: Add a default image URL
            repeaterItems: [{ text: 'Example Repeater Item 1' }, { text: 'Example Repeater Item 2' }]
        },
        

		edit: function (props) {
            const { attributes, setAttributes } = props;
            const { heading, imageURL, username, content, repeaterItems } = attributes;
            const blockProps = useBlockProps();
            const { createElement: el, Fragment } = element;

            function onSelectImage(media) {
                setAttributes({
                    imageURL: media.url,
                    imageID: media.id,
                });
            }

            // Function to add an item to the repeater field
            function addRepeaterItem() {
                const newItems = [...repeaterItems, { text: '' }];
                setAttributes({ repeaterItems: newItems });
            }

            // Function to remove an item from the repeater field
            function removeRepeaterItem(index) {
                const newItems = repeaterItems.filter((_, idx) => idx !== index);
                setAttributes({ repeaterItems: newItems });
            }

            // Function to update the content of a specific repeater item
            function updateRepeaterItem(index, newText) {
                const updatedItems = [...repeaterItems];
                updatedItems[index].text = newText;
                setAttributes({ repeaterItems: updatedItems });
            }
        
            return el(Fragment, null, [
                el('div', blockProps, [
                    el('h1', {}, heading),
                    
                    imageURL && el('img', {
                        src: imageURL,
                        style: { maxWidth: '100%', height: 'auto' }
                    }),
                    
                    el('h2', {}, username),
                    el('p', {}, content),

                    // Repeater Field inside the block
                    el('div', { className: 'repeater-items' }, 
                        repeaterItems.map((item, index) => (
                            el('div', { className: 'repeater-item', key: index }, [
                                el(TextControl, {
                                    label: `Repeater Item ${index + 1}`,
                                    value: item.text,
                                    onChange: (newText) => updateRepeaterItem(index, newText)
                                }),
                                el(Button, {
                                    onClick: () => removeRepeaterItem(index),
                                    isDestructive: true,
                                }, 'Remove Item')
                            ])
                        ))
                    ),
                    el(Button, { onClick: addRepeaterItem }, 'Add Repeater Item')
                ]),

                el(InspectorControls, null,
                    el(PanelBody, { title: 'User Profile Settings', initialOpen: true }, [
                        el(MediaUpload, {
                            label : 'Select Product Image',
                            onSelect: onSelectImage,
                            allowedTypes: ['image'],
                            value: attributes.imageID,
                            render: function (obj) {
                                return el(Fragment, null, [
                                    imageURL &&
                                        el('img', {
                                            src: imageURL,
                                            style: { width: '100%', marginBottom: '10px' },
                                        }),
                                    el(Button, {
                                        onClick: obj.open,
                                        isSecondary: true,
                                        style: { margin: '10px 10px 10px 0' },
                                    }, imageURL ? 'Change Image' : 'Select Image'),
                                    imageURL &&
                                        el(Button, {
                                            onClick: () => {
                                                setAttributes({ imageURL: '', imageID: null });
                                            },
                                            isDestructive: true,
                                            style: { margin: '10px 0px', border:'1px solid #f00' },
                                        }, 'Remove Image')
                                ]);
                            }
                        }),

                        el(TextControl, {
                            label: 'Username',
                            value: username,
                            onChange: function (newUsername) {
                                setAttributes({ username: newUsername });
                            },
                            placeholder: 'Enter Username'
                        }),
                        el(TextControl, {
                            label: 'Heading',
                            value: heading,
                            onChange: function (newHeading) {
                                setAttributes({ heading: newHeading });
                            }
                        }),
                        el(TextControl, {
                            label: 'Content',
                            value: content,
                            onChange: function (newContent) {
                                setAttributes({ content: newContent });
                            },
                            placeholder: 'Enter content...'
                        }),

                        // Repeater Control in InspectorControls (for advanced settings)
                        el(PanelBody, { title: 'Repeater Field Settings', initialOpen: false }, [
                            el(Button, { onClick: addRepeaterItem }, 'Add New Repeater Item'),
                            repeaterItems.length > 0 && el('ul', {}, repeaterItems.map((item, index) => (
                                el('li', { key: index }, [
                                    el(TextControl, {
                                        label: `Repeater Item ${index + 1}`,
                                        value: item.text,
                                        onChange: (newText) => updateRepeaterItem(index, newText)
                                    }),
                                    el(Button, {
                                        onClick: () => removeRepeaterItem(index),
                                        isDestructive: true,
                                    }, 'Remove')
                                ])
                            )))
                        ])
                    ])
                )
            ]);
        },

		save: function( props ) {
            const { username, heading, content, imageURL, repeaterItems } = props.attributes;
            const blockProps = useBlockProps.save();

            return el('div', blockProps, [
                heading && el('h1', { className: 'section-heading' }, heading),
                imageURL && el('img', { src: imageURL, alt: '', style: { maxWidth: '100%', height: 'auto' }, className: 'profile-image' }),
                username && el('h2', { className: 'profile-username' }, username),
                content && el('p', { className: 'profile-description' }, content),

                // Render repeater items
                repeaterItems.length > 0 && el('div', { className: 'repeater-items' }, 
                    repeaterItems.map((item, index) => (
                        el('div', { className: 'repeater-item', key: index }, el('p', {}, item.text))
                    ))
                ),
            ]);
        }       
	} );
})(
	window.wp.blocks,
	window.wp.element,
	window.wp.components,
	window.wp.blockEditor,
);
    