/* eslint-disable */
/* global WebImporter */

/**
 * Columns CTA parser
 * Columns blocks do NOT require field hints.
 * Source: .styleBGGraphite.styleLarge_withGutter:has(#text-68a3adcb0a) .columns
 *         Two-column layout:
 *         Left: H2 "Break Barriers, Drive Growth", paragraph, image
 *         Right: HubSpot form with heading "Complete the Form to Download"
 */
export default function parse(element, { document }) {
  const colEls = element.querySelectorAll('.cmp-columns__column');

  // Left column content
  const leftFrag = document.createDocumentFragment();

  const leftCol = colEls[0];
  if (leftCol) {
    const h2El = leftCol.querySelector('h2');
    if (h2El) {
      const h2 = document.createElement('h2');
      h2.textContent = h2El.textContent.trim();
      leftFrag.appendChild(h2);
    }

    const textEl = leftCol.querySelector('.cmp-text p');
    if (textEl) {
      const p = document.createElement('p');
      p.textContent = textEl.textContent.trim();
      leftFrag.appendChild(p);
    }

    const imgEl = leftCol.querySelector('.cmp-image img, .cmp-image__image');
    if (imgEl) {
      const img = document.createElement('img');
      img.src = imgEl.src;
      img.alt = imgEl.alt || '';
      leftFrag.appendChild(img);
    }
  }

  // Right column content
  const rightFrag = document.createDocumentFragment();

  const rightCol = colEls[1];
  if (rightCol) {
    // Extract form heading
    const formTitleEl = rightCol.querySelector('.hs_cmp_text_size--24, .hsfc-RichText b');
    if (formTitleEl) {
      const h3 = document.createElement('h3');
      h3.textContent = formTitleEl.textContent.trim();
      rightFrag.appendChild(h3);
    }

    // Add a form placeholder
    const p = document.createElement('p');
    p.textContent = '[Form placeholder]';
    rightFrag.appendChild(p);
  }

  const cells = [
    [leftFrag, rightFrag],
  ];

  const block = WebImporter.Blocks.createBlock(document, {
    name: 'Columns CTA',
    cells,
  });

  element.replaceWith(block);
}
