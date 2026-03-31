var CustomImportScript = (() => {
  var __defProp = Object.defineProperty;
  var __defProps = Object.defineProperties;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getOwnPropSymbols = Object.getOwnPropertySymbols;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __propIsEnum = Object.prototype.propertyIsEnumerable;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __spreadValues = (a, b) => {
    for (var prop in b || (b = {}))
      if (__hasOwnProp.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    if (__getOwnPropSymbols)
      for (var prop of __getOwnPropSymbols(b)) {
        if (__propIsEnum.call(b, prop))
          __defNormalProp(a, prop, b[prop]);
      }
    return a;
  };
  var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // tools/importer/import-homepage.js
  var import_homepage_exports = {};
  __export(import_homepage_exports, {
    default: () => import_homepage_default
  });

  // tools/importer/parsers/hero-brand.js
  function parse(element, { document }) {
    var _a;
    const scope = element.closest(".cmp-columns__column") || ((_a = element.parentElement) == null ? void 0 : _a.parentElement) || element;
    const imgEl = element.querySelector(".cmp-image__image, .cmp-image img");
    const imageFrag = document.createDocumentFragment();
    imageFrag.appendChild(document.createComment(" field:image "));
    if (imgEl) {
      const img = document.createElement("img");
      img.src = imgEl.src;
      img.alt = imgEl.alt || "";
      imageFrag.appendChild(img);
    }
    const textFrag = document.createDocumentFragment();
    textFrag.appendChild(document.createComment(" field:text "));
    const headings = scope.querySelectorAll("h1");
    headings.forEach((h) => {
      const h1 = document.createElement("h1");
      h1.textContent = h.textContent.trim();
      textFrag.appendChild(h1);
    });
    const ctas = scope.querySelectorAll(".cmp-button");
    ctas.forEach((cta) => {
      const p = document.createElement("p");
      const a = document.createElement("a");
      a.href = cta.href;
      a.textContent = cta.textContent.trim();
      p.appendChild(a);
      textFrag.appendChild(p);
    });
    const cells = [
      [imageFrag],
      [textFrag]
    ];
    const block = WebImporter.Blocks.createBlock(document, {
      name: "Hero Brand",
      cells
    });
    element.replaceWith(block);
  }

  // tools/importer/parsers/cards-product.js
  function parse2(element, { document }) {
    const columns = element.querySelectorAll(":scope > .parsys.cmp-columns__column, :scope > .cmp-columns__column");
    const rows = [];
    columns.forEach((col) => {
      const imgEl = col.querySelector(".cmp-image img, .cmp-image__image");
      const headingEl = col.querySelector("h4, h3, h2");
      const descEl = col.querySelector(".cmp-text p");
      const linkEl = col.querySelector(".cmp-button");
      const imageFrag = document.createDocumentFragment();
      imageFrag.appendChild(document.createComment(" field:image "));
      if (imgEl) {
        const img = document.createElement("img");
        img.src = imgEl.src;
        img.alt = imgEl.alt || "";
        imageFrag.appendChild(img);
      }
      const textFrag = document.createDocumentFragment();
      textFrag.appendChild(document.createComment(" field:text "));
      if (headingEl) {
        const h3 = document.createElement("h3");
        h3.textContent = headingEl.textContent.trim();
        textFrag.appendChild(h3);
      }
      if (descEl) {
        const p = document.createElement("p");
        p.textContent = descEl.textContent.trim();
        textFrag.appendChild(p);
      }
      if (linkEl) {
        const p = document.createElement("p");
        const a = document.createElement("a");
        a.href = linkEl.href;
        a.textContent = linkEl.textContent.trim();
        p.appendChild(a);
        textFrag.appendChild(p);
      }
      rows.push([imageFrag, textFrag]);
    });
    const block = WebImporter.Blocks.createBlock(document, {
      name: "Cards Product",
      cells: rows
    });
    element.replaceWith(block);
  }

  // tools/importer/parsers/cards-tier.js
  function parse3(element, { document }) {
    const columns = element.querySelectorAll(":scope > .parsys.cmp-columns__column, :scope > .cmp-columns__column");
    const rows = [];
    columns.forEach((col) => {
      const imgEl = col.querySelector(".cmp-image img, .cmp-image__image");
      const headingEl = col.querySelector("h4, h3, h2");
      const descEl = col.querySelector(".cmp-text p");
      const linkEl = col.querySelector(".cmp-button");
      const imageFrag = document.createDocumentFragment();
      imageFrag.appendChild(document.createComment(" field:image "));
      if (imgEl) {
        const img = document.createElement("img");
        img.src = imgEl.src;
        img.alt = imgEl.alt || "";
        imageFrag.appendChild(img);
      }
      const textFrag = document.createDocumentFragment();
      textFrag.appendChild(document.createComment(" field:text "));
      if (headingEl) {
        const h3 = document.createElement("h3");
        h3.textContent = headingEl.textContent.trim();
        textFrag.appendChild(h3);
      }
      if (descEl) {
        const p = document.createElement("p");
        p.textContent = descEl.textContent.trim();
        textFrag.appendChild(p);
      }
      if (linkEl) {
        const p = document.createElement("p");
        const a = document.createElement("a");
        a.href = linkEl.href;
        a.textContent = linkEl.textContent.trim();
        p.appendChild(a);
        textFrag.appendChild(p);
      }
      rows.push([imageFrag, textFrag]);
    });
    const block = WebImporter.Blocks.createBlock(document, {
      name: "Cards Tier",
      cells: rows
    });
    element.replaceWith(block);
  }

  // tools/importer/parsers/cards-icon.js
  function parse4(element, { document }) {
    const iconteasers = element.querySelectorAll(".iconteaser");
    const rows = [];
    iconteasers.forEach((teaser) => {
      const imgEl = teaser.querySelector(".icon img");
      const imageFrag = document.createDocumentFragment();
      imageFrag.appendChild(document.createComment(" field:image "));
      if (imgEl) {
        const img = document.createElement("img");
        img.src = imgEl.src;
        img.alt = imgEl.alt || "";
        imageFrag.appendChild(img);
      }
      const textFrag = document.createDocumentFragment();
      textFrag.appendChild(document.createComment(" field:text "));
      const headingEl = teaser.querySelector(".cmp-iconteaser__heading-title");
      if (headingEl) {
        const h3 = document.createElement("h3");
        h3.textContent = headingEl.textContent.trim();
        textFrag.appendChild(h3);
      }
      const descEl = teaser.querySelector(".cmp-iconteaser__descripton p");
      if (descEl) {
        const p = document.createElement("p");
        p.textContent = descEl.textContent.trim();
        textFrag.appendChild(p);
      }
      rows.push([imageFrag, textFrag]);
    });
    const block = WebImporter.Blocks.createBlock(document, {
      name: "Cards Icon",
      cells: rows
    });
    element.replaceWith(block);
  }

  // tools/importer/parsers/cards-resource.js
  function parse5(element, { document }) {
    const cards = element.querySelectorAll(".resource-item-card");
    const rows = [];
    cards.forEach((card) => {
      const imgEl = card.querySelector("img.img-fluid");
      const imageFrag = document.createDocumentFragment();
      imageFrag.appendChild(document.createComment(" field:image "));
      if (imgEl) {
        const img = document.createElement("img");
        img.src = imgEl.src;
        img.alt = imgEl.alt || "";
        imageFrag.appendChild(img);
      }
      const textFrag = document.createDocumentFragment();
      textFrag.appendChild(document.createComment(" field:text "));
      const categoryEl = card.querySelector(".cmp-categories span");
      if (categoryEl) {
        const p = document.createElement("p");
        const em = document.createElement("em");
        em.textContent = categoryEl.textContent.trim();
        p.appendChild(em);
        textFrag.appendChild(p);
      }
      const linkEl = card.querySelector("a.stretched-link");
      if (linkEl) {
        const h3 = document.createElement("h3");
        const a = document.createElement("a");
        a.href = linkEl.href;
        a.textContent = linkEl.textContent.trim();
        h3.appendChild(a);
        textFrag.appendChild(h3);
      }
      const dateEl = card.querySelector(".resource-date");
      if (dateEl) {
        const p = document.createElement("p");
        p.textContent = dateEl.textContent.trim();
        textFrag.appendChild(p);
      }
      rows.push([imageFrag, textFrag]);
    });
    const block = WebImporter.Blocks.createBlock(document, {
      name: "Cards Resource",
      cells: rows
    });
    element.replaceWith(block);
  }

  // tools/importer/parsers/quote-testimonial.js
  function parse6(element, { document }) {
    const quoteFrag = document.createDocumentFragment();
    quoteFrag.appendChild(document.createComment(" field:quotation "));
    const quoteEl = element.querySelector(".cmp-text__paragraph");
    if (quoteEl) {
      const p = document.createElement("p");
      p.textContent = quoteEl.textContent.trim();
      quoteFrag.appendChild(p);
    }
    const attrFrag = document.createDocumentFragment();
    attrFrag.appendChild(document.createComment(" field:attribution "));
    const citeEl = element.querySelector("cite");
    if (citeEl) {
      const p = document.createElement("p");
      p.textContent = citeEl.textContent.trim();
      attrFrag.appendChild(p);
    }
    const cells = [
      [quoteFrag],
      [attrFrag]
    ];
    const block = WebImporter.Blocks.createBlock(document, {
      name: "Quote Testimonial",
      cells
    });
    element.replaceWith(block);
  }

  // tools/importer/parsers/form.js
  function parse7(element, { document }) {
    const refFrag = document.createDocumentFragment();
    refFrag.appendChild(document.createComment(" field:reference "));
    const titleEl = element.querySelector(".hs_cmp_text_size--24");
    if (titleEl) {
      const p = document.createElement("p");
      p.textContent = titleEl.textContent.trim();
      refFrag.appendChild(p);
    }
    const actionFrag = document.createDocumentFragment();
    actionFrag.appendChild(document.createComment(" field:action "));
    const formEl = element.querySelector("form.hsfc-Form, form");
    if (formEl && formEl.action) {
      const p = document.createElement("p");
      p.textContent = formEl.action;
      actionFrag.appendChild(p);
    }
    const cells = [
      [refFrag],
      [actionFrag]
    ];
    const block = WebImporter.Blocks.createBlock(document, {
      name: "Form",
      cells
    });
    element.replaceWith(block);
  }

  // tools/importer/parsers/columns-cta.js
  function parse8(element, { document }) {
    const colEls = element.querySelectorAll(".cmp-columns__column");
    const leftFrag = document.createDocumentFragment();
    const leftCol = colEls[0];
    if (leftCol) {
      const h2El = leftCol.querySelector("h2");
      if (h2El) {
        const h2 = document.createElement("h2");
        h2.textContent = h2El.textContent.trim();
        leftFrag.appendChild(h2);
      }
      const textEl = leftCol.querySelector(".cmp-text p");
      if (textEl) {
        const p = document.createElement("p");
        p.textContent = textEl.textContent.trim();
        leftFrag.appendChild(p);
      }
      const imgEl = leftCol.querySelector(".cmp-image img, .cmp-image__image");
      if (imgEl) {
        const img = document.createElement("img");
        img.src = imgEl.src;
        img.alt = imgEl.alt || "";
        leftFrag.appendChild(img);
      }
    }
    const rightFrag = document.createDocumentFragment();
    const rightCol = colEls[1];
    if (rightCol) {
      const formTitleEl = rightCol.querySelector(".hs_cmp_text_size--24, .hsfc-RichText b");
      if (formTitleEl) {
        const h3 = document.createElement("h3");
        h3.textContent = formTitleEl.textContent.trim();
        rightFrag.appendChild(h3);
      }
      const p = document.createElement("p");
      p.textContent = "[Form placeholder]";
      rightFrag.appendChild(p);
    }
    const cells = [
      [leftFrag, rightFrag]
    ];
    const block = WebImporter.Blocks.createBlock(document, {
      name: "Columns CTA",
      cells
    });
    element.replaceWith(block);
  }

  // tools/importer/parsers/columns-banner.js
  function parse9(element, { document }) {
    const colEls = element.querySelectorAll(".cmp-columns__column");
    const leftFrag = document.createDocumentFragment();
    const leftCol = colEls[0];
    if (leftCol) {
      const h2El = leftCol.querySelector("h2, .cmp-title__text");
      if (h2El) {
        const h2 = document.createElement("h2");
        h2.textContent = h2El.textContent.trim();
        leftFrag.appendChild(h2);
      }
    }
    const rightFrag = document.createDocumentFragment();
    const rightCol = colEls[1];
    if (rightCol) {
      const labelEl = rightCol.querySelector(".cmp-hubspot-modal_form-label, label");
      if (labelEl) {
        const p = document.createElement("p");
        p.textContent = labelEl.textContent.trim();
        rightFrag.appendChild(p);
      }
      const formEl = rightCol.querySelector(".hubspot-forms, .cmp-hubspot-modal_form");
      if (formEl) {
        const p = document.createElement("p");
        const a = document.createElement("a");
        a.href = "https://www.paylocity.com/request-a-demo/";
        a.textContent = "Request a Demo";
        p.appendChild(a);
        rightFrag.appendChild(p);
      }
    }
    const cells = [
      [leftFrag, rightFrag]
    ];
    const block = WebImporter.Blocks.createBlock(document, {
      name: "Columns Banner",
      cells
    });
    element.replaceWith(block);
  }

  // tools/importer/transformers/paylocity-cleanup.js
  var TransformHook = { beforeTransform: "beforeTransform", afterTransform: "afterTransform" };
  function transform(hookName, element, payload) {
    if (hookName === TransformHook.beforeTransform) {
      WebImporter.DOMUtils.remove(element, [
        "#onetrust-consent-sdk",
        '[class*="optanon"]',
        ".ot-sdk-container",
        ".cookie-law-info-container",
        '[src*="counters.gif"]'
      ]);
    }
    if (hookName === TransformHook.afterTransform) {
      WebImporter.DOMUtils.remove(element, [
        "header.cmp-meganav",
        "header",
        "footer",
        "nav.cmp-navbar",
        ".experiencefragment",
        "iframe",
        "link",
        "noscript"
      ]);
    }
  }

  // tools/importer/transformers/paylocity-sections.js
  var TransformHook2 = { beforeTransform: "beforeTransform", afterTransform: "afterTransform" };
  function transform2(hookName, element, payload) {
    if (hookName === TransformHook2.afterTransform) {
      const { document } = payload;
      const template = payload.template;
      if (!template || !template.sections || template.sections.length < 2) return;
      const sections = [...template.sections].reverse();
      sections.forEach((section) => {
        const selectors = Array.isArray(section.selector) ? section.selector : [section.selector];
        let sectionEl = null;
        for (const sel of selectors) {
          sectionEl = element.querySelector(sel);
          if (sectionEl) break;
        }
        if (!sectionEl) return;
        if (section.style) {
          const metaBlock = WebImporter.Blocks.createBlock(document, {
            name: "Section Metadata",
            cells: { style: section.style }
          });
          sectionEl.after(metaBlock);
        }
        if (section.id !== template.sections[0].id) {
          const hr = document.createElement("hr");
          sectionEl.before(hr);
        }
      });
    }
  }

  // tools/importer/import-homepage.js
  var parsers = {
    "hero-brand": parse,
    "cards-product": parse2,
    "cards-tier": parse3,
    "cards-icon": parse4,
    "cards-resource": parse5,
    "quote-testimonial": parse6,
    "form": parse7,
    "columns-cta": parse8,
    "columns-banner": parse9
  };
  var transformers = [
    transform,
    transform2
  ];
  var PAGE_TEMPLATE = {
    name: "homepage",
    description: "Paylocity main homepage with hero, product features, testimonials, and calls-to-action",
    urls: [
      "https://www.paylocity.com/"
    ],
    blocks: [
      {
        name: "hero-brand",
        instances: ["#IMAGECONTAINER"]
      },
      {
        name: "cards-product",
        instances: [".cmp-columns.styleColumn1by3:has(#compsizesm)"]
      },
      {
        name: "quote-testimonial",
        instances: ["#carousel-a92e2de4a6 .carousel-item.active .cmp-quote"]
      },
      {
        name: "cards-tier",
        instances: [".cmp-columns.styleColumn1by3:has(#compsizesm)"]
      },
      {
        name: "cards-icon",
        instances: ["#flexgrid-cb8fcd2864"]
      },
      {
        name: "form",
        instances: [".hubspot-forms:has(.hs_cmp_text_size--24)"]
      },
      {
        name: "cards-resource",
        instances: [".relatedresources .resources-module"]
      },
      {
        name: "columns-cta",
        instances: [".styleBGGraphite.styleLarge_withGutter:has(#text-68a3adcb0a) .columns"]
      },
      {
        name: "columns-banner",
        instances: [".styleBGGraphite:has(#title-207e23e590) .columns"]
      }
    ],
    sections: [
      {
        id: "section-1",
        name: "Hero",
        selector: "#container-50d3be983e",
        style: null,
        blocks: ["hero-brand", "cards-product"],
        defaultContent: ["#cmp-custom-container-07ea72ace9 h1", "#cmp-custom-container-84d1e7f821 .cmp-cta"]
      },
      {
        id: "section-2",
        name: "Company Sizes",
        selector: ".styleLarge:has(#cmp-custom-container-72839d8ed1)",
        style: null,
        blocks: ["cards-tier"],
        defaultContent: ["#title-8ee1bb116a h2"]
      },
      {
        id: "section-3",
        name: "Testimonial",
        selector: ".carousel.panelcontainer.carousel--dots-arrows",
        style: null,
        blocks: ["quote-testimonial"],
        defaultContent: []
      },
      {
        id: "section-4",
        name: "Ultimate Platform",
        selector: "#container-4458489ffb",
        style: null,
        blocks: [],
        defaultContent: [".text-danger", "#text-ed1c31b76e", "#image-e78b3bbd83 img", ".cmp-cta--primary"]
      },
      {
        id: "section-5",
        name: "Differentiators",
        selector: "#container-02ad29b071",
        style: null,
        blocks: ["cards-icon"],
        defaultContent: ["#title-fc34906906 h2"]
      },
      {
        id: "section-6",
        name: "Demo Form",
        selector: ".hubspot-forms:has(.hs_cmp_text_size--24)",
        style: "grey",
        blocks: ["form"],
        defaultContent: []
      },
      {
        id: "section-7",
        name: "Awards",
        selector: "#container-42be76b93a",
        style: null,
        blocks: [],
        defaultContent: ["#title-bb9ea172c5 h2", ".cmp-imagegallery", ".cmp-cta--secondary"]
      },
      {
        id: "section-8",
        name: "Break Barriers CTA",
        selector: ".styleBGGraphite.styleLarge_withGutter:has(#text-68a3adcb0a)",
        style: "dark",
        blocks: ["columns-cta"],
        defaultContent: []
      },
      {
        id: "section-9",
        name: "Featured Resources",
        selector: "#container-3aeafd5ec2",
        style: null,
        blocks: ["cards-resource"],
        defaultContent: ["#title-ba7fcb6444 h2"]
      },
      {
        id: "section-10",
        name: "Demo CTA Banner",
        selector: ".styleBGGraphite:has(#title-207e23e590)",
        style: "dark",
        blocks: ["columns-banner"],
        defaultContent: []
      }
    ]
  };
  function executeTransformers(hookName, element, payload) {
    const enhancedPayload = __spreadProps(__spreadValues({}, payload), {
      template: PAGE_TEMPLATE
    });
    transformers.forEach((transformerFn) => {
      try {
        transformerFn.call(null, hookName, element, enhancedPayload);
      } catch (e) {
        console.error(`Transformer failed at ${hookName}:`, e);
      }
    });
  }
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
            section: blockDef.section || null
          });
        });
      });
    });
    console.log(`Found ${pageBlocks.length} block instances on page`);
    return pageBlocks;
  }
  var import_homepage_default = {
    /**
     * Main transformation function using the transform() pattern
     */
    transform: (payload) => {
      const { document, url, html, params } = payload;
      const main = document.body;
      executeTransformers("beforeTransform", main, payload);
      const pageBlocks = findBlocksOnPage(document, PAGE_TEMPLATE);
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
      executeTransformers("afterTransform", main, payload);
      const hr = document.createElement("hr");
      main.appendChild(hr);
      WebImporter.rules.createMetadata(main, document);
      WebImporter.rules.transformBackgroundImages(main, document);
      WebImporter.rules.adjustImageUrls(main, url, params.originalURL);
      const path = WebImporter.FileUtils.sanitizePath(
        new URL(params.originalURL).pathname.replace(/\/$/, "").replace(/\.html$/, "")
      );
      return [{
        element: main,
        path: path || "/index",
        report: {
          title: document.title,
          template: PAGE_TEMPLATE.name,
          blocks: pageBlocks.map((b) => b.name)
        }
      }];
    }
  };
  return __toCommonJS(import_homepage_exports);
})();
