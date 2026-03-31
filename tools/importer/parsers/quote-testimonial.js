/* eslint-disable */
/* global WebImporter */

/**
 * Quote Testimonial parser
 * Model fields: quotation (richtext), attribution (richtext)
 * Source: #carousel-a92e2de4a6 .carousel-item.active .cmp-quote
 *         Quote text in .cmp-text__paragraph, attribution in cite
 */
export default function parse(element, { document }) {
  // Row 1: quotation
  const quoteFrag = document.createDocumentFragment();
  quoteFrag.appendChild(document.createComment(' field:quotation '));

  const quoteEl = element.querySelector('.cmp-text__paragraph');
  if (quoteEl) {
    const p = document.createElement('p');
    p.textContent = quoteEl.textContent.trim();
    quoteFrag.appendChild(p);
  }

  // Row 2: attribution
  const attrFrag = document.createDocumentFragment();
  attrFrag.appendChild(document.createComment(' field:attribution '));

  const citeEl = element.querySelector('cite');
  if (citeEl) {
    const p = document.createElement('p');
    p.textContent = citeEl.textContent.trim();
    attrFrag.appendChild(p);
  }

  const cells = [
    [quoteFrag],
    [attrFrag],
  ];

  const block = WebImporter.Blocks.createBlock(document, {
    name: 'Quote Testimonial',
    cells,
  });

  element.replaceWith(block);
}
