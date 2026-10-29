/* ============================================================
   Pathway prototype — script.js

   1. Data: strength areas, questions, careers, businesses
   2. Page navigation
   3. Mobile menu
   4. Home + student page content
   5. Assessment
   6. Scoring
   7. Results page
   8. Forms (contact + partner)
   9. Helpers (toast, modal, icons)
   ============================================================ */


/* ------------------------------------------------------------
   1. DATA
   Everything here is example data for the prototype.
   ------------------------------------------------------------ */

// The eight strength areas the assessment measures.
const TRAITS = {
  problem:       { name: "Problem Solving",        icon: "i-bulb",   desc: "You like figuring out what's wrong and how to fix it." },
  creative:      { name: "Creativity",             icon: "i-spark",  desc: "You come up with original ideas and new ways to do things." },
  communication: { name: "Communication",          icon: "i-chat",   desc: "You share ideas clearly, in writing and out loud." },
  leadership:    { name: "Leadership",             icon: "i-flag",   desc: "You organize people and help groups make decisions." },
  people:        { name: "Working with People",    icon: "i-people", desc: "You notice how others feel and enjoy helping them." },
  tech:          { name: "Working with Technology",icon: "i-code",   desc: "You're comfortable learning software, devices, and code." },
  hands:         { name: "Working with Your Hands",icon: "i-wrench", desc: "You learn best by building, fixing, and doing." },
  analytical:    { name: "Analytical Thinking",    icon: "i-chart",  desc: "You look for patterns in information and data." }
};

// 10 scenario questions. Each answer gives points to one or two strength areas.
const QUESTIONS = [
  {
    text: "Your group project hits a snag the night before it's due. What do you do first?",
    options: [
      { text: "Break the problem into pieces and find what's actually broken", points: { problem: 2, analytical: 1 } },
      { text: "Call a quick meeting and assign who does what",                points: { leadership: 2, communication: 1 } },
      { text: "Come up with a completely different approach",                points: { creative: 2, problem: 1 } },
      { text: "Check on stressed teammates and keep everyone calm",          points: { people: 2, communication: 1 } }
    ]
  },
  {
    text: "Which free-period activity sounds best?",
    options: [
      { text: "Building or fixing something in a shop or makerspace", points: { hands: 2, problem: 1 } },
      { text: "Designing a poster, video, or logo",                   points: { creative: 2, tech: 1 } },
      { text: "Coding a small game or app",                           points: { tech: 2, analytical: 1 } },
      { text: "Tutoring a younger student",                           points: { people: 2, communication: 1 } }
    ]
  },
  {
    text: "A teacher asks for volunteers for the school fundraiser. Which role do you take?",
    options: [
      { text: "Lead the planning committee",        points: { leadership: 2, communication: 1 } },
      { text: "Run the budget spreadsheet",         points: { analytical: 2, tech: 1 } },
      { text: "Set up the stage and equipment",     points: { hands: 2, tech: 1 } },
      { text: "Give the welcome speech",            points: { communication: 2, leadership: 1 } }
    ]
  },
  {
    text: "When you learn something new, you prefer to…",
    options: [
      { text: "See the data and how everything connects", points: { analytical: 2, problem: 1 } },
      { text: "Try it with your hands right away",         points: { hands: 2, problem: 1 } },
      { text: "Talk it through with other people",         points: { communication: 2, people: 1 } },
      { text: "Experiment and add your own spin",          points: { creative: 2, problem: 1 } }
    ]
  },
  {
    text: "Your laptop suddenly stops working. You…",
    options: [
      { text: "Search the error and troubleshoot until it's fixed", points: { tech: 2, problem: 1 } },
      { text: "Open it up to see what's going on inside",          points: { hands: 2, tech: 1 } },
      { text: "Ask a friend who knows computers and learn together", points: { people: 2, communication: 1 } },
      { text: "Work out the likely cause from what changed recently", points: { analytical: 2, problem: 1 } }
    ]
  },
  {
    text: "Which class assignment would you enjoy most?",
    options: [
      { text: "A persuasive speech or debate",              points: { communication: 2, leadership: 1 } },
      { text: "A science lab with measurements and graphs", points: { analytical: 2, hands: 1 } },
      { text: "A creative writing or art portfolio",        points: { creative: 2, communication: 1 } },
      { text: "A community service project",                points: { people: 2, leadership: 1 } }
    ]
  },
  {
    text: "On a team, people usually count on you to…",
    options: [
      { text: "Keep everyone organized and on schedule", points: { leadership: 2, problem: 1 } },
      { text: "Come up with fresh ideas",                points: { creative: 2, problem: 1 } },
      { text: "Make sure everyone feels heard",          points: { people: 2, communication: 1 } },
      { text: "Handle the technical side",               points: { tech: 2, analytical: 1 } }
    ]
  },
  {
    text: "A local business asks students for help growing. You'd want to…",
    options: [
      { text: "Study its sales numbers to find patterns",   points: { analytical: 2, tech: 1 } },
      { text: "Redesign its social media and branding",     points: { creative: 2, communication: 1 } },
      { text: "Talk with customers about what they need",   points: { people: 2, communication: 1 } },
      { text: "Improve how its products are made or shipped", points: { hands: 2, problem: 1 } }
    ]
  },
  {
    text: "Which compliment would mean the most to you?",
    options: [
      { text: "\"You can fix anything.\"",                  points: { hands: 2, problem: 1 } },
      { text: "\"You explain things so clearly.\"",         points: { communication: 2, people: 1 } },
      { text: "\"You're a natural leader.\"",               points: { leadership: 2, people: 1 } },
      { text: "\"You always find the smartest solution.\"", points: { problem: 2, analytical: 1 } }
    ]
  },
  {
    text: "Picture your ideal workday. Where are you?",
    options: [
      { text: "At a computer, building something new",   points: { tech: 2, creative: 1 } },
      { text: "Out with people, helping or teaching",    points: { people: 2, communication: 1 } },
      { text: "In a workshop, lab, or job site",         points: { hands: 2, tech: 1 } },
      { text: "Leading a meeting and making decisions",  points: { leadership: 2, analytical: 1 } }
    ]
  }
];

// Career areas and the strengths each one relies on.
const CAREERS = [
  { id: "engineering", name: "Engineering",               icon: "i-cog",       traits: ["problem", "analytical", "tech", "hands"], desc: "Design and improve machines, buildings, and systems.",               roles: ["Mechanical engineer", "Civil engineer", "Engineering technician"] },
  { id: "cs",          name: "Computer Science",          icon: "i-code",      traits: ["tech", "analytical", "problem"],          desc: "Build software, apps, and websites that solve problems.",            roles: ["Software developer", "IT specialist", "Cybersecurity analyst"] },
  { id: "data",        name: "Data Analytics",            icon: "i-data",      traits: ["analytical", "tech"],                     desc: "Turn numbers into insights that guide decisions.",                   roles: ["Data analyst", "Business analyst", "Research assistant"] },
  { id: "health",      name: "Healthcare",                icon: "i-health",    traits: ["people", "communication", "problem"],     desc: "Care for patients and help people stay healthy.",                     roles: ["Nurse", "Physical therapist", "Medical assistant"] },
  { id: "education",   name: "Education",                 icon: "i-student",   traits: ["communication", "people", "leadership"],  desc: "Teach, coach, and help others learn and grow.",                       roles: ["Teacher", "School counselor", "Coach"] },
  { id: "marketing",   name: "Marketing & Communications",icon: "i-megaphone", traits: ["creative", "communication"],              desc: "Tell stories that connect brands with people.",                      roles: ["Social media specialist", "Copywriter", "PR coordinator"] },
  { id: "design",      name: "Graphic & Digital Design",  icon: "i-spark",     traits: ["creative", "tech"],                       desc: "Create visuals, layouts, and digital experiences.",                  roles: ["Graphic designer", "UX designer", "Video editor"] },
  { id: "business",    name: "Business Management",       icon: "i-briefcase", traits: ["leadership", "communication", "analytical"], desc: "Lead teams and keep organizations running well.",                 roles: ["Operations manager", "Project coordinator", "Entrepreneur"] },
  { id: "finance",     name: "Finance & Accounting",      icon: "i-chart",     traits: ["analytical", "problem"],                  desc: "Manage money, budgets, and financial planning.",                     roles: ["Accountant", "Financial advisor", "Bank analyst"] },
  { id: "trades",      name: "Skilled Trades & Manufacturing", icon: "i-wrench", traits: ["hands", "problem"],                    desc: "Build, install, and repair the things communities depend on.",       roles: ["Electrician", "Machinist", "HVAC technician"] },
  { id: "social",      name: "Social Services",           icon: "i-people",    traits: ["people", "communication"],                desc: "Support individuals and families through challenges.",               roles: ["Social worker", "Youth program leader", "Case manager"] }
];

// Fictional example businesses. "home: true" means it shows on the home page.
const BUSINESSES = [
  { name: "Riverside Health Partners", type: "Healthcare",          icon: "i-health",    home: true, careers: ["health", "social"],
    desc: "Students shadow nurses, therapists, and front-desk staff to see how a clinic runs.",
    formats: ["Job shadow · 2–3 days", "Health careers week", "Patient-intake volunteer"], distance: "3 mi away" },
  { name: "Keystone Engineering Group", type: "Engineering firm",   icon: "i-cog",       home: true, careers: ["engineering", "trades", "data"],
    desc: "Students join site visits, learn basic CAD software, and help on a small design challenge.",
    formats: ["Job shadow · 3 days", "Design challenge · 2 weeks"], distance: "4 mi away" },
  { name: "Brightline Software", type: "Technology company",        icon: "i-code",      home: true, careers: ["cs", "design", "data"],
    desc: "Students test apps, help the IT desk, and write simple code alongside developers.",
    formats: ["Internship · 6 weeks", "Software testing project"], distance: "7 mi away" },
  { name: "Harbor & Pine Creative", type: "Marketing agency",       icon: "i-megaphone", home: true, careers: ["marketing", "design", "business"],
    desc: "Students brainstorm campaigns, draft social posts, and sit in on client meetings.",
    formats: ["Internship · 4 weeks", "Social media project"], distance: "2 mi away" },
  { name: "Summit Ridge Financial", type: "Financial services",     icon: "i-chart",     home: true, careers: ["finance", "business", "data"],
    desc: "Students shadow financial advisors and build a sample budget for a real-world scenario.",
    formats: ["Job shadow · 1 day", "Budgeting project · 1 week"], distance: "5 mi away" },
  { name: "Ironworks Manufacturing Co.", type: "Manufacturing",     icon: "i-factory",   home: true, careers: ["trades", "engineering", "business"],
    desc: "Students tour the production floor, assist with quality checks, and shadow maintenance techs.",
    formats: ["Job shadow · 2 days", "Summer work experience · 4 weeks"], distance: "9 mi away" },
  { name: "Clearview Data Lab", type: "Data analytics company",     icon: "i-data",      home: false, careers: ["data", "cs", "finance"],
    desc: "Students clean real (anonymized) datasets and present a chart-based finding to the team.",
    formats: ["Internship · 5 weeks", "Data project · 2 weeks"], distance: "6 mi away" },
  { name: "Lakeside Community Center", type: "Nonprofit",           icon: "i-people",    home: false, careers: ["education", "social", "health"],
    desc: "Students help run youth programs, tutor kids, and plan community events.",
    formats: ["Volunteer role · ongoing", "Youth program assistant · 6 weeks"], distance: "1 mi away" }
];

// Answers used to show an example profile if someone opens Results directly.
const EXAMPLE_ANSWERS = [0, 2, 1, 0, 3, 1, 3, 0, 3, 0];


/* ------------------------------------------------------------
   2. PAGE NAVIGATION
   Each "page" is a <div class="page" data-page="..."> in index.html.
   The part of the URL after # decides which page is shown.
   ------------------------------------------------------------ */
const ROUTES = {
  home:       { page: "home" },
  how:        { page: "home", section: "how", nav: "how" },
  partners:   { page: "home", section: "partners" },
  students:   { page: "students" },
  businesses: { page: "businesses" },
  about:      { page: "about" },
  contact:    { page: "contact" },
  assessment: { page: "assessment" },
  results:    { page: "results" }
};

function showRoute(name) {
  const route = ROUTES[name] || ROUTES.home;

  // Show the matching page, hide the others
  document.querySelectorAll(".page").forEach(function (page) {
    page.hidden = page.dataset.page !== route.page;
  });

  // Highlight the matching nav link
  const activeNav = route.nav || route.page;
  document.querySelectorAll(".main-nav a[data-nav]").forEach(function (link) {
    link.classList.toggle("is-active", link.dataset.nav === activeNav);
  });

  if (route.page === "results") renderResults();
  if (route.page === "assessment" && !quiz.inProgress) showIntro();

  closeMenu();

  // Scroll to a section, or to the top of the page
  if (route.section) {
    requestAnimationFrame(function () {
      document.getElementById(route.section).scrollIntoView({ behavior: "smooth" });
    });
  } else {
    window.scrollTo(0, 0);
  }
}

// Handle clicks on any internal link (also works when clicking the same link twice)
document.addEventListener("click", function (event) {
  const link = event.target.closest('a[href^="#"]');
  if (!link) return;
  const name = link.getAttribute("href").slice(1);
  if (!ROUTES[name]) return;
  event.preventDefault();
  if (location.hash.slice(1) === name) {
    showRoute(name);
  } else {
    location.hash = name;
  }
});

window.addEventListener("hashchange", function () {
  showRoute(location.hash.slice(1));
});


/* ------------------------------------------------------------
   3. MOBILE MENU
   ------------------------------------------------------------ */
const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");

menuToggle.addEventListener("click", function () {
  const isOpen = mainNav.classList.toggle("is-open");
  menuToggle.setAttribute("aria-expanded", isOpen);
  menuToggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
  menuToggle.querySelector("use").setAttribute("href", isOpen ? "#i-close" : "#i-menu");
});

function closeMenu() {
  mainNav.classList.remove("is-open");
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Open menu");
  menuToggle.querySelector("use").setAttribute("href", "#i-menu");
}


/* ------------------------------------------------------------
   4. HOME + STUDENT PAGE CONTENT
   ------------------------------------------------------------ */
function renderBusinessCards() {
  const grid = document.getElementById("bizGrid");
  grid.innerHTML = BUSINESSES.filter(function (b) { return b.home; }).map(function (b) {
    return `
      <article class="biz">
        <div class="biz__top">
          <span class="biz__icon">${icon(b.icon)}</span>
          <span class="tag tag--muted">Fictional example</span>
        </div>
        <p class="biz__type">${b.type}</p>
        <h3>${b.name}</h3>
        <p class="biz__desc">${b.desc}</p>
        <ul class="biz__opps">${b.formats.map(function (f) { return `<li>${f.split(" · ")[0]}</li>`; }).join("")}</ul>
      </article>`;
  }).join("");
}

function renderTraitGrid() {
  const list = document.getElementById("traitGrid");
  list.innerHTML = Object.keys(TRAITS).map(function (key) {
    const t = TRAITS[key];
    return `<li>${icon(t.icon)}<div><strong>${t.name}</strong><span>${t.desc}</span></div></li>`;
  }).join("");
}


/* ------------------------------------------------------------
   5. ASSESSMENT
   ------------------------------------------------------------ */
const quiz = {
  current: 0,                                  // index of the question on screen
  answers: new Array(QUESTIONS.length).fill(null),
  inProgress: false
};

const introEl  = document.getElementById("assessIntro");
const quizEl   = document.getElementById("assessQuiz");
const qText    = document.getElementById("qText");
const qOptions = document.getElementById("qOptions");
const qCounter = document.getElementById("qCounter");
const qPercent = document.getElementById("qPercent");
const qBar     = document.getElementById("qBar");
const qBack    = document.getElementById("qBack");
const qNext    = document.getElementById("qNext");

function showIntro() {
  introEl.hidden = false;
  quizEl.hidden = true;
}

function startQuiz() {
  quiz.current = 0;
  quiz.answers = new Array(QUESTIONS.length).fill(null);
  quiz.inProgress = true;
  introEl.hidden = true;
  quizEl.hidden = false;
  renderQuestion();
}

function renderQuestion() {
  const q = QUESTIONS[quiz.current];
  const total = QUESTIONS.length;
  const answered = quiz.answers.filter(function (a) { return a !== null; }).length;

  qCounter.textContent = `Question ${quiz.current + 1} of ${total}`;
  qPercent.textContent = Math.round((answered / total) * 100) + "%";
  qBar.style.width = (answered / total) * 100 + "%";
  qText.textContent = q.text;

  const letters = ["A", "B", "C", "D"];
  qOptions.innerHTML = q.options.map(function (opt, i) {
    const selected = quiz.answers[quiz.current] === i;
    return `<button type="button" class="option" role="radio" aria-checked="${selected}" data-index="${i}">
              <span class="option__key">${letters[i]}</span><span>${opt.text}</span>
            </button>`;
  }).join("");

  // Restart the fade animation for each new question
  quizEl.classList.remove("fade-in");
  void quizEl.offsetWidth;
  quizEl.classList.add("fade-in");

  qBack.disabled = quiz.current === 0;
  qNext.disabled = quiz.answers[quiz.current] === null;
  const isLast = quiz.current === total - 1;
  qNext.innerHTML = (isLast ? "See My Results " : "Next ") + icon("i-arrow");
}

// Choosing an answer
qOptions.addEventListener("click", function (event) {
  const btn = event.target.closest(".option");
  if (!btn) return;
  quiz.answers[quiz.current] = Number(btn.dataset.index);
  qOptions.querySelectorAll(".option").forEach(function (o) {
    o.setAttribute("aria-checked", o === btn);
  });
  qNext.disabled = false;

  const answered = quiz.answers.filter(function (a) { return a !== null; }).length;
  qPercent.textContent = Math.round((answered / QUESTIONS.length) * 100) + "%";
  qBar.style.width = (answered / QUESTIONS.length) * 100 + "%";
});

qNext.addEventListener("click", function () {
  if (quiz.answers[quiz.current] === null) return;
  if (quiz.current < QUESTIONS.length - 1) {
    quiz.current++;
    renderQuestion();
  } else {
    finishQuiz();
  }
});

qBack.addEventListener("click", function () {
  if (quiz.current > 0) {
    quiz.current--;
    renderQuestion();
  }
});

document.getElementById("startAssessment").addEventListener("click", startQuiz);

document.getElementById("retake").addEventListener("click", function () {
  quiz.inProgress = false;
  location.hash = "assessment";
  startQuiz();
});

let savedAnswers = null; // the student's latest completed answers

function finishQuiz() {
  savedAnswers = quiz.answers.slice();
  quiz.inProgress = false;
  try { localStorage.setItem("pathwayAnswers", JSON.stringify(savedAnswers)); } catch (e) { /* storage not available */ }
  location.hash = "results";
}


/* ------------------------------------------------------------
   6. SCORING
   Turns answers into strength percentages, career matches,
   and business matches.
   ------------------------------------------------------------ */
function scoreTraits(answers) {
  const raw = {};
  const max = {};
  Object.keys(TRAITS).forEach(function (key) { raw[key] = 0; max[key] = 0; });

  QUESTIONS.forEach(function (q, qi) {
    // Highest points each strength could earn on this question
    Object.keys(TRAITS).forEach(function (key) {
      max[key] += Math.max.apply(null, q.options.map(function (o) { return o.points[key] || 0; }));
    });
    // Points from the answer the student picked
    const pick = answers[qi];
    if (pick !== null && pick !== undefined) {
      const pts = q.options[pick].points;
      Object.keys(pts).forEach(function (key) { raw[key] += pts[key]; });
    }
  });

  const percent = {};
  Object.keys(TRAITS).forEach(function (key) {
    percent[key] = max[key] ? Math.round((raw[key] / max[key]) * 100) : 0;
  });
  return percent;
}

function rankCareers(traitPercent) {
  return CAREERS.map(function (c) {
    const total = c.traits.reduce(function (sum, t) { return sum + traitPercent[t]; }, 0);
    return Object.assign({}, c, { score: total / c.traits.length });
  }).sort(function (a, b) { return b.score - a.score; });
}

function rankBusinesses(topCareers) {
  const weights = [3, 2, 1]; // the #1 career counts most
  return BUSINESSES.map(function (b) {
    let score = 0;
    const matched = [];
    topCareers.forEach(function (c, i) {
      if (b.careers.includes(c.id)) { score += weights[i]; matched.push(c.name); }
    });
    return Object.assign({}, b, { score: score, matched: matched });
  })
  .filter(function (b) { return b.score > 0; })
  .sort(function (a, b) { return b.score - a.score; });
}


/* ------------------------------------------------------------
   7. RESULTS PAGE
   ------------------------------------------------------------ */
function renderResults() {
  // Use the student's answers, or fall back to the example profile
  if (!savedAnswers) {
    try {
      const stored = JSON.parse(localStorage.getItem("pathwayAnswers"));
      if (Array.isArray(stored) && stored.length === QUESTIONS.length) savedAnswers = stored;
    } catch (e) { /* storage not available */ }
  }
  const isExample = !savedAnswers;
  const answers = savedAnswers || EXAMPLE_ANSWERS;
  document.getElementById("exampleNotice").hidden = !isExample;

  const percent = scoreTraits(answers);
  const sortedTraits = Object.keys(percent).sort(function (a, b) { return percent[b] - percent[a]; });
  const topTraits = sortedTraits.slice(0, 3);
  const topCareers = rankCareers(percent).slice(0, 3);
  const topBiz = rankBusinesses(topCareers).slice(0, 3);

  document.getElementById("resultsLede").textContent =
    `Your answers point to strengths in ${TRAITS[topTraits[0]].name.toLowerCase()}, ${TRAITS[topTraits[1]].name.toLowerCase()}, and ${TRAITS[topTraits[2]].name.toLowerCase()}. Use this as a starting point for exploring, not a final answer.`;

  // Top strengths
  document.getElementById("topStrengths").innerHTML = topTraits.map(function (key, i) {
    const t = TRAITS[key];
    return `
      <article class="strength">
        <div class="strength__top">
          <span class="strength__icon">${icon(t.icon)}</span>
          <span class="strength__rank">#${i + 1}</span>
        </div>
        <h3>${t.name}</h3>
        <p>${t.desc}</p>
        ${meter(percent[key])}
      </article>`;
  }).join("");

  // Career areas
  document.getElementById("careerList").innerHTML = topCareers.map(function (c) {
    const uses = c.traits.filter(function (t) { return topTraits.includes(t); })
                         .map(function (t) { return TRAITS[t].name.toLowerCase(); });
    const why = uses.length
      ? `Uses your ${joinWords(uses)}.`
      : `Builds on your ${TRAITS[c.traits[0]].name.toLowerCase()} score.`;
    return `
      <article class="career">
        <span class="career__icon">${icon(c.icon)}</span>
        <h3>${c.name}</h3>
        <p>${c.desc}</p>
        <p class="career__why"><strong>Why it fits:</strong> ${why}</p>
        <ul class="career__roles">${c.roles.map(function (r) { return `<li>${r}</li>`; }).join("")}</ul>
      </article>`;
  }).join("");

  // Opportunities
  const bestScore = topBiz.length ? topBiz[0].score : 1;
  document.getElementById("oppList").innerHTML = topBiz.map(function (b) {
    const strong = b.score >= bestScore && b.score >= 3;
    return `
      <article class="opp">
        <div class="opp__top">
          <span class="biz__icon">${icon(b.icon)}</span>
          <span class="pill ${strong ? "pill--strong" : ""}">${strong ? "Strong match" : "Good match"}</span>
        </div>
        <div>
          <p class="biz__type">${b.type} · ${b.distance}</p>
          <h3>${b.name}</h3>
        </div>
        <p>${b.desc}</p>
        <ul class="opp__formats">${b.formats.map(function (f) { return `<li>${icon("i-clock")}${f}</li>`; }).join("")}</ul>
        <p><strong>Matches:</strong> ${b.matched.join(", ")}</p>
        <button type="button" class="btn btn--primary btn--sm" data-request="${b.name}">Request This Opportunity</button>
      </article>`;
  }).join("");

  // Full profile (all eight areas)
  document.getElementById("fullProfile").innerHTML = sortedTraits.map(function (key) {
    return `<li><span class="profile__name">${icon(TRAITS[key].icon)}${TRAITS[key].name}</span>${meter(percent[key])}</li>`;
  }).join("");

  // Animate meters from 0 to their value
  requestAnimationFrame(function () {
    requestAnimationFrame(function () {
      document.querySelectorAll(".meter__fill").forEach(function (el) { el.style.width = el.dataset.value + "%"; });
    });
  });
}

// "Request This Opportunity" buttons
document.getElementById("oppList").addEventListener("click", function (event) {
  const btn = event.target.closest("[data-request]");
  if (!btn) return;
  btn.disabled = true;
  btn.innerHTML = icon("i-check") + " Requested";
  showToast(`Demo: in the real platform, your profile would be sent to ${btn.dataset.request}'s student coordinator.`);
});


/* ------------------------------------------------------------
   8. FORMS
   Prototype only: nothing is sent anywhere.
   ------------------------------------------------------------ */
function setError(id, message) {
  const errorEl = document.querySelector(`[data-error-for="${id}"]`);
  if (errorEl) errorEl.textContent = message || "";
  const field = errorEl ? errorEl.closest(".field") : null;
  if (field) field.classList.toggle("has-error", Boolean(message));
}

function isEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

// Contact form
const contactForm = document.getElementById("contactForm");
contactForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const name = document.getElementById("cName").value.trim();
  const email = document.getElementById("cEmail").value.trim();
  const type = document.getElementById("cType").value;
  const message = document.getElementById("cMessage").value.trim();
  let ok = true;

  setError("cName", name ? "" : "Enter your name.");
  setError("cEmail", isEmail(email) ? "" : "Enter a valid email, like you@example.com.");
  setError("cType", type ? "" : "Choose who you are so we can route your message.");
  setError("cMessage", message.length >= 10 ? "" : "Write a message of at least 10 characters.");
  if (!name || !isEmail(email) || !type || message.length < 10) ok = false;
  if (!ok) return;

  document.getElementById("contactSuccessText").textContent =
    `Thanks, ${name.split(" ")[0]}! In the real platform, our team would reply to ${email} within two business days.`;
  contactForm.hidden = true;
  document.getElementById("contactSuccess").hidden = false;
});

document.getElementById("contactReset").addEventListener("click", function () {
  contactForm.reset();
  contactForm.hidden = false;
  document.getElementById("contactSuccess").hidden = true;
});

// Partner form (inside the pop-up)
const partnerForm = document.getElementById("partnerForm");
partnerForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const biz = document.getElementById("pBiz").value.trim();
  const name = document.getElementById("pName").value.trim();
  const email = document.getElementById("pEmail").value.trim();
  const industry = document.getElementById("pIndustry").value;
  const types = ["pShadow", "pIntern", "pProject"].filter(function (id) {
    return document.getElementById(id).checked;
  });

  setError("pBiz", biz ? "" : "Enter your business name.");
  setError("pName", name ? "" : "Enter your name.");
  setError("pEmail", isEmail(email) ? "" : "Enter a valid email address.");
  setError("pIndustry", industry ? "" : "Choose an industry.");
  setError("pTypes", types.length ? "" : "Pick at least one type of experience.");
  if (!biz || !name || !isEmail(email) || !industry || !types.length) return;

  document.getElementById("partnerSuccessText").textContent =
    `Thanks! In the real platform, a partnerships coordinator would contact ${name.split(" ")[0]} at ${biz} within one week.`;
  partnerForm.hidden = true;
  document.getElementById("partnerSuccess").hidden = false;
});


/* ------------------------------------------------------------
   9. HELPERS
   ------------------------------------------------------------ */
// Returns the HTML for an icon from the sprite in index.html
function icon(id) {
  return `<svg class="icon" aria-hidden="true"><use href="#${id}"/></svg>`;
}

// Returns the HTML for a progress meter
function meter(value) {
  return `<div class="meter" role="img" aria-label="${value} percent">
            <div class="meter__track"><div class="meter__fill" data-value="${value}"></div></div>
            <span class="meter__val">${value}%</span>
          </div>`;
}

// "a, b, and c"
function joinWords(words) {
  if (words.length < 2) return words.join("");
  if (words.length === 2) return words.join(" and ");
  return words.slice(0, -1).join(", ") + ", and " + words[words.length - 1];
}

// Small pop-up message at the bottom of the screen
let toastTimer;
function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.hidden = false;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(function () { toast.hidden = true; }, 4500);
}

// Partner pop-up open / close
const modal = document.getElementById("partnerModal");

function openPartnerModal() {
  partnerForm.reset();
  partnerForm.querySelectorAll("[data-error-for]").forEach(function (el) { setError(el.dataset.errorFor, ""); });
  partnerForm.hidden = false;
  document.getElementById("partnerSuccess").hidden = true;
  modal.hidden = false;
  document.body.style.overflow = "hidden";
  document.getElementById("pBiz").focus();
}

function closePartnerModal() {
  modal.hidden = true;
  document.body.style.overflow = "";
}

document.querySelectorAll("[data-open-partner]").forEach(function (btn) {
  btn.addEventListener("click", openPartnerModal);
});
modal.addEventListener("click", function (event) {
  if (event.target.closest("[data-close-modal]")) closePartnerModal();
});
document.addEventListener("keydown", function (event) {
  if (event.key === "Escape" && !modal.hidden) closePartnerModal();
});


/* ------------------------------------------------------------
   START
   ------------------------------------------------------------ */
renderBusinessCards();
renderTraitGrid();
showRoute(location.hash.slice(1) || "home");
