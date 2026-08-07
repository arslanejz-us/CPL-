/**
 * Renders product category pages from CATEGORY_PAGES config.
 */
(function () {
  "use strict";

  const B = "../"; // base path from product-category/

  function nl2br(text) {
    return text.replace(/\n/g, "<br>");
  }

  function renderMaterialsBlock(mat) {
    const list = mat.items
      .map(([strong, rest]) => `<li><strong>${strong}</strong> - ${rest}</li>`)
      .join("");

    const block = `
      <div class="category-materials-block">
        <div class="text-center mb-4">
          <h2 class="category-materials-block__title">${mat.title}</h2>
          <p class="category-materials-block__intro">${mat.intro}</p>
        </div>
        <div>
          <h3 class="fw-bold text-brand-secondary mb-3">${mat.listHeading}</h3>
          <ul class="category-materials-block__list">${list}</ul>
        </div>
      </div>`;

    return mat.duplicate ? block + block : block;
  }

  function renderPage(cfg) {
    const typeCards = cfg.types
      .map((name, i) => {
        const img = window.TYPE_IMAGES[i % window.TYPE_IMAGES.length];
        return `
          <div class="category-type-card">
            <div class="category-type-card__img">
              <img src="${img}" alt="${name}" loading="lazy">
            </div>
            <h3 class="category-type-card__name">${name}</h3>
          </div>`;
      })
      .join("");

    const faqItems = cfg.faqs
      .map(
        (f, i) => `
        <div class="faq-item${i === 0 ? " is-open" : ""}">
          <button class="faq-item__trigger" type="button">
            <span class="faq-item__question">${f.q}</span>
            <span class="faq-item__icon"><i class="bi bi-${i === 0 ? "dash" : "plus"}-lg"></i></span>
          </button>
          <p class="faq-item__answer">${f.a}</p>
        </div>`
      )
      .join("");

    const testimonialCards = [...cfg.testimonials, ...cfg.testimonials, ...cfg.testimonials]
      .map((t, i) => {
        const colors = ["border-primary", "border-success", "border-info"];
        const border = colors[i % colors.length];
        return `
          <div class="category-testimonial-card ${border}" data-carousel-item>
            <p class="category-testimonial-card__quote">"${t.quote}"</p>
            <div class="category-testimonial-card__author">
              <div class="category-testimonial-card__avatar"><span>No Image</span></div>
              <div>
                <h3>${t.name}</h3>
                <p>${t.company}</p>
              </div>
            </div>
          </div>`;
      })
      .join("");

    const tabs = window.CUSTOMIZATION_TABS.map(
      (tab, i) => `
        <button type="button" class="category-tab${i === 0 ? " is-active" : ""}" data-tab="${tab.id}">
          <img src="${tab.icon}" alt="">
          <span>${tab.name}</span>
        </button>`
    ).join("");

    const firstTab = window.CUSTOMIZATION_TABS[0];
    const tabProducts = firstTab.products
      .map(
        (p) => `
        <div class="category-custom-product">
          <div class="category-custom-product__img"><img src="${p.img}" alt="${p.name}"></div>
          <div class="category-custom-product__body">
            <h3>${p.name}</h3>
            <p>${p.desc}</p>
          </div>
        </div>`
      )
      .join("");

    return `
      <!-- Trusted brands -->
      <section class="trusted-brands" aria-label="Trusted brands">
        <div class="trusted-brands__fade-left"></div>
        <div class="trusted-brands__fade-right"></div>
        <div class="trusted-brands__track">
          ${["Brand A","Brand B","Brand C","Brand D","Brand A","Brand B","Brand C","Brand D","Brand A","Brand B","Brand C","Brand D"]
            .map((b) => `<span class="trusted-brands__item">${b}</span>`).join("")}
        </div>
      </section>

      <!-- Feature blocks -->
      <section class="category-features-bar">
        <div class="container-xl px-4" style="max-width:1140px">
          <div class="row g-4" id="categoryFeatureBlocks"></div>
        </div>
      </section>

      <!-- Types -->
      <section class="py-5 bg-white">
        <div class="container-xl px-4">
          <div class="section-heading">
            <h2>${cfg.typesTitle}</h2>
            <p>${cfg.typesDesc}</p>
          </div>
          <div class="category-types-grid">${typeCards}</div>
          <div class="d-flex flex-column flex-sm-row gap-3 justify-content-center mt-4">
            <a href="${B}index.html#quote" class="btn btn-brand">Request a Quote</a>
            <a href="${B}industries.html" class="btn btn-outline-brand">View All</a>
          </div>
        </div>
      </section>

      <!-- Customization tabs -->
      <section class="bg-white pt-4">
        <div class="container-xl px-4 section-heading">
          <h2>Customize Every Detail With Purpose</h2>
          <p>From the design to the final detailing, every element is up to you. Take a closer look at customization options that enhance the overall appeal of your custom boxes.</p>
        </div>
        <div class="category-tabs-bar">
          <div class="container-xl px-4">
            <div class="category-tabs-nav">${tabs}</div>
          </div>
        </div>
        <div class="container-xl px-4 py-5">
          <div class="category-custom-grid" id="customTabProducts">${tabProducts}</div>
        </div>
      </section>

      <!-- Quote form -->
      <section class="quote-section" id="quote">
        <div class="quote-section__bg">
          <img src="${B}assets/images/quote-form-background.png" alt="Custom packaging products">
        </div>
        <div class="container-xl px-4 position-relative">
          <div class="quote-form-card">
            <h2>Get a Quote in 15 Minutes</h2>
            <form data-ajax-form data-form-type="quote" novalidate>
              <div class="row g-2 mb-2">
                <div class="col-sm-6"><input class="form-control" name="Last_Name" placeholder="Full Name*" required></div>
                <div class="col-sm-6"><input class="form-control" type="email" name="Email" placeholder="Email*" required></div>
              </div>
              <div class="row g-2 mb-2">
                <div class="col-sm-6"><input class="form-control" type="tel" name="Phone" placeholder="Phone*" required></div>
                <div class="col-sm-6"><input class="form-control" name="Total_Quantity" placeholder="Total Quantity"></div>
              </div>
              <select class="form-select mb-2" name="Material">
                <option value="">Select material</option>
                <option>Corrugated Stock</option><option>Foil Metallic Cardstock</option>
                <option>Kraft-ecofriendly Brown Cardstock</option><option>Rigid Press Board Card</option>
                <option>Textured Neenah Cardstock</option><option>Colored Stock</option>
                <option>Standard White Cardstock</option><option>Holographic Stock</option>
              </select>
              <div class="row g-2 mb-2">
                <div class="col-6 col-sm-3"><input class="form-control" type="number" name="Length" placeholder="Length"></div>
                <div class="col-6 col-sm-3"><input class="form-control" type="number" name="Width" placeholder="Width"></div>
                <div class="col-6 col-sm-3"><input class="form-control" type="number" name="Height" placeholder="Height"></div>
                <div class="col-6 col-sm-3"><select class="form-select" name="Unit"><option>Inches</option><option>CM</option></select></div>
              </div>
              <textarea class="form-control mb-2" name="Description" rows="3" placeholder="Provide detailed packaging specifications..."></textarea>
              <div class="mb-2">
                <p class="small text-secondary mb-1">Upload Your Design</p>
                <label class="file-upload-label">
                  <span class="file-upload-btn">Choose File</span>
                  <span data-file-label>No File Chosen</span>
                  <input type="file" class="d-none" data-file-input name="attachment">
                </label>
              </div>
              <div class="form-check mb-3">
                <input class="form-check-input" type="checkbox" id="quoteSms" name="sms_consent">
                <label class="form-check-label small text-secondary" for="quoteSms">I consent to receive customer care related text messages from Custom Packaging Lane.</label>
              </div>
              <p class="small d-none" data-form-message></p>
              <button type="submit" class="btn btn-brand w-100">Get a Quote</button>
            </form>
          </div>
        </div>
      </section>

      <!-- Testimonials -->
      <section class="py-5 bg-white" id="testimonials">
        <div class="container-xl px-4 section-heading">
          <h2>What Our Clients Say</h2>
          <p>Loved by brands and individuals across the globe</p>
        </div>
        <div class="carousel-scroll px-4" id="testimonialsCarousel">${testimonialCards}</div>
      </section>

      <!-- Materials panel -->
      <section class="py-5 bg-white">
        <div class="container-xl px-4">
          <div class="category-materials-panel">${renderMaterialsBlock(cfg.materials)}</div>
        </div>
      </section>

      <!-- FAQ -->
      <section class="py-5" id="faq">
        <div class="container-xl px-4">
          <div class="row g-5">
            <div class="col-lg-5">
              <h2 class="display-6 fw-extrabold text-brand-secondary">Frequently Asked<br>Questions</h2>
              <p class="text-secondary small mt-3">Find all the urgent questions you may have.</p>
            </div>
            <div class="col-lg-7"><div class="faq-list">${faqItems}</div></div>
          </div>
        </div>
      </section>

      <!-- Sample kit -->
      <section class="sample-kit py-5" id="sample-kit">
        <div class="sample-kit__bg d-none d-lg-block"><img src="${B}assets/images/sample-kit.png" alt=""></div>
        <div class="sample-kit__bg d-lg-none"><img src="${B}assets/images/sample-kit.png" alt=""><div class="sample-kit__mobile-gradient"></div></div>
        <div class="container-xl px-4 position-relative">
          <div style="max-width:36rem">
            <h2 class="h3 fw-extrabold text-white mb-4">Order a Free Sample Kit</h2>
            <form data-ajax-form data-form-type="sample-kit" class="row g-3" novalidate>
              <div class="col-sm-6"><input class="form-control" name="Last_Name" placeholder="Full Name" required></div>
              <div class="col-sm-6"><input class="form-control" type="email" name="Email" placeholder="Email" required></div>
              <div class="col-sm-6"><input class="form-control" type="tel" name="Phone" placeholder="Phone" required></div>
              <div class="col-sm-6"><input class="form-control" name="Company" placeholder="Company"></div>
              <div class="col-sm-6"><input class="form-control" name="Total_Quantity" placeholder="Total Quantity"></div>
              <div class="col-sm-6"><input class="form-control" name="Address" placeholder="Address"></div>
              <div class="col-12">
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" name="sms_consent" required>
                  <label class="form-check-label text-white-50" style="font-size:11px">You are agreeing to receive customer care related text messages from Custom Packaging Lane.</label>
                </div>
              </div>
              <div class="col-12">
                <p class="small d-none" data-form-message></p>
                <button type="submit" class="btn btn-outline-light border-white-50 px-4">Submit</button>
              </div>
            </form>
          </div>
        </div>
      </section>

      <!-- Newsletter -->
      <section class="py-4 border-bottom" id="newsletter">
        <div class="container-xl px-4 d-flex flex-column flex-md-row align-items-start align-items-md-center justify-content-between gap-3">
          <div>
            <h2 class="h4 fw-extrabold text-brand-secondary">Subscribe to Our Newsletter</h2>
            <p class="text-secondary small mb-0">Join our newsletter to get 30% off on your next order.</p>
          </div>
          <form data-ajax-form data-form-type="newsletter" class="d-flex flex-column flex-sm-row gap-2 w-100 w-md-auto" novalidate>
            <input type="email" class="form-control" name="Email" placeholder="Email Address" required style="border-radius:10px">
            <button type="submit" class="btn btn-brand">Subscribe</button>
            <p class="small d-none mb-0" data-form-message></p>
          </form>
        </div>
      </section>`;
  }

  /** Fix feature blocks grid — render separately for clarity */
  function renderFeatureBlocks() {
    return window.FEATURE_BLOCKS.map(
      (b) => `
        <div class="col-sm-6 col-lg-3">
          <div class="category-feature">
            <img src="${b.icon}" alt="" class="category-feature__icon">
            <div>
              <h3 class="category-feature__title">${nl2br(b.title)}</h3>
              <p class="category-feature__desc">${nl2br(b.desc)}</p>
            </div>
          </div>
        </div>`
    ).join("");
  }

  function initCustomizationTabs() {
    const grid = document.getElementById("customTabProducts");
    if (!grid) return;

    document.querySelectorAll(".category-tab").forEach((btn) => {
      btn.addEventListener("click", () => {
        document.querySelectorAll(".category-tab").forEach((t) => t.classList.remove("is-active"));
        btn.classList.add("is-active");
        const tab = window.CUSTOMIZATION_TABS.find((t) => t.id === btn.dataset.tab);
        if (!tab) return;
        grid.innerHTML = tab.products
          .map(
            (p) => `
            <div class="category-custom-product">
              <div class="category-custom-product__img"><img src="${p.img}" alt="${p.name}"></div>
              <div class="category-custom-product__body">
                <h3>${p.name}</h3>
                <p>${p.desc}</p>
              </div>
            </div>`
          )
          .join("");
      });
    });
  }

  function initTestimonialsCarousel() {
    const el = document.getElementById("testimonialsCarousel");
    if (!el) return;
    requestAnimationFrame(() => {
      el.scrollLeft = el.scrollWidth / 3;
    });
    el.addEventListener("scroll", () => {
      const third = el.scrollWidth / 3;
      if (el.scrollLeft <= 1) el.scrollLeft += third;
      else if (el.scrollLeft >= third * 2) el.scrollLeft -= third;
    });
    setInterval(() => {
      const card = el.querySelector("[data-carousel-item]");
      const amount = card ? card.offsetWidth + 20 : 300;
      el.scrollBy({ left: amount, behavior: "smooth" });
    }, 4000);
  }

  function initFAQ() {
    document.querySelectorAll(".faq-item").forEach((item) => {
      item.querySelector(".faq-item__trigger")?.addEventListener("click", () => {
        const isOpen = item.classList.contains("is-open");
        document.querySelectorAll(".faq-item").forEach((i) => {
          i.classList.remove("is-open");
          const icon = i.querySelector(".faq-item__icon i");
          if (icon) icon.className = "bi bi-plus-lg";
        });
        if (!isOpen) {
          item.classList.add("is-open");
          const icon = item.querySelector(".faq-item__icon i");
          if (icon) icon.className = "bi bi-dash-lg";
        }
      });
    });
  }

  function initForms() {
    if (window.CPLFormSubmit) {
      window.CPLFormSubmit.init(document);
    }
    document.querySelectorAll("[data-file-input]").forEach((input) => {
      const label = input.closest("label")?.querySelector("[data-file-label]");
      input.addEventListener("change", () => {
        if (label) label.textContent = input.files?.[0]?.name || "No File Chosen";
      });
    });
  }

  async function loadIncludes() {
    const headerEl = document.getElementById("site-header");
    const footerEl = document.getElementById("site-footer");
    if (headerEl) {
      headerEl.innerHTML = await fetch(`${B}includes/header-category.html`).then((r) => r.text());
    }
    if (footerEl) {
      footerEl.innerHTML = await fetch(`${B}includes/footer-category.html`).then((r) => r.text());
    }
  }

  function populateHero(cfg) {
    const breadcrumb = document.getElementById("categoryBreadcrumb");
    const title = document.getElementById("categoryHeroTitle");
    const desc = document.getElementById("categoryHeroDesc");
    if (breadcrumb) breadcrumb.textContent = cfg.breadcrumb;
    if (title) title.textContent = cfg.heading;
    if (desc) desc.textContent = cfg.heroText;
  }

  async function init() {
    const slug = document.body.dataset.category;
    const cfg = window.CATEGORY_PAGES?.[slug];
    const main = document.getElementById("categoryMain");
    if (!cfg || !main) return;

    document.title = cfg.title;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.content = cfg.description;

    populateHero(cfg);

    await loadIncludes();
    main.innerHTML = renderPage(cfg);

    const featuresSection = document.getElementById("categoryFeatureBlocks");
    if (featuresSection) featuresSection.innerHTML = renderFeatureBlocks();

    initCustomizationTabs();
    initTestimonialsCarousel();
    initFAQ();
    initForms();

    // Re-init mobile submenu after header load
    document.querySelectorAll("[data-submenu-toggle]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const submenu = document.getElementById(btn.dataset.submenuToggle);
        if (submenu) submenu.classList.toggle("d-none");
      });
    });
  }

  document.addEventListener("DOMContentLoaded", init);
})();
