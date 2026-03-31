/* eslint-disable */
/* global WebImporter */

/**
 * Cards Resource parser (container block)
 * Item model fields: image (reference), text (richtext)
 * Source: .relatedresources .resources-module with .resource-item-card items
 *         Each card has: image (img.img-fluid), category (.cmp-categories span),
 *         title/link (a.stretched-link), date (.resource-date)
 */
export default function parse(element, { document }) {
  const cards = element.querySelectorAll('.resource-item-card');
  const rows = [];

  cards.forEach((card) => {
    // Image column
    const imgEl = card.querySelector('img.img-fluid');
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

    // Category tag
    const categoryEl = card.querySelector('.cmp-categories span');
    if (categoryEl) {
      const p = document.createElement('p');
      const em = document.createElement('em');
      em.textContent = categoryEl.textContent.trim();
      p.appendChild(em);
      textFrag.appendChild(p);
    }

    // Title with link
    const linkEl = card.querySelector('a.stretched-link');
    if (linkEl) {
      const h3 = document.createElement('h3');
      const a = document.createElement('a');
      a.href = linkEl.href;
      a.textContent = linkEl.textContent.trim();
      h3.appendChild(a);
      textFrag.appendChild(h3);
    }

    // Date
    const dateEl = card.querySelector('.resource-date');
    if (dateEl) {
      const p = document.createElement('p');
      p.textContent = dateEl.textContent.trim();
      textFrag.appendChild(p);
    }

    rows.push([imageFrag, textFrag]);
  });

  const block = WebImporter.Blocks.createBlock(document, {
    name: 'Cards Resource',
    cells: rows,
  });

  element.replaceWith(block);
}
