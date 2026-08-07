/**
 * Custom Packaging Lane — Main JavaScript
 * Handles animations, carousels, FAQ, video modal, and form UX.
 */

(function () {
  "use strict";

  /* ------------------------------------------------------------------------ */
  /* Flip words (hero)                                                        */
  /* ------------------------------------------------------------------------ */
  function initFlipWords() {
    const container = document.getElementById("flipWords");
    if (!container) return;

    const words = JSON.parse(container.dataset.words || '["unboxed"]');
    const interval = parseInt(container.dataset.interval || "2400", 10);
    let index = 0;

    // Spacer keeps line height stable
    const spacer = document.createElement("span");
    spacer.className = "flip-words__spacer";
    spacer.setAttribute("aria-hidden", "true");
    spacer.textContent = words.reduce((a, b) => (a.length >= b.length ? a : b));
    container.appendChild(spacer);

    const wordEl = document.createElement("span");
    wordEl.className = "flip-words__word is-active";
    wordEl.textContent = words[0];
    container.appendChild(wordEl);

    setInterval(() => {
      wordEl.classList.remove("is-active");
      wordEl.classList.add("is-exiting");

      setTimeout(() => {
        index = (index + 1) % words.length;
        wordEl.textContent = words[index];
        wordEl.classList.remove("is-exiting");
        wordEl.classList.add("is-entering");

        requestAnimationFrame(() => {
          wordEl.classList.remove("is-entering");
          wordEl.classList.add("is-active");
        });
      }, 200);
    }, interval);
  }

  /* ------------------------------------------------------------------------ */
  /* Infinite horizontal carousel                                               */
  /* ------------------------------------------------------------------------ */
  function initInfiniteCarousel(scrollEl) {
    if (!scrollEl) return;

    const items = scrollEl.querySelectorAll("[data-carousel-item]");
    if (items.length === 0) return;

    // Triple items for seamless loop
    const originalHTML = scrollEl.innerHTML;
    scrollEl.innerHTML = originalHTML + originalHTML + originalHTML;

    // Start in the middle third
    requestAnimationFrame(() => {
      scrollEl.scrollLeft = scrollEl.scrollWidth / 3;
    });

    scrollEl.addEventListener("scroll", () => {
      const third = scrollEl.scrollWidth / 3;
      if (scrollEl.scrollLeft <= 1) {
        scrollEl.scrollLeft += third;
      } else if (scrollEl.scrollLeft >= third * 2) {
        scrollEl.scrollLeft -= third;
      }
    });

    const section = scrollEl.closest("section");
    const prevBtn = section?.querySelector("[data-carousel-prev]");
    const nextBtn = section?.querySelector("[data-carousel-next]");

    const slide = (direction) => {
      const card = scrollEl.querySelector("[data-carousel-item]");
      const amount = card ? card.offsetWidth + 24 : scrollEl.clientWidth / 2;
      scrollEl.scrollBy({
        left: direction === "left" ? -amount : amount,
        behavior: "smooth",
      });
    };

    prevBtn?.addEventListener("click", () => slide("left"));
    nextBtn?.addEventListener("click", () => slide("right"));
  }

  /* ------------------------------------------------------------------------ */
  /* FAQ accordion                                                            */
  /* ------------------------------------------------------------------------ */
  function initFAQ() {
    const items = document.querySelectorAll(".faq-item");
    items.forEach((item) => {
      const trigger = item.querySelector(".faq-item__trigger");
      const icon = item.querySelector(".faq-item__icon i");
      trigger?.addEventListener("click", () => {
        const isOpen = item.classList.contains("is-open");
        items.forEach((i) => {
          i.classList.remove("is-open");
          const iIcon = i.querySelector(".faq-item__icon i");
          if (iIcon) {
            iIcon.className = "bi bi-plus-lg";
          }
        });
        if (!isOpen) {
          item.classList.add("is-open");
          if (icon) icon.className = "bi bi-dash-lg";
        }
      });
    });
  }

  /* ------------------------------------------------------------------------ */
  /* Delivery video lightbox                                                  */
  /* ------------------------------------------------------------------------ */
  function initVideoLightbox() {
    const openBtn = document.getElementById("openDeliveryVideo");
    const lightbox = document.getElementById("videoLightbox");
    const closeBtn = document.getElementById("closeVideoLightbox");
    const iframe = document.getElementById("deliveryVideoFrame");
    const videoId = "JDBfpNw3PQo";

    if (!openBtn || !lightbox) return;

    openBtn.addEventListener("click", () => {
      lightbox.classList.add("is-open");
      document.body.style.overflow = "hidden";
      if (iframe) {
        iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
      }
    });

    const close = () => {
      lightbox.classList.remove("is-open");
      document.body.style.overflow = "";
      if (iframe) iframe.src = "";
    };

    closeBtn?.addEventListener("click", close);
    lightbox.addEventListener("click", (e) => {
      if (e.target === lightbox) close();
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && lightbox.classList.contains("is-open")) close();
    });
  }

  /* ------------------------------------------------------------------------ */
  /* Box builder option toggles                                               */
  /* ------------------------------------------------------------------------ */
  function initBoxBuilder() {
    document.querySelectorAll(".box-builder__options").forEach((group) => {
      const buttons = group.querySelectorAll(".box-builder__option");
      buttons.forEach((btn) => {
        btn.addEventListener("click", () => {
          buttons.forEach((b) => b.classList.remove("is-active"));
          btn.classList.add("is-active");
        });
      });
    });
  }

  /* ------------------------------------------------------------------------ */
  /* File upload label update                                                 */
  /* ------------------------------------------------------------------------ */
  function initFileUploads() {
    document.querySelectorAll("[data-file-input]").forEach((input) => {
      const label = input.closest("label")?.querySelector("[data-file-label]");
      input.addEventListener("change", () => {
        if (label) {
          label.textContent = input.files?.[0]?.name || "No File Chosen";
        }
      });
    });
  }

  /* ------------------------------------------------------------------------ */
  /* Mobile submenu toggles                                                   */
  /* ------------------------------------------------------------------------ */
  function initMobileSubmenus() {
    document.querySelectorAll("[data-submenu-toggle]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const targetId = btn.dataset.submenuToggle;
        const submenu = document.getElementById(targetId);
        if (!submenu) return;
        const isOpen = submenu.classList.toggle("d-none") === false;
        btn.querySelector(".bi")?.classList.toggle("bi-chevron-down", !isOpen);
        btn.querySelector(".bi")?.classList.toggle("bi-chevron-up", isOpen);
      });
    });
  }

  /* ------------------------------------------------------------------------ */
  /* Form submission handled by js/form-submit.js                               */
  /* ------------------------------------------------------------------------ */

  document.addEventListener("DOMContentLoaded", () => {
    initFlipWords();
    initInfiniteCarousel(document.getElementById("industriesCarousel"));
    initInfiniteCarousel(document.getElementById("stylesCarousel"));
    initFAQ();
    initVideoLightbox();
    initBoxBuilder();
    initFileUploads();
    initMobileSubmenus();
  });
})();
