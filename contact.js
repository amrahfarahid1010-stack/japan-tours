/* =============================================
   JAPAN TOURS — contact.js
   Contact form validation
   ============================================= */

document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".git-form-card");
  const inputs = form.querySelectorAll(".git-input");
  const nameEl = inputs[0];
  const emailEl = inputs[1];
  const subjEl = inputs[2];
  const msgEl = inputs[3];
  const sendBtn = form.querySelector(".btn-git-send");

  /* --- Inject error elements --- */
  function createError(input) {
    const el = document.createElement("div");
    el.classList.add("git-field-error");
    el.setAttribute("aria-live", "polite");
    input.parentNode.insertBefore(el, input.nextSibling);
    return el;
  }

  const nameErr = createError(nameEl);
  const emailErr = createError(emailEl);
  const subjErr = createError(subjEl);
  const msgErr = createError(msgEl);

  /* --- Success message --- */
  const successMsg = document.createElement("div");
  successMsg.classList.add("git-success-msg");
  successMsg.innerHTML = `
    <div class="git-success-icon"><ion-icon name="checkmark-circle-outline"></ion-icon></div>
    <p>Message sent! We'll get back to you within 24 hours.</p>
  `;
  successMsg.style.display = "none";
  form.appendChild(successMsg);

  /* --- Helpers --- */
  function showErr(input, errEl, msg) {
    errEl.textContent = msg;
    errEl.style.display = "block";
    input.classList.add("git-input-error");
  }

  function clearErr(input, errEl) {
    errEl.textContent = "";
    errEl.style.display = "none";
    input.classList.remove("git-input-error");
  }

  /* --- Validation rules --- */
  function validateName(val) {
    if (!val.trim()) return "Name is required.";
    if (/\d/.test(val)) return "Name cannot contain numbers.";
    if (/[^a-zA-ZÀ-ÿ\s\-']/.test(val)) return "Name can only contain letters.";
    if (val.trim().length < 2) return "Name must be at least 2 characters.";
    return null;
  }

  function validateEmail(val) {
    if (!val.trim()) return "Email is required.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val.trim()))
      return "Enter a valid email address.";
    return null;
  }

  function validateSubject(val) {
    if (!val.trim()) return "Subject is required.";
    if (val.trim().length < 3) return "Subject is too short.";
    return null;
  }

  function validateMessage(val) {
    if (!val.trim()) return "Message is required.";
    if (val.trim().length < 10)
      return "Message must be at least 10 characters.";
    return null;
  }

  /* --- Live validation on blur --- */
  function attachLive(input, errEl, validateFn) {
    input.addEventListener("blur", () => {
      const err = validateFn(input.value);
      err ? showErr(input, errEl, err) : clearErr(input, errEl);
    });
    input.addEventListener("input", () => {
      if (input.classList.contains("git-input-error")) {
        const err = validateFn(input.value);
        err ? showErr(input, errEl, err) : clearErr(input, errEl);
      }
    });
  }

  attachLive(nameEl, nameErr, validateName);
  attachLive(emailEl, emailErr, validateEmail);
  attachLive(subjEl, subjErr, validateSubject);
  attachLive(msgEl, msgErr, validateMessage);

  /* --- Submit --- */
  sendBtn.addEventListener("click", (e) => {
    e.preventDefault();

    const n = validateName(nameEl.value);
    const em = validateEmail(emailEl.value);
    const s = validateSubject(subjEl.value);
    const m = validateMessage(msgEl.value);

    n ? showErr(nameEl, nameErr, n) : clearErr(nameEl, nameErr);
    em ? showErr(emailEl, emailErr, em) : clearErr(emailEl, emailErr);
    s ? showErr(subjEl, subjErr, s) : clearErr(subjEl, subjErr);
    m ? showErr(msgEl, msgErr, m) : clearErr(msgEl, msgErr);

    if (n || em || s || m) return;

    // All valid
    sendBtn.disabled = true;
    sendBtn.innerHTML = "Sending…";

    setTimeout(() => {
      form.querySelector(".git-form-title").style.display = "none";
      inputs.forEach((i) => (i.parentNode.style.display = "none"));
      sendBtn.style.display = "none";
      successMsg.style.display = "flex";
    }, 900);
  });
});
