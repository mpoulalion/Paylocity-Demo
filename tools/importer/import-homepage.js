/* eslint-disable */
/* global WebImporter */

// PARSER IMPORTS
import heroBrandParser from './parsers/hero-brand.js';
import cardsProductParser from './parsers/cards-product.js';
import cardsTierParser from './parsers/cards-tier.js';
import cardsIconParser from './parsers/cards-icon.js';
import cardsResourceParser from './parsers/cards-resource.js';
import quoteTestimonialParser from './parsers/quote-testimonial.js';
import formParser from './parsers/form.js';
import columnsCtaParser from './parsers/columns-cta.js';
import columnsBannerParser from './parsers/columns-banner.js';

// TRANSFORMER IMPORTS
import paylocityCleanupTransformer from './transformers/paylocity-cleanup.js';
import paylocitySectionsTransformer from './transformers/paylocity-sections.js';

// PARSER REGISTRY
const parsers = {
  'hero-brand': heroBrandParser,
  'cards-product': cardsProductParser,
  'cards-tier': cardsTierParser,
  'cards-icon': cardsIconParser,
  'cards-resource': cardsResourceParser,
  'quote-testimonial': quoteTestimonialParser,
  'form': formParser,
  'columns-cta': columnsCtaParser,
  'columns-banner': columnsBannerParser,
};

// TRANSFORMER REGISTRY
const transformers = [
  paylocityCleanupTransformer,
  paylocitySectionsTransformer,
];

// PAGE TEMPLATE CONFIGURATION
const PAGE_TEMPLATE = {
  name: 'homepage',
  description: 'Paylocity main homepage with hero, product features, testimonials, and calls-to-action',
  urls: [
    'https://www.paylocity.com/'
  ],
  blocks: [
    {
      name: 'hero-brand',
      instances: ['#IMAGECONTAINER']
    },
    {
      name: 'cards-product',
      instances: ['.cmp-columns.styleColumn1by3:has(#compsizesm)']
    },
    {
      name: 'quote-testimonial',
      instances: ['#carousel-a92e2de4a6 .carousel-item.active .cmp-quote']
    },
    {
      name: 'cards-tier',
      instances: ['.cmp-columns.styleColumn1by3:has(#compsizesm)']
    },
    {
      name: 'cards-icon',
      instances: ['#flexgrid-cb8fcd2864']
    },
    {
      name: 'form',
      instances: ['.hubspot-forms:has(.hs_cmp_text_size--24)']
    },
    {
      name: 'cards-resource',
      instances: ['.relatedresources .resources-module']
    },
    {
      name: 'columns-cta',
      instances: ['.styleBGGraphite.styleLarge_withGutter:has(#text-68a3adcb0a) .columns']
    },
    {
      name: 'columns-banner',
      instances: ['.styleBGGraphite:has(#title-207e23e590) .columns']
    }
  ],
  sections: [
    {
      id: 'section-1',
      name: 'Hero',
      selector: '#container-50d3be983e',
      style: null,
      blocks: ['hero-brand', 'cards-product'],
      defaultContent: ['#cmp-custom-container-07ea72ace9 h1', '#cmp-custom-container-84d1e7f821 .cmp-cta']
    },
    {
      id: 'section-2',
      name: 'Company Sizes',
      selector: '.styleLarge:has(#cmp-custom-container-72839d8ed1)',
      style: null,
      blocks: ['cards-tier'],
      defaultContent: ['#title-8ee1bb116a h2']
    },
    {
      id: 'section-3',
      name: 'Testimonial',
      selector: '.carousel.panelcontainer.carousel--dots-arrows',
      style: null,
      blocks: ['quote-testimonial'],
      defaultContent: []
    },
    {
      id: 'section-4',
      name: 'Ultimate Platform',
      selector: '#container-4458489ffb',
      style: null,
      blocks: [],
      defaultContent: ['.text-danger', '#text-ed1c31b76e', '#image-e78b3bbd83 img', '.cmp-cta--primary']
    },
    {
      id: 'section-5',
      name: 'Differentiators',
      selector: '#container-02ad29b071',
      style: null,
      blocks: ['cards-icon'],
      defaultContent: ['#title-fc34906906 h2']
    },
    {
      id: 'section-6',
      name: 'Demo Form',
      selector: '.hubspot-forms:has(.hs_cmp_text_size--24)',
      style: 'grey',
      blocks: ['form'],
      defaultContent: []
    },
    {
      id: 'section-7',
      name: 'Awards',
      selector: '#container-42be76b93a',
      style: null,
      blocks: [],
      defaultContent: ['#title-bb9ea172c5 h2', '.cmp-imagegallery', '.cmp-cta--secondary']
    },
    {
      id: 'section-8',
      name: 'Break Barriers CTA',
      selector: '.styleBGGraphite.styleLarge_withGutter:has(#text-68a3adcb0a)',
      style: 'dark',
      blocks: ['columns-cta'],
      defaultContent: []
    },
    {
      id: 'section-9',
      name: 'Featured Resources',
      selector: '#container-3aeafd5ec2',
      style: null,
      blocks: ['cards-resource'],
      defaultContent: ['#title-ba7fcb6444 h2']
    },
    {
      id: 'section-10',
      name: 'Demo CTA Banner',
      selector: '.styleBGGraphite:has(#title-207e23e590)',
      style: 'dark',
      blocks: ['columns-banner'],
      defaultContent: []
    }
  ]
};

/**
 * Execute all page transformers for a specific hook
 * @param {string} hookName - The hook name ('beforeTransform' or 'afterTransform')
 * @param {Element} element - The DOM element to transform
 * @param {Object} payload - The payload containing { document, url, html, params }
 */
function executeTransformers(hookName, element, payload) {
  const enhancedPayload = {
    ...payload,
    template: PAGE_TEMPLATE
  };

  transformers.forEach((transformerFn) => {
    try {
      transformerFn.call(null, hookName, element, enhancedPayload);
    } catch (e) {
      console.error(`Transformer failed at ${hookName}:`, e);
    }
  });
}

/**
 * Find all blocks on the page based on the embedded template configuration
 * @param {Document} document - The DOM document
 * @param {Object} template - The embedded PAGE_TEMPLATE object
 * @returns {Array} Array of block instances found on the page
 */
function findBlocksOnPage(document, template) {
  const pageBlocks = [];

  template.blocks.forEach((blockDef) => {
    blockDef.instances.forEach((selector) => {
      const elements = document.querySelectorAll(selector);
      if (elements.length === 0) {
        console.warn(`Block "${blockDef.name}" selector not found: ${selector}`);
      }
      elements.forEach((element) => {
        pageBlocks.push({
          name: blockDef.name,
          selector,
          element,
          section: blockDef.section || null,
        });
      });
    });
  });

  console.log(`Found ${pageBlocks.length} block instances on page`);
  return pageBlocks;
}

// EXPORT DEFAULT CONFIGURATION
export default {
  /**
   * Main transformation function using the transform() pattern
   */
  transform: (payload) => {
    const { document, url, html, params } = payload;

    const main = document.body;

    // 1. Execute beforeTransform transformers (initial cleanup)
    executeTransformers('beforeTransform', main, payload);

    // 2. Find blocks on page using embedded template
    const pageBlocks = findBlocksOnPage(document, PAGE_TEMPLATE);

    // 3. Parse each block using registered parsers
    pageBlocks.forEach((block) => {
      const parser = parsers[block.name];
      if (parser) {
        try {
          parser(block.element, { document, url, params });
        } catch (e) {
          console.error(`Failed to parse ${block.name} (${block.selector}):`, e);
        }
      } else {
        console.warn(`No parser found for block: ${block.name}`);
      }
    });

    // 4. Execute afterTransform transformers (final cleanup + section breaks/metadata)
    executeTransformers('afterTransform', main, payload);

    // 5. Apply WebImporter built-in rules
    const hr = document.createElement('hr');
    main.appendChild(hr);
    WebImporter.rules.createMetadata(main, document);
    WebImporter.rules.transformBackgroundImages(main, document);
    WebImporter.rules.adjustImageUrls(main, url, params.originalURL);

    // 6. Generate sanitized path
    const path = WebImporter.FileUtils.sanitizePath(
      new URL(params.originalURL).pathname.replace(/\/$/, '').replace(/\.html$/, '')
    );

    return [{
      element: main,
      path: path || '/index',
      report: {
        title: document.title,
        template: PAGE_TEMPLATE.name,
        blocks: pageBlocks.map((b) => b.name),
      }
    }];
  }
};
