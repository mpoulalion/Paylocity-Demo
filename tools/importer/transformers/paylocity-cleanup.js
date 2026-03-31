/* eslint-disable */
/* global WebImporter */

const TransformHook = { beforeTransform: 'beforeTransform', afterTransform: 'afterTransform' };

export default function transform(hookName, element, payload) {
  if (hookName === TransformHook.beforeTransform) {
    // Before block parsing: remove cookie banners, overlays, tracking pixels
    WebImporter.DOMUtils.remove(element, [
      '#onetrust-consent-sdk',
      '[class*="optanon"]',
      '.ot-sdk-container',
      '.cookie-law-info-container',
      '[src*="counters.gif"]',
    ]);

    // Replace all <blockquote> elements with <p> elements
    const { document } = payload;
    element.querySelectorAll('blockquote').forEach((bq) => {
      const p = document.createElement('p');
      p.innerHTML = bq.innerHTML;
      bq.replaceWith(p);
    });
  }
  if (hookName === TransformHook.afterTransform) {
    // After block parsing: remove non-authorable global shell elements
    WebImporter.DOMUtils.remove(element, [
      'header.cmp-meganav',
      'header',
      'footer',
      'nav.cmp-navbar',
      '.experiencefragment',
      'iframe',
      'link',
      'noscript',
    ]);
  }
}
