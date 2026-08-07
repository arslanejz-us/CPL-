/**
 * Quote form modal — opens from header "Get a Quote" buttons.
 * Matches the live site QuoteFormModal component.
 */
(function () {
  "use strict";

  var MODAL_ID = "quoteFormModal";
  var userIp = "Unknown";

  var MODAL_HTML =
    '<div id="' +
    MODAL_ID +
    '" class="quote-modal" aria-hidden="true" role="dialog" aria-labelledby="quoteModalTitle">' +
    '<div class="quote-modal__backdrop" data-quote-modal-close></div>' +
    '<div class="quote-modal__dialog">' +
    '<button type="button" class="quote-modal__close" data-quote-modal-close aria-label="Close">' +
    '<i class="bi bi-x-lg"></i>' +
    "</button>" +
    '<div class="quote-modal__body">' +
    '<h2 id="quoteModalTitle" class="quote-modal__title">Get a Quote</h2>' +
    '<form id="quoteModalForm" class="quote-modal__form" data-ajax-form data-form-type="quote-modal" novalidate>' +
    '<div class="row g-3">' +
    '<div class="col-sm-6">' +
    '<label class="quote-modal__label">Full Name *</label>' +
    '<input type="text" name="Last_Name" class="form-control quote-modal__input" placeholder="Your name" required>' +
    "</div>" +
    '<div class="col-sm-6">' +
    '<label class="quote-modal__label">Email *</label>' +
    '<input type="email" name="Email" class="form-control quote-modal__input" placeholder="your@email.com" required>' +
    "</div>" +
    '<div class="col-sm-6">' +
    '<label class="quote-modal__label">Phone *</label>' +
    '<input type="tel" name="Phone" class="form-control quote-modal__input" placeholder="+1 (555) 000-0000" required>' +
    "</div>" +
    '<div class="col-sm-6">' +
    '<label class="quote-modal__label">Material *</label>' +
    '<select name="Material" class="form-select quote-modal__input" required>' +
    '<option value="">Choose material</option>' +
    "<option>Corrugated Stock</option>" +
    "<option>Foil Metallic Cardstock</option>" +
    "<option>Kraft-ecofriendly Brown Cardstock</option>" +
    "<option>Rigid Press Board Card</option>" +
    "<option>Textured Neenah Cardstock</option>" +
    "<option>Colored Stock</option>" +
    "<option>Standard White Cardstock</option>" +
    "<option>Holographic Stock</option>" +
    "</select>" +
    "</div>" +
    '<div class="col-12">' +
    '<label class="quote-modal__label">Description *</label>' +
    '<textarea name="Description" class="form-control quote-modal__input" rows="3" placeholder="Dimensions, materials, finishes..." required></textarea>' +
    "</div>" +
    '<div class="col-12">' +
    '<div class="form-check">' +
    '<input class="form-check-input" type="checkbox" name="sms_consent" id="quoteModalSmsConsent">' +
    '<label class="form-check-label quote-modal__consent" for="quoteModalSmsConsent">' +
    "I consent to receive SMS from Custom Packaging Lane" +
    "</label>" +
    "</div>" +
    "</div>" +
    '<input type="hidden" name="IP" id="quoteModalIp" value="Unknown">' +
    '<input type="hidden" name="Page_Title" id="quoteModalPageTitle">' +
    '<input type="hidden" name="Full_Page_URL" id="quoteModalPageUrl">' +
    '<div class="col-12 d-none quote-modal__message" id="quoteModalMessage" data-form-message></div>' +
    '<div class="col-12">' +
    '<button type="submit" class="btn btn-brand w-100" id="quoteModalSubmit">Get a Quote</button>' +
    "</div>" +
    "</div>" +
    "</form>" +
    "</div>" +
    "</div>" +
    "</div>";

  function fetchUserIp() {
    fetch("https://api.ipify.org?format=json")
      .then(function (res) {
        return res.json();
      })
      .then(function (data) {
        userIp = data.ip || "Unknown";
        var ipField = document.getElementById("quoteModalIp");
        if (ipField) ipField.value = userIp;
      })
      .catch(function () {
        userIp = "Unknown";
      });
  }

  function injectModal() {
    if (document.getElementById(MODAL_ID)) return;
    document.body.insertAdjacentHTML("beforeend", MODAL_HTML);
  }

  function closeMobileNav() {
    var offcanvasEl = document.querySelector(".offcanvas.show");
    if (!offcanvasEl || typeof bootstrap === "undefined") return;
    var instance = bootstrap.Offcanvas.getInstance(offcanvasEl);
    if (instance) instance.hide();
  }

  function openModal() {
    var modal = document.getElementById(MODAL_ID);
    if (!modal) return;

    var pageTitle = document.getElementById("quoteModalPageTitle");
    var pageUrl = document.getElementById("quoteModalPageUrl");
    var ipField = document.getElementById("quoteModalIp");
    var messageEl = document.getElementById("quoteModalMessage");

    if (pageTitle) pageTitle.value = document.title;
    if (pageUrl) pageUrl.value = window.location.href;
    if (ipField) ipField.value = userIp;
    if (messageEl) {
      messageEl.textContent = "";
      messageEl.className = "col-12 d-none";
    }

    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";

    closeMobileNav();

    var firstInput = modal.querySelector('input[name="Last_Name"]');
    if (firstInput) firstInput.focus();
  }

  function closeModal() {
    var modal = document.getElementById(MODAL_ID);
    if (!modal) return;

    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  function bindEvents() {
    document.addEventListener("click", function (e) {
      if (e.target.closest("[data-quote-modal-open]")) {
        e.preventDefault();
        openModal();
        return;
      }
      if (e.target.closest("[data-quote-modal-close]")) {
        e.preventDefault();
        closeModal();
      }
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") {
        var modal = document.getElementById(MODAL_ID);
        if (modal && modal.classList.contains("is-open")) closeModal();
      }
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    injectModal();
    fetchUserIp();
    bindEvents();
    if (window.CPLFormSubmit) {
      var modal = document.getElementById(MODAL_ID);
      if (modal) window.CPLFormSubmit.init(modal);
    }
  });
})();
