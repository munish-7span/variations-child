(function (blocks, element, components, blockEditor) {
	const { registerBlockType } = blocks;
	const { createElement: el, Fragment } = element;
	const { useBlockProps, InspectorControls, MediaUpload, MediaUploadCheck } = blockEditor;
	const { PanelBody, RadioControl, TextControl, Button } = components;

	registerBlockType('custom/mp-marquee-slider', {
		title: 'Marquee Slider',
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
			marqueeData: { type: 'string', default: '' },
			heading: { type: 'string', default: '' },
			ListItems: { type: 'array', default: [] },
			GalleryImages: { type: 'array', default: [] },
		},

		edit: function (props) {
			const { attributes, setAttributes } = props;
			const { marqueeData, heading, ListItems, GalleryImages } = attributes;
			const blockProps = useBlockProps({ className: 'mp-marquee-slider' });

			// Add a new list item
			const addListItem = () => {
				setAttributes({ ListItems: [...ListItems, ''] });
			};

			// Update a specific list item
			const updateListItem = (value, index) => {
				const updated = [...ListItems];
				updated[index] = value;
				setAttributes({ ListItems: updated });
			};

			// Handle gallery selection
			const onSelectImages = (images) => {
				setAttributes({ GalleryImages: images.map(img => ({ id: img.id, url: img.url })) });
			};

			return el(Fragment, {
				style: {
					minHeight: '200px',
				}
			}, [
				el('div', blockProps,
					el('h4', {}, 'Marquee Slider'),
					el('div', { className: 'mp-marquee-slider' },
						marqueeData === 'heading' && el('h2', {}, heading),
						marqueeData === 'list' && el('ul', {},
							ListItems.map((item, index) => el('li', { key: index }, item))
						),
						marqueeData === 'image' && el('div', { className: 'marquee-gallery' },
							GalleryImages.map((img, i) =>
								el('img', {
									key: i,
									src: img.url,
									style: { width: '100px', height: 'auto', marginRight: '10px' }
								})
							)
						)
					)
				),

				el(InspectorControls, {},
					el(PanelBody, { title: 'Marquee Settings', initialOpen: true }, [
						el(RadioControl, {
							label: 'Select Marquee Type',
							selected: marqueeData,
							options: [
								{ label: 'Heading', value: 'heading' },
								{ label: 'List', value: 'list' },
								{ label: 'Image Gallery', value: 'image' }
							],
							onChange: (newType) => setAttributes({ marqueeData: newType })
						}),

						// Heading field
						marqueeData === 'heading' && el(TextControl, {
							label: 'Heading Text',
							value: heading,
							onChange: (val) => setAttributes({ heading: val })
						}),

						// List field
						marqueeData === 'list' && el(Fragment, null, [
							ListItems.map((item, index) =>
								el(TextControl, {
									key: index,
									label: `Item ${index + 1}`,
									value: item,
									onChange: (val) => updateListItem(val, index)
								})
							),
							el(Button, {
								isPrimary: true,
								onClick: addListItem,
								style: { margin: '10px 0px' }
							}, 'Add List Item')
						]),

						// Gallery field
						marqueeData === 'image' && el(Fragment, null, [
							el(MediaUploadCheck, {}, 
								el(MediaUpload, {
									onSelect: onSelectImages,
									allowedTypes: ['image'],
									multiple: true,
									gallery: true,
									value: GalleryImages.map(img => img.id),
									render: ({ open }) => el(Button, { onClick: open, isSecondary: true }, 'Select Images')
								})
							),
							GalleryImages.length > 0 &&
								el('div', { style: { display: 'flex', gap: '10px', flexWrap: 'wrap', marginTop: '10px' } },
									GalleryImages.map((img, i) =>
										el('img', {
											key: i,
											src: img.url,
											style: { width: '80px', height: 'auto', objectFit: 'cover' }
										})
									)
								)
						]),
					])
				)
			]);
		},

		save: function (props) {
			const { attributes } = props;
			const { marqueeData, heading, ListItems, GalleryImages } = attributes;

			// Build the content once so it can be reused
			const content = [
				marqueeData === 'heading' && el('h4', {}, heading),
				marqueeData === 'list' && el('ul', { className: 'marquee-list-item'},
					ListItems.map((item, index) => el('li', { className: 'list-item', key: index }, item)),
					ListItems.map((item, index) => el('li', { className: 'list-item', key: index }, item)),
					ListItems.map((item, index) => el('li', { className: 'list-item', key: index }, item))
				),
				marqueeData === 'image' && el('div', { className: 'marquee-gallery' },
					GalleryImages.map((img, i) =>
						el('div', { className: 'marquee-qallery-item'}, [
							el('img', {
								key: i,
								src: img.url,
								
							})
						])
					),
					
					GalleryImages.map((img, i) =>
						el('div', { className: 'marquee-qallery-item'}, [
							el('img', {
								key: i,
								src: img.url,
								
							})
						])
					),
					
					GalleryImages.map((img, i) =>
						el('div', { className: 'marquee-qallery-item'}, [
							el('img', {
								key: i,
								src: img.url,
								
							})
						])
					),
					
				)
			];

			return el('div', { className: 'mp-marquee-slider' }, [
				el('div', { className: 'marquee-track' }, content),
				// el('div', { className: 'marquee-track' }, content),
				// el('div', { className: 'marquee-track' }, content),
			]);
		}

	});
})(
	window.wp.blocks,
	window.wp.element,
	window.wp.components,
	window.wp.blockEditor
);
