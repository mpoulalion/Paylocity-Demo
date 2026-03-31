/* eslint-disable */
/* global WebImporter */

/**
 * Hero Brand parser
 * Model fields: image (reference), imageAlt (text, collapsed - skip), text (richtext)
 * Source: #IMAGECONTAINER with ONE wordmark image; h1 headings and CTA buttons
 *         are in sibling containers outside #IMAGECONTAINER
 */
export default function parse(element, { document }) {
  // The element is #IMAGECONTAINER. The h1 and CTAs are in sibling
  // customcontainer elements under the same parent column.
  const scope = element.closest('.cmp-columns__column') || element.parentElement?.parentElement || element;

  // Row 1: image
  const imgEl = element.querySelector('.cmp-image__image, .cmp-image img');
  const imageFrag = document.createDocumentFragment();
  imageFrag.appendChild(document.createComment(' field:image '));
  if (imgEl) {
    const img = document.createElement('img');
    img.src = imgEl.src;
    img.alt = imgEl.alt || '';
    imageFrag.appendChild(img);
  }

  // Row 2: text (heading + CTAs)
  const textFrag = document.createDocumentFragment();
  textFrag.appendChild(document.createComment(' field:text '));

  // Get all h1 elements from sibling containers
  const headings = scope.querySelectorAll('h1');
  headings.forEach((h) => {
    const h1 = document.createElement('h1');
    h1.textContent = h.textContent.trim();
    textFrag.appendChild(h1);
  });

  // Get CTA buttons from sibling containers
  const ctas = scope.querySelectorAll('.cmp-button');
  ctas.forEach((cta) => {
    const p = document.createElement('p');
    const a = document.createElement('a');
    a.href = cta.href;
    a.textContent = cta.textContent.trim();
    p.appendChild(a);
    textFrag.appendChild(p);
  });

  const cells = [
    [imageFrag],
    [textFrag],
  ];

  const block = WebImporter.Blocks.createBlock(document, {
    name: 'Hero Brand',
    cells,
  });

  element.replaceWith(block);
}
