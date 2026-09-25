// Stripe Payment Links for each plan. Paste the real URLs here once they're created
// in the Stripe dashboard; until then the form falls back to an email request.
const CHECKOUT_LINKS = {
  dropin: "",
  unlimited: "",
  athlete: ""
};
const CONTACT_EMAIL = "hello@rawperformancetraining.com"; // placeholder

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

const year = document.getElementById("year");
if (year) year.textContent = new Date().getFullYear();

// Join flow
const form = document.getElementById("joinForm");
if (form) {
  const radios = form.querySelectorAll('input[name="plan"]');
  const sumLabel = document.getElementById("sumLabel");
  const sumPrice = document.getElementById("sumPrice");
  const submitBtn = document.getElementById("submitBtn");
  const msg = document.getElementById("formMsg");
  const buttonText = { dropin: "BUY A CLASS", unlimited: "START MEMBERSHIP", athlete: "APPLY FOR COACHING" };

  const update = () => {
    const r = form.querySelector('input[name="plan"]:checked');
    sumLabel.textContent = r.dataset.label;
    sumPrice.textContent = r.dataset.price;
    submitBtn.textContent = buttonText[r.value];
  };

  const requested = new URLSearchParams(location.search).get("plan");
  const match = [...radios].find((r) => r.value === requested);
  if (match) match.checked = true;
  radios.forEach((r) => r.addEventListener("change", update));
  update();

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const invalid = [...form.querySelectorAll("[required]")].find((el) => !el.checkValidity());
    if (invalid) {
      msg.textContent = invalid.type === "checkbox"
        ? "Please agree to the membership terms and waiver."
        : `Please enter a valid ${invalid.name}.`;
      invalid.focus();
      return;
    }
    const data = new FormData(form);
    const plan = data.get("plan");
    const link = CHECKOUT_LINKS[plan];
    if (link) {
      const url = new URL(link);
      url.searchParams.set("prefilled_email", data.get("email"));
      location.href = url.toString();
      return;
    }
    const label = form.querySelector('input[name="plan"]:checked').dataset.label;
    const body = `Plan: ${label}\nName: ${data.get("name")}\nEmail: ${data.get("email")}\nPhone: ${data.get("phone")}\nAgreed to terms & waiver: yes`;
    location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent("New member: " + label)}&body=${encodeURIComponent(body)}`;
    msg.textContent = "Opening your email app to send your sign-up request…";
  });
}
