/*
  Contact form handling.

  Messages go to cubesat@clemson.edu through FormSubmit (formsubmit.co), which emails each
  submission to that inbox. No account: the first submission sends an activation link to
  cubesat@clemson.edu, and messages are delivered once someone clicks it.

  - If the service fails or isn't activated yet, the form falls back to opening the
    visitor's email app with the message filled in, so nothing is lost.
  - If `endpoint` is emptied, the form always uses the email app.
*/
(function () {
  var CONFIG = {
    recipient: "cubesat@clemson.edu",
    endpoint: "https://formsubmit.co/ajax/cubesat@clemson.edu"
  };

  var form = document.getElementById("contact-form");
  if (!form) return;

  var status = document.getElementById("form-status");

  function setStatus(message, kind) {
    status.textContent = message;
    status.className = "form-status" + (kind ? " is-" + kind : "");
  }

  function readForm() {
    var data = new FormData(form);
    return {
      name: String(data.get("name") || "").trim(),
      email: String(data.get("email") || "").trim(),
      affiliation: String(data.get("affiliation") || "").trim(),
      topic: String(data.get("topic") || "").trim(),
      message: String(data.get("message") || "").trim(),
      honeypot: String(data.get("website") || "")
    };
  }

  function validate(values) {
    if (!values.name) return "Please add your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) return "Please add a valid email address.";
    if (!values.topic) return "Please choose what this is about.";
    if (values.message.length < 10) return "Please add a short message so we know what you need.";
    return "";
  }

  function openMailClient(values) {
    var subject = "[Clemson Orbital] " + values.topic;
    var lines = ["Name: " + values.name, "Email: " + values.email];
    if (values.affiliation) lines.push("Affiliation: " + values.affiliation);
    lines.push("", values.message);
    var body = lines.join("\n");

    window.location.href =
      "mailto:" + CONFIG.recipient +
      "?subject=" + encodeURIComponent(subject) +
      "&body=" + encodeURIComponent(body);
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    var values = readForm();

    // Honeypot: real visitors leave this empty.
    if (values.honeypot) return;

    var problem = validate(values);
    if (problem) {
      setStatus(problem, "error");
      return;
    }

    if (!CONFIG.endpoint) {
      openMailClient(values);
      setStatus("Opening your email app. If nothing opens, write to " + CONFIG.recipient + " directly.", "ok");
      return;
    }

    var submit = form.querySelector("button[type=submit]");
    submit.disabled = true;
    setStatus("Sending...");

    fetch(CONFIG.endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json", "Accept": "application/json" },
      body: JSON.stringify({
        name: values.name,
        email: values.email,
        affiliation: values.affiliation || "(none)",
        topic: values.topic,
        message: values.message,
        _subject: "[Clemson Orbital] " + values.topic + " from " + values.name,
        _template: "table",
        _captcha: "false"
      })
    })
      .then(function (response) {
        return response.json().catch(function () { return {}; }).then(function (data) {
          // FormSubmit answers 200 with success "false" when the inbox hasn't activated the form yet.
          if (!response.ok || String(data.success) !== "true") throw new Error(data.message || "Request failed");
        });
      })
      .then(function () {
        form.reset();
        setStatus("Thanks, your message is on its way to the team.", "ok");
      })
      .catch(function () {
        openMailClient(values);
        setStatus("We couldn't send it from the site, so we opened your email app instead. If nothing opens, write to " + CONFIG.recipient + ".", "error");
      })
      .finally(function () {
        submit.disabled = false;
      });
  });
})();
