/**
 * Industries listing page — renders sidebar + grid from static data.
 */
(function () {
  "use strict";

  /** Matches Next.js industries page (32 categories). */
  const INDUSTRIES = [
    { id: "apparel-fashion", name: "Apparel & Fashion" },
    { id: "baby-products", name: "Baby Products" },
    { id: "bakery", name: "Bakery" },
    { id: "beverages", name: "Beverage, Wine, Liquor" },
    { id: "cbd", name: "CBD" },
    { id: "candles", name: "Candle" },
    { id: "candy-sweet", name: "candy & Sweet" },
    { id: "chocolate", name: "Chocolate" },
    { id: "coffee-tea", name: "Coffe & Tea" },
    { id: "cosmetics", name: "Cosmetics" },
    { id: "custom-coffee-cups", name: "Custom Coffee Cups" },
    { id: "ecommerce", name: "Ecommerce" },
    { id: "electronics", name: "Electronics" },
    { id: "food-restaurant", name: "Food & Restaurant" },
    { id: "fragrance", name: "Fragrance" },
    { id: "gadgets-accessories", name: "Gadgets-and-Accessories" },
    { id: "gift", name: "Gift" },
    { id: "health-wellness", name: "Health-and-wellness" },
    { id: "holiday", name: "Holiday" },
    { id: "jewelry", name: "Jewelry" },
    { id: "marijuana-cannabis", name: "Marijuana-and-Cannabis" },
    { id: "office-workplace", name: "Office-and-workplace" },
    { id: "pet-supplies", name: "Pet" },
    { id: "pharma", name: "Pharma" },
    { id: "presentation", name: "Presentation" },
    { id: "retail", name: "Retail" },
    { id: "shipping", name: "Shipping" },
    { id: "soap", name: "Soap" },
    { id: "sports", name: "Sport" },
    { id: "stationery", name: "Stationery" },
    { id: "sustainable-packaging", name: "Sustainable-Packaging" },
    { id: "tobacco-cigarette", name: "Tobacco-and-Cigarette" },
  ];

  function iconSrc(name) {
    return `assets/images/industry-icons/${encodeURIComponent(name)}.svg`;
  }

  function setSelected(id) {
    document.querySelectorAll(".industry-card").forEach((card) => {
      card.classList.toggle("is-selected", card.dataset.industryId === id);
    });
    document.querySelectorAll(".industries-sidebar__link").forEach((btn) => {
      btn.classList.toggle("is-active", btn.dataset.industryId === id);
    });
  }

  function scrollToIndustry(id) {
    const target = document.getElementById(`industry-${id}`);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "center" });
    }
    setSelected(id);
  }

  function renderSidebar(container) {
    container.innerHTML = INDUSTRIES.map(
      (ind) =>
        `<button type="button" class="industries-sidebar__link" data-industry-id="${ind.id}">${ind.name}</button>`
    ).join("");

    container.querySelectorAll(".industries-sidebar__link").forEach((btn) => {
      btn.addEventListener("click", () => scrollToIndustry(btn.dataset.industryId));
    });
  }

  function renderGrid(container) {
    container.innerHTML = INDUSTRIES.map(
      (ind) => `
        <div id="industry-${ind.id}">
          <a href="industries/${ind.id}.html" class="industry-card" data-industry-id="${ind.id}">
            <div class="industry-card__icon">
              <img src="${iconSrc(ind.name)}" alt="${ind.name}" loading="lazy">
            </div>
            <span class="industry-card__name">${ind.name}</span>
          </a>
        </div>`
    ).join("");
  }

  function init() {
    const sidebar = document.getElementById("industriesSidebarNav");
    const grid = document.getElementById("industriesGrid");
    const countEl = document.getElementById("industriesCount");

    if (!sidebar || !grid) return;

    if (countEl) countEl.textContent = INDUSTRIES.length;
    renderSidebar(sidebar);
    renderGrid(grid);
  }

  document.addEventListener("DOMContentLoaded", init);
})();
