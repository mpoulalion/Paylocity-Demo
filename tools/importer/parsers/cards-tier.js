/* eslint-disable */
/* global WebImporter */

/**
 * Cards Tier parser (container block)
 * Item model fields: image (reference), text (richtext)
 * Source: .cmp-columns.styleColumn1by3:has(#compsizesm) containing
 *         columns with image, heading, description, and link per card
 *         (Small Business, Midsize Business, Enterprise)
 */
export default function parse(element, { document }) {
  const columns = element.querySelectorAll(':scope > .parsys.cmp-columns__column, :scope > .cmp-columns__column');
  const rows = [];

  columns.forEach((col) => {
    const imgEl = col.querySelector('.cmp-image img, .cmp-image__image');
    const headingEl = col.querySelector('h4, h3, h2');
    const descEl = col.querySelector('.cmp-text p');
    const linkEl = col.querySelector('.cmp-button');

    // Image column
    const imageFrag = document.createDocumentFragment();
    imageFrag.appendChild(document.createComment(' field:image '));
    if (imgEl) {
      const img = document.createElement('img');
      img.src = imgEl.src;
      img.alt = imgEl.alt || '';
      imageFrag.appendChild(img);
    }

    // Text column
    const textFrag = document.createDocumentFragment();
    textFrag.appendChild(document.createComment(' field:text '));

    if (headingEl) {
      const h3 = document.createElement('h3');
      h3.textContent = headingEl.textContent.trim();
      textFrag.appendChild(h3);
    }

    if (descEl) {
      const p = document.createElement('p');
      p.textContent = descEl.textContent.trim();
      textFrag.appendChild(p);
    }

    if (linkEl) {
      const p = document.createElement('p');
      const a = document.createElement('a');
      a.href = linkEl.href;
      a.textContent = linkEl.textContent.trim();
      p.appendChild(a);
      textFrag.appendChild(p);
    }

    rows.push([imageFrag, textFrag]);
  });

  const block = WebImporter.Blocks.createBlock(document, {
    name: 'Cards Tier',
    cells: rows,
  });

  element.replaceWith(block);
}
