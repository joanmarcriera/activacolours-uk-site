// Progressive enhancement for the enquiry form.
// When a backend is available (e.g. the VPS Docker deployment), submit the form
// as JSON to /api/contact. On any failure (including static GitHub Pages hosting
// where no backend exists), fall back to the mailto: action so the form still works.
(function () {
  "use strict";
  var form = document.getElementById("lead-form");
  if (!form) return;

  var endpoint = form.getAttribute("data-endpoint") || "/api/contact";
  var status = document.getElementById("form-status");

  function setStatus(message, ok) {
    if (!status) return;
    status.textContent = message;
    status.className = "form-status " + (ok ? "is-ok" : "is-error");
  }

  form.addEventListener("submit", function (event) {
    // Honeypot: if the hidden field is filled, it's a bot — silently drop.
    var trap = form.querySelector('input[name="website"]');
    if (trap && trap.value) {
      event.preventDefault();
      return;
    }

    event.preventDefault();
    var button = form.querySelector('button[type="submit"]');
    if (button) button.disabled = true;
    setStatus("Sending your enquiry…", true);

    var payload = {
      name: form.name.value,
      company: form.company.value,
      email: form.email.value,
      phone: form.phone.value,
      type: form.type.value,
      interest: form.interest.value,
      msg: form.msg.value
    };

    fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    })
      .then(function (res) {
        if (!res.ok) throw new Error("Bad response");
        return res.json();
      })
      .then(function () {
        form.reset();
        setStatus("Thank you — your enquiry has been sent. We'll be in touch shortly.", true);
        if (button) button.disabled = false;
      })
      .catch(function () {
        // No backend (static hosting) or network error: fall back to email app.
        setStatus("Opening your email app to send the enquiry…", true);
        if (button) button.disabled = false;
        form.submit(); // uses the mailto: action
      });
  });
})();
