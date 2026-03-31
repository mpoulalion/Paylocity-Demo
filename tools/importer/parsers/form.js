/* eslint-disable */
/* global WebImporter */

/**
 * Form parser
 * Model fields: reference (aem-content), action (text)
 * Source: .hubspot-forms:has(.hs_cmp_text_size--24) with HubSpot embedded form
 *         Extracts the form title and creates a form block placeholder
 */
export default function parse(element, { document }) {
  // Row 1: reference (form reference placeholder)
  const refFrag = document.createDocumentFragment();
  refFrag.appendChild(document.createComment(' field:reference '));

  // Extract the form title from the HubSpot rich text heading
  const titleEl = element.querySelector('.hs_cmp_text_size--24');
  if (titleEl) {
    const p = document.createElement('p');
    p.textContent = titleEl.textContent.trim();
    refFrag.appendChild(p);
  }

  // Row 2: action (form action URL placeholder)
  const actionFrag = document.createDocumentFragment();
  actionFrag.appendChild(document.createComment(' field:action '));

  const formEl = element.querySelector('form.hsfc-Form, form');
  if (formEl && formEl.action) {
    const p = document.createElement('p');
    p.textContent = formEl.action;
    actionFrag.appendChild(p);
  }

  const cells = [
    [refFrag],
    [actionFrag],
  ];

  const block = WebImporter.Blocks.createBlock(document, {
    name: 'Form',
    cells,
  });

  element.replaceWith(block);
}
