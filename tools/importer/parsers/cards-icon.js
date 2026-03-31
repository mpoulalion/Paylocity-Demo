/* eslint-disable */
/* global WebImporter */

/**
 * Cards Icon parser (container block)
 * Item model fields: image (reference), text (richtext)
 * Source: #flexgrid-cb8fcd2864 with .iconteaser items
 *         Each has: icon (.icon img), heading (.cmp-iconteaser__heading-title),
 *         description (.cmp-iconteaser__descripton p)
 */
export default function parse(element, { document }) {
  const iconteasers = element.querySelectorAll('.iconteaser');
  const rows = [];

  iconteasers.forEach((teaser) => {
    // Image column (icon)
    const imgEl = teaser.querySelector('.icon img');
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

    const headingEl = teaser.querySelector('.cmp-iconteaser__heading-title');
    if (headingEl) {
      const h3 = document.createElement('h3');
      h3.textContent = headingEl.textContent.trim();
      textFrag.appendChild(h3);
    }

    const descEl = teaser.querySelector('.cmp-iconteaser__descripton p');
    if (descEl) {
      const p = document.createElement('p');
      p.textContent = descEl.textContent.trim();
      textFrag.appendChild(p);
    }

    rows.push([imageFrag, textFrag]);
  });

  const block = WebImporter.Blocks.createBlock(document, {
    name: 'Cards Icon',
    cells: rows,
  });

  element.replaceWith(block);
}
