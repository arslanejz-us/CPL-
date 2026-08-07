/**
 * Renders individual product pages from PRODUCT_PAGES config.
 */
(function () {
  "use strict";

  var B = "../";

  function nl2br(text) {
    return text.replace(/\n/g, "<br>");
  }

  function renderMaterialsBlock(mat) {
    var list = mat.items
      .map(function (item) {
        return "<li><strong>" + item[0] + "</strong> - " + item[1] + "</li>";
      })
      .join("");

    var block =
      '<div class="category-materials-block">' +
      '<div class="text-center mb-4">' +
      '<h2 class="category-materials-block__title">' +
      mat.title +
      "</h2>" +
      '<p class="category-materials-block__intro">' +
      mat.intro +
      "</p>" +
      "</div>" +
      "<div>" +
      '<h3 class="fw-bold text-brand-secondary mb-3">' +
      mat.listHeading +
      "</h3>" +
      '<ul class="category-materials-block__list">' +
      list +
      "</ul>" +
      "</div></div>";

    return mat.duplicate ? block + block : block;
  }

  function renderFeatureBlocks() {
    return (window.FEATURE_BLOCKS || []).map(function (b) {
      return (
        '<div class="col-sm-6 col-lg-3">' +
        '<div class="category-feature">' +
        '<img src="' +
        b.icon +
        '" alt="" class="category-feature__icon">' +
        "<div>" +
        '<h3 class="category-feature__title">' +
        nl2br(b.title) +
        "</h3>" +
        '<p class="category-feature__desc">' +
        nl2br(b.desc) +
        "</p>" +
        "</div></div></div>"
      );
    }).join("");
  }

  function renderShowcaseBenefits(benefits) {
    var positions = ["tl", "tr", "bl", "br"];
    return benefits
      .map(function (b, i) {
        return (
          '<div class="product-showcase__benefit product-showcase__benefit--' +
          positions[i] +
          '">' +
          '<div class="product-showcase__benefit-icon">' +
          b.icon +
          "</div>" +
          "<h3>" +
          b.title +
          "</h3>" +
          "<p>" +
          b.text +
          "</p></div>"
        );
      })
      .join("");
  }

  function renderPage(cfg) {
    var relatedCards = []
      .concat(cfg.relatedProducts, cfg.relatedProducts, cfg.relatedProducts)
      .map(function (p) {
        return (
          '<div class="product-related__card" data-product data-carousel-item>' +
          '<div class="product-related__card-img"><img src="' +
          p.image +
          '" alt="' +
          p.name +
          '" loading="lazy"></div>' +
          '<h3 class="product-related__card-title">' +
          p.name +
          "</h3></div>"
        );
      })
      .join("");

    var faqItems = cfg.faqs
      .map(function (f, i) {
        return (
          '<div class="faq-item' +
          (i === 0 ? " is-open" : "") +
          '">' +
          '<button class="faq-item__trigger" type="button">' +
          '<span class="faq-item__question">' +
          f.q +
          "</span>" +
          '<span class="faq-item__icon"><i class="bi bi-' +
          (i === 0 ? "dash" : "plus") +
          '-lg"></i></span></button>' +
          '<p class="faq-item__answer">' +
          f.a +
          "</p></div>"
        );
      })
      .join("");

    var testimonialCards = []
      .concat(cfg.testimonials, cfg.testimonials, cfg.testimonials)
      .map(function (t, i) {
        var colors = ["border-primary", "border-success", "border-info"];
        return (
          '<div class="category-testimonial-card ' +
          colors[i % colors.length] +
          '" data-carousel-item>' +
          '<p class="category-testimonial-card__quote">"' +
          t.quote +
          '"</p>' +
          '<div class="category-testimonial-card__author">' +
          '<div class="category-testimonial-card__avatar"><span>No Image</span></div>' +
          "<div><h3>" +
          t.name +
          "</h3><p>" +
          t.company +
          "</p></div></div></div>"
        );
      })
      .join("");

    var tabs = (window.CUSTOMIZATION_TABS || [])
      .map(function (tab, i) {
        return (
          '<button type="button" class="category-tab' +
          (i === 0 ? " is-active" : "") +
          '" data-tab="' +
          tab.id +
          '">' +
          '<img src="' +
          tab.icon +
          '" alt="">' +
          "<span>" +
          tab.name +
          "</span></button>"
        );
      })
      .join("");

    var firstTab = (window.CUSTOMIZATION_TABS || [])[0];
    var tabProducts = firstTab
      ? firstTab.products
          .map(function (p) {
            return (
              '<div class="category-custom-product">' +
              '<div class="category-custom-product__img"><img src="' +
              p.img +
              '" alt="' +
              p.name +
              '"></div>' +
              '<div class="category-custom-product__body"><h3>' +
              p.name +
              "</h3><p>" +
              p.desc +
              "</p></div></div>"
            );
          })
          .join("")
      : "";

    return (
      '<section class="trusted-brands" aria-label="Trusted brands">' +
      '<div class="trusted-brands__fade-left"></div><div class="trusted-brands__fade-right"></div>' +
      '<div class="trusted-brands__track">' +
      ["Brand A", "Brand B", "Brand C", "Brand D", "Brand A", "Brand B", "Brand C", "Brand D"]
        .map(function (b) {
          return '<span class="trusted-brands__item">' + b + "</span>";
        })
        .join("") +
      "</div></section>" +
      '<section class="category-features-bar"><div class="container-xl px-4" style="max-width:1140px">' +
      '<div class="row g-4" id="productFeatureBlocks"></div></div></section>' +
      '<section class="product-showcase py-4 py-sm-5 py-lg-5 bg-white"><div class="container-xl px-4">' +
      '<div class="product-showcase__header text-center mb-4 mb-sm-5 mb-lg-5">' +
      '<p class="product-showcase__eyebrow">' +
      cfg.showcaseEyebrow +
      "</p>" +
      '<h2 class="product-showcase__title">' +
      cfg.showcaseTitle +
      "</h2></div>" +
      '<div class="product-showcase__layout">' +
      '<div class="product-showcase__center"><img src="' +
      cfg.showcaseImage +
      '" alt="' +
      cfg.showcaseAlt +
      '"></div>' +
      '<div class="product-showcase__benefits">' +
      renderShowcaseBenefits(cfg.benefits) +
      "</div></div></div></section>" +
      '<section class="product-customization bg-white"><div class="container-xl px-4 section-heading">' +
      "<h2>Customize Every Detail With Purpose</h2>" +
      "<p>From the design to the final detailing, every element is up to you. Take a closer look at customization options that enhance the overall appeal of your custom boxes.</p>" +
      '</div><div class="category-tabs-bar"><div class="container-xl px-4"><div class="category-tabs-nav">' +
      tabs +
      '</div></div></div><div class="container-xl px-4 py-5"><div class="category-custom-grid" id="customTabProducts">' +
      tabProducts +
      "</div></div></section>" +
      '<section class="product-related bg-white" id="related-products">' +
      '<div class="container-xl px-4 product-related__header text-center mb-4 mb-sm-5">' +
      "<h2>Related Products</h2><p>Discover packaging tailored for your products</p></div>" +
      '<div class="product-related__wrap">' +
      '<button type="button" class="product-related__arrow product-related__arrow--prev" data-related-prev aria-label="Previous">&#8249;</button>' +
      '<div class="product-related__track carousel-scroll no-scrollbar" id="relatedProductsCarousel">' +
      relatedCards +
      "</div>" +
      '<button type="button" class="product-related__arrow product-related__arrow--next" data-related-next aria-label="Next">&#8250;</button>' +
      "</div></section>" +
      '<section class="quote-section" id="quote"><div class="quote-section__bg"><img src="' +
      B +
      'assets/images/quote-form-background.png" alt="Custom packaging products"></div>' +
      '<div class="container-xl px-4 position-relative"><div class="quote-form-card"><h2>Get a Quote in 15 Minutes</h2>' +
      '<form data-ajax-form data-form-type="quote" novalidate>' +
      '<div class="row g-2 mb-2"><div class="col-sm-6"><input class="form-control" name="Last_Name" placeholder="Full Name*" required></div>' +
      '<div class="col-sm-6"><input class="form-control" type="email" name="Email" placeholder="Email*" required></div></div>' +
      '<div class="row g-2 mb-2"><div class="col-sm-6"><input class="form-control" type="tel" name="Phone" placeholder="Phone*" required></div>' +
      '<div class="col-sm-6"><input class="form-control" name="Total_Quantity" placeholder="Total Quantity"></div></div>' +
      '<select class="form-select mb-2" name="Material"><option value="">Select material</option><option>Corrugated Stock</option><option>Foil Metallic Cardstock</option><option>Kraft-ecofriendly Brown Cardstock</option><option>Rigid Press Board Card</option><option>Textured Neenah Cardstock</option><option>Colored Stock</option><option>Standard White Cardstock</option><option>Holographic Stock</option></select>' +
      '<div class="row g-2 mb-2"><div class="col-6 col-sm-3"><input class="form-control" type="number" name="Length" placeholder="Length"></div>' +
      '<div class="col-6 col-sm-3"><input class="form-control" type="number" name="Width" placeholder="Width"></div>' +
      '<div class="col-6 col-sm-3"><input class="form-control" type="number" name="Height" placeholder="Height"></div>' +
      '<div class="col-6 col-sm-3"><select class="form-select" name="Unit"><option>Inches</option><option>CM</option></select></div></div>' +
      '<textarea class="form-control mb-2" name="Description" rows="3" placeholder="Provide detailed packaging specifications..."></textarea>' +
      '<div class="mb-2"><p class="small text-secondary mb-1">Upload Your Design</p><label class="file-upload-label"><span class="file-upload-btn">Choose File</span><span data-file-label>No File Chosen</span><input type="file" class="d-none" data-file-input name="attachment"></label></div>' +
      '<div class="form-check mb-3"><input class="form-check-input" type="checkbox" name="sms_consent" id="quoteSms"><label class="form-check-label small text-secondary" for="quoteSms">I consent to receive customer care related text messages from Custom Packaging Lane.</label></div>' +
      '<p class="small d-none" data-form-message></p><button type="submit" class="btn btn-brand w-100">Get a Quote</button></form></div></div></section>' +
      '<section class="py-5 bg-white"><div class="container-xl px-4"><div class="category-materials-panel">' +
      renderMaterialsBlock(cfg.materials) +
      "</div></div></section>" +
      '<section class="py-5 bg-white" id="testimonials"><div class="container-xl px-4 section-heading"><h2>What Our Clients Say</h2><p>Loved by brands and individuals across the globe</p></div>' +
      '<div class="carousel-scroll px-4" id="testimonialsCarousel">' +
      testimonialCards +
      "</div></section>" +
      '<section class="py-5" id="faq"><div class="container-xl px-4"><div class="row g-5"><div class="col-lg-5">' +
      '<h2 class="display-6 fw-extrabold text-brand-secondary">Frequently Asked<br>Questions</h2>' +
      '<p class="text-secondary small mt-3">Find all the urgent questions you may have.</p></div>' +
      '<div class="col-lg-7"><div class="faq-list">' +
      faqItems +
      "</div></div></div></div></section>" +
      '<section class="sample-kit py-5" id="sample-kit"><div class="sample-kit__bg d-none d-lg-block"><img src="' +
      B +
      'assets/images/sample-kit.png" alt=""></div><div class="sample-kit__bg d-lg-none"><img src="' +
      B +
      'assets/images/sample-kit.png" alt=""><div class="sample-kit__mobile-gradient"></div></div>' +
      '<div class="container-xl px-4 position-relative"><div style="max-width:36rem"><h2 class="h3 fw-extrabold text-white mb-4">Order a Free Sample Kit</h2>' +
      '<form data-ajax-form data-form-type="sample-kit" class="row g-3" novalidate>' +
      '<div class="col-sm-6"><input class="form-control" name="Last_Name" placeholder="Full Name" required></div>' +
      '<div class="col-sm-6"><input class="form-control" type="email" name="Email" placeholder="Email" required></div>' +
      '<div class="col-sm-6"><input class="form-control" type="tel" name="Phone" placeholder="Phone" required></div>' +
      '<div class="col-sm-6"><input class="form-control" name="Company" placeholder="Company"></div>' +
      '<div class="col-sm-6"><input class="form-control" name="Total_Quantity" placeholder="Total Quantity"></div>' +
      '<div class="col-sm-6"><input class="form-control" name="Address" placeholder="Address"></div>' +
      '<div class="col-12"><div class="form-check"><input class="form-check-input" type="checkbox" name="sms_consent" required><label class="form-check-label text-white-50" style="font-size:11px">You are agreeing to receive customer care related text messages from Custom Packaging Lane.</label></div></div>' +
      '<div class="col-12"><p class="small d-none" data-form-message></p><button type="submit" class="btn btn-outline-light border-white-50 px-4">Submit</button></div></form></div></div></section>' +
      '<section class="product-cta py-5 py-lg-5"><div class="container-xl px-4 text-center">' +
      '<h2 class="product-cta__title">Ready to Order?</h2>' +
      '<p class="product-cta__text">Get started with a free quote or request a sample kit to experience the quality firsthand</p>' +
      '<div class="d-flex flex-column flex-sm-row gap-3 justify-content-center align-items-center">' +
      '<button type="button" class="btn product-cta__btn product-cta__btn--primary" data-quote-modal-open>Get a Quote</button>' +
      '<a href="#sample-kit" class="btn product-cta__btn product-cta__btn--outline">Request Sample</a></div></div></section>' +
      '<section class="py-4 border-bottom" id="newsletter"><div class="container-xl px-4 d-flex flex-column flex-md-row align-items-start align-items-md-center justify-content-between gap-3">' +
      "<div><h2 class=\"h4 fw-extrabold text-brand-secondary\">Subscribe to Our Newsletter</h2><p class=\"text-secondary small mb-0\">Join our newsletter to get 30% off on your next order.</p></div>" +
      '<form data-ajax-form data-form-type="newsletter" class="d-flex flex-column flex-sm-row gap-2 w-100 w-md-auto" novalidate>' +
      '<input type="email" class="form-control" name="Email" placeholder="Email Address" required style="border-radius:10px">' +
      '<button type="submit" class="btn btn-brand">Subscribe</button><p class="small d-none mb-0" data-form-message></p></form></div></section>'
    );
  }

  function initCustomizationTabs() {
    var grid = document.getElementById("customTabProducts");
    if (!grid) return;
    document.querySelectorAll(".category-tab").forEach(function (btn) {
      btn.addEventListener("click", function () {
        document.querySelectorAll(".category-tab").forEach(function (t) {
          t.classList.remove("is-active");
        });
        btn.classList.add("is-active");
        var tab = (window.CUSTOMIZATION_TABS || []).find(function (t) {
          return t.id === btn.dataset.tab;
        });
        if (!tab) return;
        grid.innerHTML = tab.products
          .map(function (p) {
            return (
              '<div class="category-custom-product"><div class="category-custom-product__img"><img src="' +
              p.img +
              '" alt="' +
              p.name +
              '"></div><div class="category-custom-product__body"><h3>' +
              p.name +
              "</h3><p>" +
              p.desc +
              "</p></div></div>"
            );
          })
          .join("");
      });
    });
  }

  function initRelatedCarousel() {
    var el = document.getElementById("relatedProductsCarousel");
    if (!el) return;

    requestAnimationFrame(function () {
      el.scrollLeft = el.scrollWidth / 3;
    });

    el.addEventListener("scroll", function () {
      var third = el.scrollWidth / 3;
      if (el.scrollLeft <= 1) el.scrollLeft += third;
      else if (el.scrollLeft >= third * 2 - 10) el.scrollLeft -= third;
    });

    var slide = function (dir) {
      var card = el.querySelector("[data-product]");
      var amount = card ? card.offsetWidth + 24 : 300;
      el.scrollBy({ left: dir === "left" ? -amount : amount, behavior: "smooth" });
    };

    document.querySelector("[data-related-prev]")?.addEventListener("click", function () {
      slide("left");
    });
    document.querySelector("[data-related-next]")?.addEventListener("click", function () {
      slide("right");
    });

    setInterval(function () {
      slide("right");
    }, 5000);
  }

  function initTestimonialsCarousel() {
    var el = document.getElementById("testimonialsCarousel");
    if (!el) return;

    requestAnimationFrame(function () {
      el.scrollLeft = el.scrollWidth / 3;
    });

    el.addEventListener("scroll", function () {
      var third = el.scrollWidth / 3;
      if (el.scrollLeft <= 1) el.scrollLeft += third;
      else if (el.scrollLeft >= third * 2 - 10) el.scrollLeft -= third;
    });

    var slide = function (dir) {
      var card = el.querySelector("[data-carousel-item]");
      var amount = card ? card.offsetWidth + 24 : 300;
      el.scrollBy({ left: dir === "left" ? -amount : amount, behavior: "smooth" });
    };

    document.querySelector("[data-testimonials-prev]")?.addEventListener("click", function () {
      slide("left");
    });
    document.querySelector("[data-testimonials-next]")?.addEventListener("click", function () {
      slide("right");
    });

    setInterval(function () {
      slide("right");
    }, 5000);
  }

  function initFAQ() {
    document.querySelectorAll(".faq-item").forEach(function (item) {
      item.querySelector(".faq-item__trigger")?.addEventListener("click", function () {
        var isOpen = item.classList.contains("is-open");
        document.querySelectorAll(".faq-item").forEach(function (i) {
          i.classList.remove("is-open");
          var icon = i.querySelector(".faq-item__icon i");
          if (icon) icon.className = "bi bi-plus-lg";
        });
        if (!isOpen) {
          item.classList.add("is-open");
          var icon = item.querySelector(".faq-item__icon i");
          if (icon) icon.className = "bi bi-dash-lg";
        }
      });
    });
  }

  function initForms() {
    if (window.CPLFormSubmit) window.CPLFormSubmit.init(document);
    document.querySelectorAll("[data-file-input]").forEach(function (input) {
      input.addEventListener("change", function () {
        var label = input.closest("label")?.querySelector("[data-file-label]");
        if (label) label.textContent = input.files?.[0]?.name || "No File Chosen";
      });
    });
  }

  async function loadIncludes() {
    var headerEl = document.getElementById("site-header");
    var footerEl = document.getElementById("site-footer");
    if (headerEl) {
      headerEl.innerHTML = await fetch(B + "includes/header-product.html").then(function (r) {
        return r.text();
      });
    }
    if (footerEl) {
      footerEl.innerHTML = await fetch(B + "includes/footer-product.html").then(function (r) {
        return r.text();
      });
    }
  }

  function populateHero(cfg) {
    var cat = document.getElementById("productBreadcrumbCategory");
    var label = document.getElementById("productBreadcrumbLabel");
    var title = document.getElementById("productHeroTitle");
    var desc = document.getElementById("productHeroDesc");
    var img = document.getElementById("productHeroImage");
    if (cat) cat.textContent = cfg.breadcrumbCategory;
    if (label) label.textContent = cfg.breadcrumbLabel;
    if (title) title.textContent = cfg.heading;
    if (desc) desc.textContent = cfg.heroText;
    if (img) {
      img.src = cfg.heroImage;
      img.alt = cfg.heading;
    }
  }

  async function init() {
    var slug = document.body.dataset.product;
    var cfg = window.PRODUCT_PAGES?.[slug];
    var main = document.getElementById("productMain");
    if (!cfg || !main) return;

    document.title = cfg.title;
    var metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.content = cfg.description;

    populateHero(cfg);
    await loadIncludes();
    main.innerHTML = renderPage(cfg);

    var features = document.getElementById("productFeatureBlocks");
    if (features) features.innerHTML = renderFeatureBlocks();

    initCustomizationTabs();
    initRelatedCarousel();
    initTestimonialsCarousel();
    initFAQ();
    initForms();

    document.querySelectorAll("[data-submenu-toggle]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var submenu = document.getElementById(btn.dataset.submenuToggle);
        if (submenu) submenu.classList.toggle("d-none");
      });
    });
  }

  document.addEventListener("DOMContentLoaded", init);
})();
