// Enquiry form handler.
// Submits the form as JSON to the contact Worker, which emails it via Resend
// (to sales@activacolours.com, cc the enquirer). The visitor never leaves the
// page and no mail client is opened. If the request fails, we show a clear
// message asking them to email us directly — we do NOT pop open a mail client.
(function () {
  "use strict";
  var form = document.getElementById("lead-form");
  if (!form) return;

  var endpoint = form.getAttribute("data-endpoint");
  var status = document.getElementById("form-status");
  var CONTACT_EMAIL = "sales@activacolours.com";

  function setStatus(message, state) {
    if (!status) return;
    status.textContent = message;
    status.className = "form-status is-" + state; // is-ok | is-error | is-info
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    // Honeypot: if the hidden field is filled, it's a bot — silently drop.
    var trap = form.querySelector('input[name="website"]');
    if (trap && trap.value) return;

    if (!endpoint) {
      setStatus("Please email us directly at " + CONTACT_EMAIL + ".", "error");
      return;
    }

    var button = form.querySelector('button[type="submit"]');
    if (button) button.disabled = true;
    setStatus("Sending your enquiry…", "info");

    var payload = {
      name: form.name.value,
      company: form.company.value,
      email: form.email.value,
      phone: form.phone.value,
      type: form.type.value,
      interest: form.interest.value,
      msg: form.msg.value,
      website: trap ? trap.value : ""
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
      .then(function (body) {
        if (!body || !body.ok) throw new Error("Not ok");
        form.reset();
        setStatus(
          "Thank you — your enquiry has been sent, and a copy is on its way to your inbox. We'll be in touch shortly.",
          "ok"
        );
        if (button) button.disabled = false;
      })
      .catch(function () {
        setStatus(
          "Sorry — we couldn't send that just now. Please email us directly at " + CONTACT_EMAIL + ".",
          "error"
        );
        if (button) button.disabled = false;
      });
  });
})();
