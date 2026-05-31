document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".contact-form-card form");

  if (form) {
    const nameEl = form.querySelector("input[type='text']");
    const phoneEl = form.querySelector("input[type='tel']");
    const commentEl = form.querySelector("input:last-of-type");
    const sendBtn = form.querySelector(".btn-send");

    function createError(input) {
      const el = document.createElement("div");
      el.classList.add("field-error");
      el.setAttribute("aria-live", "polite");
      input.parentNode.insertBefore(el, input.nextSibling);
      return el;
    }

    const nameErr = createError(nameEl);
    const phoneErr = createError(phoneEl);
    const commentErr = createError(commentEl);

    const successMsg = document.createElement("div");
    successMsg.classList.add("form-success-msg");
    successMsg.textContent = "✓ Request sent! We'll be in touch soon.";
    successMsg.style.display = "none";
    form.appendChild(successMsg);

    function showErr(input, errEl, msg) {
      errEl.textContent = msg;
      errEl.style.display = "block";
      input.classList.add("input-error");
    }

    function clearErr(input, errEl) {
      errEl.textContent = "";
      errEl.style.display = "none";
      input.classList.remove("input-error");
    }

    function validateName(val) {
      if (!val.trim()) return "Name is required.";
      if (/\d/.test(val)) return "Name cannot contain numbers.";
      if (val.trim().length < 2) return "Name must be at least 2 characters.";
      return null;
    }

    function validatePhone(val) {
      if (!val.trim()) return "Phone number is required.";
      if (!/^[\d\s\+\-\(\)]{7,15}$/.test(val.trim()))
        return "Enter a valid phone number.";
      return null;
    }

    function validateComment(val) {
      if (!val.trim()) return "Please leave a comment or question.";
      if (val.trim().length < 3) return "Comment is too short.";
      return null;
    }

    function attachLive(input, errEl, validateFn) {
      input.addEventListener("blur", () => {
        const err = validateFn(input.value);
        err ? showErr(input, errEl, err) : clearErr(input, errEl);
      });
      input.addEventListener("input", () => {
        if (input.classList.contains("input-error")) {
          const err = validateFn(input.value);
          err ? showErr(input, errEl, err) : clearErr(input, errEl);
        }
      });
    }

    attachLive(nameEl, nameErr, validateName);
    attachLive(phoneEl, phoneErr, validatePhone);
    attachLive(commentEl, commentErr, validateComment);

    sendBtn.addEventListener("click", (e) => {
      e.preventDefault();

      const n = validateName(nameEl.value);
      const p = validatePhone(phoneEl.value);
      const c = validateComment(commentEl.value);

      n ? showErr(nameEl, nameErr, n) : clearErr(nameEl, nameErr);
      p ? showErr(phoneEl, phoneErr, p) : clearErr(phoneEl, phoneErr);
      c ? showErr(commentEl, commentErr, c) : clearErr(commentEl, commentErr);

      if (n || p || c) return;

      sendBtn.disabled = true;
      sendBtn.textContent = "Sending…";

      setTimeout(() => {
        form
          .querySelectorAll(".mb-3, .mb-4")
          .forEach((el) => (el.style.display = "none"));
        sendBtn.style.display = "none";
        successMsg.style.display = "block";
      }, 900);
    });
  }
});
