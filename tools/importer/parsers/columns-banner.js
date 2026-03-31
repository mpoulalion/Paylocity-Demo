/* eslint-disable */
/* global WebImporter */

/**
 * Columns Banner parser
 * Columns blocks do NOT require field hints.
 * Source: .styleBGGraphite:has(#title-207e23e590) .columns
 *         Two-column layout:
 *         Left: H2 "Demo Our Unified Platform"
 *         Right: Email form with "Request a Demo" button
 */
export default function parse(element, { document }) {
  const colEls = element.querySelectorAll('.cmp-columns__column');

  // Left column content
  const leftFrag = document.createDocumentFragment();

  const leftCol = colEls[0];
  if (leftCol) {
    const h2El = leftCol.querySelector('h2, .cmp-title__text');
    if (h2El) {
      const h2 = document.createElement('h2');
      h2.textContent = h2El.textContent.trim();
      leftFrag.appendChild(h2);
    }
  }

  // Right column content
  const rightFrag = document.createDocumentFragment();

  const rightCol = colEls[1];
  if (rightCol) {
    // Extract email label
    const labelEl = rightCol.querySelector('.cmp-hubspot-modal_form-label, label');
    if (labelEl) {
      const p = document.createElement('p');
      p.textContent = labelEl.textContent.trim();
      rightFrag.appendChild(p);
    }

    // Add a form placeholder link for the demo request
    const formEl = rightCol.querySelector('.hubspot-forms, .cmp-hubspot-modal_form');
    if (formEl) {
      const p = document.createElement('p');
      const a = document.createElement('a');
      a.href = 'https://www.paylocity.com/request-a-demo/';
      a.textContent = 'Request a Demo';
      p.appendChild(a);
      rightFrag.appendChild(p);
    }
  }

  const cells = [
    [leftFrag, rightFrag],
  ];

  const block = WebImporter.Blocks.createBlock(document, {
    name: 'Columns Banner',
    cells,
  });

  element.replaceWith(block);
}
