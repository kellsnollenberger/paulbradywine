(function () {
  var navToggle = document.querySelector(".nav-toggle");
  var nav = document.querySelector("#siteNav");
  var ageGate = document.querySelector("#ageGate");
  var confirmAge = document.querySelector("#confirmAge");
  var ageKey = "pbwAgeConfirmed";
  var previewMode = window.location.hostname === "localhost" && window.location.search.indexOf("preview=1") !== -1;

  if (navToggle && nav) {
    navToggle.addEventListener("click", function () {
      var isOpen = nav.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
    });

    nav.addEventListener("click", function (event) {
      if (event.target.tagName === "A") {
        nav.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  if (ageGate && confirmAge && !previewMode) {
    try {
      if (window.localStorage.getItem(ageKey) !== "yes") {
        ageGate.hidden = false;
        document.body.classList.add("locked");
        confirmAge.focus();
      }
    } catch (error) {
      ageGate.hidden = false;
      document.body.classList.add("locked");
    }

    confirmAge.addEventListener("click", function () {
      try {
        window.localStorage.setItem(ageKey, "yes");
      } catch (error) {
        // Storage can be blocked in private browsing; the gate still closes for this visit.
      }
      ageGate.hidden = true;
      document.body.classList.remove("locked");
    });
  }
})();
