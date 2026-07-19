/* BeatBook explainer — tiny interactions.
   1) sticky-nav shadow on scroll
   2) smooth in-page scroll (with reduced-motion respect)
   3) live dashboard: "Collect & visit" ticks coverage up and outstanding down. */

(function () {
  "use strict";

  var reduce = window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* 1) subtle shadow once the sticky nav leaves the very top */
  var nav = document.querySelector(".nav");
  if (nav) {
    var onScroll = function () {
      nav.style.boxShadow = window.scrollY > 6
        ? "0 8px 24px -18px rgba(11,31,38,.5)"
        : "none";
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* 2) smooth scroll for same-page anchors (honours reduced motion) */
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener("click", function (e) {
      var id = a.getAttribute("href");
      if (id.length < 2) return;
      var target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
    });
  });

  /* 3) live dashboard loop — the actual product in miniature */
  var TOTAL_STOPS = 5;
  var visited = 2;                 // two shops already done in the mock
  var outstanding = 18650;         // total dues across the route
  var collected = 6050;            // collected so far today

  var barEl = document.getElementById("kpiBar");
  var covEl = document.getElementById("kpiCoverage");
  var dueEl = document.getElementById("kpiDue");
  var collEl = document.getElementById("kpiColl");

  var rupees = function (n) { return "Rs " + n.toLocaleString("en-IN"); };

  function render() {
    var pct = Math.round((visited / TOTAL_STOPS) * 100);
    if (covEl) covEl.textContent = pct + "%";
    if (barEl) barEl.style.width = pct + "%";
    if (dueEl) dueEl.textContent = rupees(outstanding);
    if (collEl) collEl.textContent = rupees(collected);
  }

  document.querySelectorAll(".visit__btn").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var row = btn.closest(".visit");
      if (!row || row.classList.contains("is-done")) return;

      var due = parseInt(row.getAttribute("data-due"), 10) || 0;
      var pay = parseInt(row.getAttribute("data-collect"), 10) || 0;

      visited += 1;
      outstanding = Math.max(0, outstanding - pay);
      collected += pay;

      // this retailer's due goes to zero; mark visited
      var dueCell = row.querySelector(".visit__due");
      if (dueCell) dueCell.textContent = "Rs 0";
      row.classList.add("is-done");
      if (!reduce) row.classList.add("just-done");

      // swap the button out for a "Visited" tag
      var tag = document.createElement("span");
      tag.className = "visit__state";
      tag.textContent = "Visited";
      btn.replaceWith(tag);

      render();
    });
  });

  render();
})();
