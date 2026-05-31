/* =============================================
   JAPAN TOURS — script.js (Included & Booking page)
   1. Navbar shrink on scroll 
   2. Trip summary live updater
   3. Price calculator
   4. Check Availability
   5. Testimonial slider
   ============================================= */

document.addEventListener("DOMContentLoaded", () => {
  /* =============================================
     1. NAVBAR — shrink on scroll
     ============================================= */
  const navbar = document.querySelector("nav.navbar");

  window.addEventListener(
    "scroll",
    () => {
      if (window.scrollY > 60) {
        navbar.classList.add("navbar-scrolled");
      } else {
        navbar.classList.remove("navbar-scrolled");
      }
    },
    { passive: true },
  );

  /* =============================================
     2 & 3. TRIP SUMMARY + PRICE CALCULATOR
     ============================================= */

  const PRICES = {
    Budget: 120,
    Comfort: 180,
    Premium: 260,
    Luxury: 390,
  };

  const TOURS = {
    "Japan Highlights Tour": { nights: 9, label: "10 Days / 9 Nights" },
    "Tokyo City Break": { nights: 4, label: "5 Days / 4 Nights" },
    "Kyoto Cultural Tour": { nights: 6, label: "7 Days / 6 Nights" },
    "Mt. Fuji Adventure": { nights: 3, label: "4 Days / 3 Nights" },
  };

  const destEl = document.getElementById("destination");
  const fromEl = document.getElementById("dateFrom");
  const toEl = document.getElementById("dateTo");
  const travEl = document.getElementById("travelers");
  const accomEl = document.getElementById("accommodation");

  const sumTitle = document.getElementById("summaryTitle");
  const sumDuration = document.getElementById("summaryDuration");
  const sumDates = document.getElementById("summaryDates");
  const sumTrav = document.getElementById("summaryTravelers");
  const sumAccom = document.getElementById("summaryAccom");
  const sumPrice = document.getElementById("summaryPrice");

  function formatDate(dateStr) {
    if (!dateStr) return "—";
    const d = new Date(dateStr + "T00:00:00");
    return d.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  }

  function calcNights(from, to) {
    if (!from || !to) return null;
    const diff = (new Date(to) - new Date(from)) / (1000 * 60 * 60 * 24);
    return diff > 0 ? diff : null;
  }

  function updateSummary() {
    const dest = destEl.value;
    const from = fromEl.value;
    const to = toEl.value;
    const trav = travEl.value;
    const accom = accomEl.value;

    const tour = TOURS[dest] || { nights: 9, label: "10 Days / 9 Nights" };
    const customNights = calcNights(from, to);
    const nights = customNights !== null ? customNights : tour.nights;
    const days = nights + 1;
    const durationLabel =
      customNights !== null
        ? `${days} Day${days !== 1 ? "s" : ""} / ${nights} Night${nights !== 1 ? "s" : ""}`
        : tour.label;

    const pricePerNight = PRICES[accom] || 180;
    const pricePerPerson = pricePerNight * nights;

    sumTitle.textContent = dest;
    sumDuration.textContent = durationLabel;
    sumDates.textContent = `${formatDate(from)} – ${formatDate(to)}`;
    sumTrav.textContent = trav;
    sumAccom.textContent = accom;
    sumPrice.textContent = `$${pricePerPerson.toLocaleString()} USD`;
  }

  [destEl, fromEl, toEl, travEl, accomEl].forEach((el) => {
    el.addEventListener("change", updateSummary);
  });

  updateSummary();

  /* =============================================
     4. CHECK AVAILABILITY
     ============================================= */
  window.checkAvailability = function () {
    const from = fromEl.value;
    const to = toEl.value;

    if (!from || !to) {
      showAvailMsg("Please select both travel dates.", "error");
      return;
    }
    if (new Date(to) <= new Date(from)) {
      showAvailMsg("Return date must be after departure date.", "error");
      return;
    }
    const nights = calcNights(from, to);
    if (nights < 1) {
      showAvailMsg("Trip must be at least 1 night.", "error");
      return;
    }

    const btn = document.querySelector(".dark-card .gold-btn");
    const original = btn.textContent;
    btn.textContent = "Checking…";
    btn.disabled = true;

    setTimeout(() => {
      btn.textContent = original;
      btn.disabled = false;
      showAvailMsg(
        `✓ Available! ${destEl.value} is open for your selected dates.`,
        "success",
      );
      updateSummary();
    }, 1000);
  };

  function showAvailMsg(msg, type) {
    let el = document.getElementById("availMsg");
    if (!el) {
      el = document.createElement("p");
      el.id = "availMsg";
      el.style.cssText =
        "font-size:0.82rem; margin-top:10px; text-align:center; transition: opacity 0.3s;";
      document.querySelector(".dark-card .gold-btn").after(el);
    }
    el.textContent = msg;
    el.style.color = type === "success" ? "#7ecfa0" : "#e57373";
    el.style.opacity = "1";

    clearTimeout(el._timer);
    el._timer = setTimeout(() => {
      el.style.opacity = "0";
    }, 4000);
  }

  /* =============================================
     5. TESTIMONIAL SLIDER
     ============================================= */
  const testimonials = [
    {
      text: "Our trip to Japan was beyond amazing. Every detail was perfect, and the experiences were unforgettable.",
      name: "Sarah & James",
      country: "Australia",
      avatar: "https://i.pravatar.cc/48?img=47",
    },
    {
      text: "The guides were incredible — so knowledgeable and friendly. Kyoto was like stepping into another world.",
      name: "Marco & Lucia",
      country: "Italy",
      avatar: "https://i.pravatar.cc/48?img=33",
    },
    {
      text: "From the food to the temples, every moment felt curated just for us. Truly a trip of a lifetime.",
      name: "Emily Chen",
      country: "Canada",
      avatar: "https://i.pravatar.cc/48?img=25",
    },
  ];

  const textEl = document.getElementById("testimonialText");
  const nameEl2 = document.getElementById("testimonialName");
  const countryEl = document.getElementById("testimonialCountry");
  const avatarEl = document.getElementById("testimonialAvatar");
  const dots = document.querySelectorAll(".slide-dot");

  let current = 0;
  let autoTimer;

  function goTo(i) {
    current = i;
    const t = testimonials[i];

    [textEl, nameEl2, countryEl, avatarEl].forEach((el) => {
      el.style.transition = "opacity 0.3s";
      el.style.opacity = "0";
    });

    setTimeout(() => {
      textEl.textContent = t.text;
      nameEl2.innerHTML = t.name;
      countryEl.textContent = t.country;
      avatarEl.src = t.avatar;

      [textEl, nameEl2, countryEl, avatarEl].forEach((el) => {
        el.style.opacity = "1";
      });
    }, 300);

    dots.forEach((d) => d.classList.remove("active-dot"));
    if (dots[i]) dots[i].classList.add("active-dot");
  }

  dots.forEach((dot) => {
    dot.addEventListener("click", () => {
      clearInterval(autoTimer);
      goTo(parseInt(dot.dataset.i));
      startAuto();
    });
  });

  function startAuto() {
    autoTimer = setInterval(() => {
      goTo((current + 1) % testimonials.length);
    }, 5000);
  }

  startAuto();
});
