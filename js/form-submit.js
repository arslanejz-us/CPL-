/**
 * Shared AJAX form handler — validation, submit, redirect to thank-you page.
 */
(function () {
  "use strict";

  var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  var PHONE_RE = /^[\d\s().+\-]{7,}$/;

  function getBasePath() {
    var path = window.location.pathname.replace(/\\/g, "/");
    if (path.indexOf("/product-category/") !== -1 || path.indexOf("/products/") !== -1) {
      return "../";
    }
    return "";
  }

  function getEndpoint() {
    if (window.CPL_FORM_ENDPOINT) return window.CPL_FORM_ENDPOINT;
    return getBasePath() + "api/form-submit.php";
  }

  function getThankYouUrl() {
    if (window.CPL_THANK_YOU_URL) return window.CPL_THANK_YOU_URL;
    return getBasePath() + "thank-you.html";
  }

  function getFormData(form) {
    var data = {};
    new FormData(form).forEach(function (value, key) {
      if (value instanceof File) {
        if (value.name) data[key] = value.name;
        return;
      }
      if (key in data) {
        if (!Array.isArray(data[key])) data[key] = [data[key]];
        data[key].push(value);
      } else {
        data[key] = value;
      }
    });
    return data;
  }

  function normalizePayload(form, rawData) {
    var payload = {};
    var map = {
      full_name: "Last_Name",
      name: "Last_Name",
      last_name: "Last_Name",
      email: "Email",
      phone: "Phone",
      quantity: "Total_Quantity",
      total_quantity: "Total_Quantity",
      company: "Company",
      address: "Address",
      description: "Description",
      material: "Material",
      length: "Length",
      width: "Width",
      height: "Height",
      unit: "Unit",
    };

    Object.keys(rawData).forEach(function (key) {
      var normalizedKey = map[key.toLowerCase()] || key;
      payload[normalizedKey] = rawData[key];
    });

    var consent = form.querySelector('[name="sms_consent"]');
    payload.sms_consent = consent && consent.checked ? "Yes" : "No";
    payload.formType = form.dataset.formType || "general";
    payload.Page_Title = document.title;
    payload.Full_Page_URL = window.location.href;

    var ipField = form.querySelector('[name="IP"]');
    if (ipField && ipField.value) payload.IP = ipField.value;

    return payload;
  }

  function clearErrors(form) {
    form.querySelectorAll(".is-invalid").forEach(function (el) {
      el.classList.remove("is-invalid");
    });
    form.querySelectorAll(".invalid-feedback[data-auto-error]").forEach(function (el) {
      el.remove();
    });
    var messageEl = form.querySelector("[data-form-message]");
    if (messageEl) {
      messageEl.textContent = "";
      messageEl.className = "small d-none";
    }
  }

  function showFieldError(field, message) {
    field.classList.add("is-invalid");
    var feedback = document.createElement("div");
    feedback.className = "invalid-feedback d-block";
    feedback.setAttribute("data-auto-error", "true");
    feedback.textContent = message;
    field.insertAdjacentElement("afterend", feedback);
  }

  function validateForm(form) {
    clearErrors(form);
    var isValid = true;
    var firstInvalid = null;

    form.querySelectorAll("[required]").forEach(function (field) {
      var value = (field.value || "").trim();
      var label = field.getAttribute("placeholder") || field.name || "This field";

      if (field.type === "checkbox" && !field.checked) {
        isValid = false;
        showFieldError(field, "Please confirm this requirement.");
        if (!firstInvalid) firstInvalid = field;
        return;
      }

      if (field.type !== "checkbox" && value === "") {
        isValid = false;
        showFieldError(field, label.replace(/\*$/, "") + " is required.");
        if (!firstInvalid) firstInvalid = field;
      }
    });

    form.querySelectorAll('input[type="email"], input[name="Email"], input[name="email"]').forEach(function (field) {
      var value = (field.value || "").trim();
      if (!value) return;
      if (!EMAIL_RE.test(value)) {
        isValid = false;
        showFieldError(field, "Please enter a valid email address.");
        if (!firstInvalid) firstInvalid = field;
      }
    });

    form.querySelectorAll('input[type="tel"], input[name="Phone"], input[name="phone"]').forEach(function (field) {
      var value = (field.value || "").trim();
      if (!value || !field.required) return;
      if (!PHONE_RE.test(value) || value.replace(/\D/g, "").length < 7) {
        isValid = false;
        showFieldError(field, "Please enter a valid phone number.");
        if (!firstInvalid) firstInvalid = field;
      }
    });

    form.querySelectorAll("select[required]").forEach(function (field) {
      if (!(field.value || "").trim()) {
        isValid = false;
        showFieldError(field, "Please select an option.");
        if (!firstInvalid) firstInvalid = field;
      }
    });

    if (firstInvalid) firstInvalid.focus();
    return isValid;
  }

  function showFormMessage(form, message, type) {
    var messageEl = form.querySelector("[data-form-message]");
    if (!messageEl) return;
    messageEl.textContent = message;
    if (messageEl.classList.contains("quote-modal__message")) {
      messageEl.className =
        "col-12 quote-modal__message quote-modal__message--" + (type === "error" ? "error" : "success");
    } else {
      messageEl.className = "small " + (type === "error" ? "text-danger" : "text-success");
    }
    messageEl.classList.remove("d-none");
  }

  function postJson(endpoint, payload) {
    return fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    }).then(function (response) {
      return response
        .json()
        .catch(function () {
          return { success: false, message: "Unexpected server response." };
        })
        .then(function (result) {
          if (!response.ok) {
            return { success: false, message: result.message || "Request failed." };
          }
          return result;
        });
    });
  }

  function submitToApi(payload) {
    var endpoints = [getEndpoint()];
    if (endpoints[0].indexOf("form-submit.php") !== -1) {
      endpoints.push("https://cpl-blue.vercel.app/api/form-submit");
    }

    function tryEndpoint(index) {
      if (index >= endpoints.length) {
        return Promise.reject(new Error("All endpoints failed"));
      }
      return postJson(endpoints[index], payload).then(function (result) {
        if (result.success) return result;
        if (index < endpoints.length - 1) return tryEndpoint(index + 1);
        return result;
      }).catch(function () {
        if (index < endpoints.length - 1) return tryEndpoint(index + 1);
        return Promise.reject(new Error("Network error"));
      });
    }

    return tryEndpoint(0);
  }

  function setSubmitting(form, isSubmitting) {
    var submitBtn = form.querySelector('[type="submit"]');
    if (!submitBtn) return;
    if (isSubmitting) {
      submitBtn.dataset.originalText = submitBtn.textContent;
      submitBtn.disabled = true;
      submitBtn.textContent = "Submitting...";
    } else {
      submitBtn.disabled = false;
      submitBtn.textContent = submitBtn.dataset.originalText || submitBtn.textContent;
    }
  }

  function submitFormViaAjax(form) {
    if (!validateForm(form)) return Promise.resolve({ success: false, message: "Validation failed" });

    setSubmitting(form, true);

    var payload = normalizePayload(form, getFormData(form));

    return submitToApi(payload)
      .then(function (result) {
        if (result.success) {
          window.location.href = getThankYouUrl();
          return result;
        }
        showFormMessage(form, result.message || "Failed to submit form. Please try again.", "error");
        setSubmitting(form, false);
        return result;
      })
      .catch(function () {
        showFormMessage(
          form,
          "Unable to submit right now. Please check your connection and try again.",
          "error"
        );
        setSubmitting(form, false);
        return { success: false, message: "Network error" };
      });
  }

  function bindForm(form) {
    if (form.dataset.ajaxBound === "true") return;
    form.dataset.ajaxBound = "true";

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      submitFormViaAjax(form);
    });
  }

  function initForms(root) {
    (root || document).querySelectorAll("[data-ajax-form], [data-static-form]").forEach(bindForm);
  }

  window.CPLFormSubmit = {
    init: initForms,
    submit: submitFormViaAjax,
    validate: validateForm,
    getThankYouUrl: getThankYouUrl,
    getEndpoint: getEndpoint,
  };

  document.addEventListener("DOMContentLoaded", function () {
    initForms();
  });
})();
