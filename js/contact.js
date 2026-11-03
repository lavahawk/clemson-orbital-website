/*
  Contact form handling.

  Messages go to cubesat@clemson.edu.

  - If `endpoint` is set (a form service such as Formspree or a small backend
    that forwards to cubesat@clemson.edu), the form POSTs there as JSON.
  - If `endpoint` is empty, the form opens the visitor's email app with the
    message filled in, addressed to cubesat@clemson.edu. Nothing is stored.
*/
(function () {
  var CONFIG = {
    recipient: "cubesat@clemson.edu",
    endpoint: "" // e.g. "https://formspree.io/f/your-form-id"
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
        affiliation: values.affiliation,
        topic: values.topic,
        message: values.message,
        _to: CONFIG.recipient
      })
    })
      .then(function (response) {
        if (!response.ok) throw new Error("Request failed");
        form.reset();
        setStatus("Thanks, your message is on its way to the team.", "ok");
      })
      .catch(function () {
        setStatus("Something went wrong. Please email " + CONFIG.recipient + " directly.", "error");
      })
      .finally(function () {
        submit.disabled = false;
      });
  });
})();
