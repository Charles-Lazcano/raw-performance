// Formspree endpoint for the "Get Started" form.
// PASTE THE REAL FORM ID HERE: replace YOUR_FORM_ID with the ID from your Formspree form
// (Formspree dashboard → your form → Integration, e.g. https://formspree.io/f/xyzabcde).
const FORMSPREE_ENDPOINT = "https://formspree.io/f/YOUR_FORM_ID";

// Mobile nav
const menuBtn = document.getElementById("menuBtn");
const nav = document.getElementById("nav");
if (menuBtn && nav) {
  menuBtn.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    menuBtn.setAttribute("aria-expanded", String(open));
  });
  nav.querySelectorAll("a").forEach((a) =>
    a.addEventListener("click", () => {
      nav.classList.remove("open");
      menuBtn.setAttribute("aria-expanded", "false");
    })
  );
}

// Don't autoplay the run club video for visitors who prefer reduced motion
const runVideo = document.querySelector(".runclub-video");
if (runVideo && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  runVideo.removeAttribute("autoplay");
  runVideo.pause();
}

const year = document.getElementById("year");
if (year) year.textContent = new Date().getFullYear();

// "Get Started" intake form
const intake = document.getElementById("intake");
if (intake) {
  const optionSelect = document.getElementById("option");
  const submitBtn = document.getElementById("intakeSubmit");
  const msg = document.getElementById("intakeMsg");
  const done = document.getElementById("intakeDone");

  // Pre-select a training option from a "Get Started" button (data-option) or an old join.html?plan= link
  const selectOption = (key) => {
    const opt = optionSelect.querySelector(`option[data-option="${key}"]`);
    if (opt) optionSelect.value = opt.value;
  };
  document.querySelectorAll("a[data-option]").forEach((a) =>
    a.addEventListener("click", () => selectOption(a.dataset.option))
  );
  const requested = new URLSearchParams(location.search).get("option");
  if (requested) selectOption(requested);

  const checks = {
    name: (el) => el.value.trim().length > 1 || "Please enter your name.",
    phone: (el) => el.value.replace(/\D/g, "").length >= 10 || "Please enter a phone number Sean can reach you at.",
    email: (el) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(el.value.trim()) || "Please enter a valid email address."
  };

  intake.addEventListener("input", (e) => e.target.removeAttribute("aria-invalid"));

  intake.addEventListener("submit", async (e) => {
    e.preventDefault();
    msg.textContent = "";
    msg.classList.remove("error");

    for (const [name, check] of Object.entries(checks)) {
      const el = intake.elements[name];
      const result = check(el);
      if (result !== true) {
        el.setAttribute("aria-invalid", "true");
        msg.textContent = result;
        msg.classList.add("error");
        el.focus();
        return;
      }
    }

    // Join multi-select checkboxes into one line each so the email to Sean reads cleanly
    const data = new FormData(intake);
    const payload = {};
    for (const key of new Set(data.keys())) payload[key] = data.getAll(key).join(", ");
    payload.goals = payload.goals || "(none selected)";
    payload.availability = payload.availability || "(none selected)";
    payload.experience = payload.experience || "(not given)";
    payload._subject = `New RAW intake: ${payload.name.trim()}`;

    submitBtn.disabled = true;
    submitBtn.textContent = "SENDING…";
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload)
      });
      if (!res.ok) throw new Error(`Formspree responded ${res.status}`);
      const firstName = payload.name.trim().split(/\s+/)[0];
      document.getElementById("intakeThanks").textContent =
        `Thanks, ${firstName}! Sean will reach out within 24–48 hours to set up your first session.`;
      intake.hidden = true;
      done.hidden = false;
      done.focus();
    } catch (err) {
      console.error(err);
      msg.textContent = "Sorry, something went wrong sending your info. Please try again in a minute, or send Sean a DM on Instagram @raw_performancetraining.";
      msg.classList.add("error");
      submitBtn.disabled = false;
      submitBtn.textContent = "SEND TO SEAN";
    }
  });
}
