/**
 * Blog listing page — category tabs, grid, and pagination.
 */
(function () {
  "use strict";

  var POSTS_PER_PAGE = 9;
  var activeCategory = "knowledge";
  var currentPage = 1;

  function getFilteredPosts() {
    return window.getBlogPosts(activeCategory);
  }

  function renderTabs() {
    var container = document.getElementById("blogTabs");
    if (!container) return;

    container.innerHTML = window.BLOG_CATEGORIES.map(function (cat) {
      var isActive = activeCategory === cat.id;
      return (
        '<button type="button" class="blog-tab' +
        (isActive ? " is-active" : "") +
        '" data-category="' +
        cat.id +
        '">' +
        cat.label +
        "</button>"
      );
    }).join("");

    container.querySelectorAll(".blog-tab").forEach(function (btn) {
      btn.addEventListener("click", function () {
        activeCategory = btn.dataset.category;
        currentPage = 1;
        renderTabs();
        renderGrid();
        renderPagination();
      });
    });
  }

  function renderGrid() {
    var grid = document.getElementById("blogGrid");
    if (!grid) return;

    var posts = getFilteredPosts();
    var startIdx = (currentPage - 1) * POSTS_PER_PAGE;
    var displayed = posts.slice(startIdx, startIdx + POSTS_PER_PAGE);

    if (displayed.length === 0) {
      grid.innerHTML = '<p class="text-secondary text-center py-5">No posts found in this category.</p>';
      return;
    }

    grid.innerHTML = displayed
      .map(function (post) {
        return (
          '<a href="blog/' +
          post.id +
          '.html" class="blog-card">' +
          '<article>' +
          '<div class="blog-card__image">' +
          '<img src="' +
          post.image +
          '" alt="' +
          post.title.replace(/"/g, "&quot;") +
          '" loading="lazy" onerror="this.src=\'assets/images/styles/custom-tuck-boxes.png\'">' +
          "</div>" +
          '<h2 class="blog-card__title">' +
          post.title +
          "</h2>" +
          "</article>" +
          "</a>"
        );
      })
      .join("");
  }

  function renderPagination() {
    var posts = getFilteredPosts();
    var totalPages = Math.max(1, Math.ceil(posts.length / POSTS_PER_PAGE));
    var prevBtn = document.getElementById("blogPrev");
    var nextBtn = document.getElementById("blogNext");

    if (prevBtn) {
      prevBtn.disabled = currentPage <= 1;
      prevBtn.classList.toggle("is-disabled", currentPage <= 1);
    }
    if (nextBtn) {
      nextBtn.disabled = currentPage >= totalPages;
      nextBtn.classList.toggle("is-disabled", currentPage >= totalPages);
    }
  }

  function initPagination() {
    var prevBtn = document.getElementById("blogPrev");
    var nextBtn = document.getElementById("blogNext");

    prevBtn?.addEventListener("click", function () {
      if (currentPage > 1) {
        currentPage -= 1;
        renderGrid();
        renderPagination();
        document.getElementById("blogList")?.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });

    nextBtn?.addEventListener("click", function () {
      var totalPages = Math.ceil(getFilteredPosts().length / POSTS_PER_PAGE);
      if (currentPage < totalPages) {
        currentPage += 1;
        renderGrid();
        renderPagination();
        document.getElementById("blogList")?.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  }

  function initForms() {
    /* handled by js/form-submit.js */
  }

  function initMobileSubmenus() {
    document.querySelectorAll("[data-submenu-toggle]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var submenu = document.getElementById(btn.dataset.submenuToggle);
        if (submenu) submenu.classList.toggle("d-none");
      });
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    renderTabs();
    renderGrid();
    renderPagination();
    initPagination();
    initForms();
    initMobileSubmenus();
  });
})();
