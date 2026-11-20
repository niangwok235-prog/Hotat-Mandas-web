/* =====================================
   HATOT & MANDAS FAMILY WEBSITE
===================================== */


/* FAMILY BRANCHES */

const familyBranches = [
  {
    name: "RICKSON",
    id: "rickson",
    photo: "images/branches/rickson.jpg",
    members: [
      "MATILDAH",
      "JEPTAI",
      "UMAN",
      "EISH",
      "NIANUNG",
      "DIDI",
    ]
  },

  {
    name: "YAMASKI",
    id: "yamaski",
    photo: "images/branches/yamaski.jpg",
    members: [
      "MAILIN",
      "ELLY",
      "ENMAS",
      "LOHELIA",
      "EMHUT",
      "JIMO",
      "JIMAH"
    ]
  },

  {
    name: "JERRAH",
    id: "jerrah",
    photo: "images/branches/jerrah.jpg",
    members: [
      "AIMAH",
      "PHILCHRIS",
      "PRIMTAI",
      "BRICKIL",
      "BEMAH"
    ]
  },

  {
    name: "IMELDAH",
    id: "imeldah",
    photo: "images/branches/imeldah.jpg",
    members: [
      "JIMOX",
      "MONEX",
    ]
  },

  {
    name: "ENDAH",
    id: "endah",
    photo: "images/branches/endah.jpg",
    members: [
      "NAITSILAH",
      "NAPINAH"
    ]
  }
];


/* MEMBER DATA */

const familyMembers = familyBranches.flatMap(branch =>
  branch.members.map(name => ({
    name,
    branch: branch.id,
    photo: `images/members/${name.toLowerCase()}.jpg`
  }))
);


/* PLACEHOLDER IMAGE */

function createPlaceholder(name) {

  const initials = name.substring(0, 2);

  const svg = `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600">
    <defs>
      <linearGradient id="purple" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#42258f"/>
        <stop offset="50%" stop-color="#6d45d9"/>
        <stop offset="100%" stop-color="#a98bff"/>
      </linearGradient>
    </defs>

    <rect width="600" height="600" fill="#100d1b"/>

    <circle cx="300" cy="240" r="145"
      fill="none" stroke="url(#purple)" stroke-width="4"/>

    <text x="300" y="280"
      font-size="115"
      text-anchor="middle"
      font-family="Georgia"
      fill="#a98bff">${initials}</text>

    <text x="300" y="460"
      font-size="34"
      text-anchor="middle"
      font-family="Georgia"
      fill="white">${name}</text>

    <text x="300" y="510"
      font-size="18"
      text-anchor="middle"
      letter-spacing="6"
      fill="#a98bff">H&M FAMILY</text>
  </svg>`;

  return "data:image/svg+xml;charset=UTF-8," +
    encodeURIComponent(svg);
}


/* IMAGE FALLBACK */

function setupImageFallbacks(root = document) {

  root.querySelectorAll("img[data-fallback]").forEach(img => {

    img.onerror = function() {

      this.onerror = null;

      this.src = createPlaceholder(
        this.dataset.name || "H&M"
      );

    };

  });

}


/* FAMILY BRANCHES */

const branchList = document.getElementById("branchList");


function renderBranches() {

  branchList.innerHTML = familyBranches.map((branch, index) => `

    <article class="branch-card" id="branch-${branch.id}">

      <button
        type="button"
        class="branch-toggle"
        aria-expanded="false"
        aria-controls="panel-${branch.id}"
        data-branch="${branch.id}"
      >

        <div class="branch-thumb">

          <img
            src="${branch.photo}"
            alt="${branch.name} family"
            data-fallback
            data-name="${branch.name}"
          >

        </div>

        <div class="branch-title">

          <h3>${branch.name}</h3>

          <p>Hatot & Mandas Family Branch</p>

          <span class="branch-count">
            ${branch.members.length} listed entries
          </span>

        </div>

        <span class="branch-arrow" aria-hidden="true">+</span>

      </button>


      <div
        class="branch-panel"
        id="panel-${branch.id}"
        aria-hidden="true"
      >

        <div class="branch-panel-inner">

          <div class="branch-content">

            <img
              class="branch-large-image"
              src="${branch.photo}"
              alt="${branch.name} family photograph"
              data-fallback
              data-name="${branch.name}"
            >

            <h4>${branch.name} Family Members</h4>

            <div class="branch-member-grid">

              ${branch.members.map(name => `

                <div class="branch-member">

                  <img
                    src="images/members/${name.toLowerCase()}.jpg"
                    alt="${name}"
                    data-fallback
                    data-name="${name}"
                  >

                  <p>${name}</p>

                </div>

              `).join("")}

            </div>

          </div>

        </div>

      </div>

    </article>

  `).join("");


  setupImageFallbacks(branchList);

  setupBranchControls();

}

renderBranches();


/* OPEN AND CLOSE INDIVIDUAL BRANCHES */

function setBranchState(card, open) {

  const button = card.querySelector(".branch-toggle");
  const panel = card.querySelector(".branch-panel");

  card.classList.toggle("open", open);

  button.setAttribute("aria-expanded", String(open));

  panel.setAttribute("aria-hidden", String(!open));

}


function setupBranchControls() {

  branchList.querySelectorAll(".branch-toggle").forEach(button => {

    button.addEventListener("click", () => {

      const card = button.closest(".branch-card");

      const currentlyOpen = card.classList.contains("open");

      setBranchState(card, !currentlyOpen);

    });

  });

}


/* OPEN ALL BRANCHES */

document.getElementById("openAll").addEventListener("click", () => {

  document.querySelectorAll(".branch-card").forEach(card => {
    setBranchState(card, true);
  });

});


/* CLOSE ALL BRANCHES */

document.getElementById("closeAll").addEventListener("click", () => {

  document.querySelectorAll(".branch-card").forEach(card => {
    setBranchState(card, false);
  });

});


/* FAMILY MEMBER DIRECTORY */

const memberGrid = document.getElementById("memberGrid");

const memberSearch = document.getElementById("memberSearch");

const memberFilter = document.getElementById("memberFilter");

const noResults = document.getElementById("noResults");


function renderMembers() {

  const search = memberSearch.value.trim().toUpperCase();

  const selectedBranch = memberFilter.value;

  const filtered = familyMembers.filter(member => {

    const nameMatches = member.name.includes(search);

    const branchMatches =
      selectedBranch === "all" ||
      member.branch === selectedBranch;

    return nameMatches && branchMatches;

  });


  memberGrid.innerHTML = filtered.map(member => `

    <article class="member-card">

      <img
        src="${member.photo}"
        alt="${member.name}"
        data-fallback
        data-name="${member.name}"
        loading="lazy"
      >

      <div class="member-details">

        <h3>${member.name}</h3>

        <span>${member.branch} branch</span>

        <p>Hatot & Mandas Family</p>

      </div>

    </article>

  `).join("");


  noResults.hidden = filtered.length > 0;

  setupImageFallbacks(memberGrid);

}


renderMembers();

memberSearch.addEventListener("input", renderMembers);

memberFilter.addEventListener("change", renderMembers);


/* OTHER IMAGE FALLBACKS */

setupImageFallbacks();


/* MOBILE NAVIGATION */

const menuToggle = document.getElementById("menuToggle");

const navigation = document.getElementById("navigation");


menuToggle.addEventListener("click", () => {

  const open = navigation.classList.toggle("active");

  menuToggle.setAttribute("aria-expanded", String(open));

});


navigation.querySelectorAll("a").forEach(link => {

  link.addEventListener("click", () => {

    navigation.classList.remove("active");

    menuToggle.setAttribute("aria-expanded", "false");

  });

});


document.addEventListener("click", event => {

  if (
    !navigation.contains(event.target) &&
    !menuToggle.contains(event.target)
  ) {

    navigation.classList.remove("active");

    menuToggle.setAttribute("aria-expanded", "false");

  }

});


/* GALLERY LIGHTBOX */

const galleryImages = [
  ...document.querySelectorAll(".gallery-item img")
];

const lightbox = document.getElementById("lightbox");

const lightboxImage = document.getElementById("lightboxImage");

const currentImage = { index: 0 };


function showGalleryImage(index) {

  if (!galleryImages.length) return;

  currentImage.index =
    (index + galleryImages.length) % galleryImages.length;

  lightboxImage.src = galleryImages[currentImage.index].src;

  lightboxImage.alt = galleryImages[currentImage.index].alt;

}


galleryImages.forEach((img, index) => {

  img.addEventListener("click", () => {

    showGalleryImage(index);

    lightbox.classList.add("active");

    lightbox.setAttribute("aria-hidden", "false");

  });

});


function closeLightbox() {

  lightbox.classList.remove("active");

  lightbox.setAttribute("aria-hidden", "true");

  lightboxImage.src = "";

}


document.getElementById("lightboxClose")
  .addEventListener("click", closeLightbox);


document.getElementById("lightboxPrev")
  .addEventListener("click", () => {
    showGalleryImage(currentImage.index - 1);
  });


document.getElementById("lightboxNext")
  .addEventListener("click", () => {
    showGalleryImage(currentImage.index + 1);
  });


lightbox.addEventListener("click", event => {

  if (event.target === lightbox) closeLightbox();

});


document.addEventListener("keydown", event => {

  if (!lightbox.classList.contains("active")) return;

  if (event.key === "Escape") closeLightbox();

  if (event.key === "ArrowLeft") {
    showGalleryImage(currentImage.index - 1);
  }

  if (event.key === "ArrowRight") {
    showGalleryImage(currentImage.index + 1);
  }

});


/* CONTACT FORM */

const FAMILY_CONTACT_EMAIL = "";

const contactForm = document.getElementById("contactForm");

const formNote = document.getElementById("formNote");


contactForm.addEventListener("submit", event => {

  event.preventDefault();

  const name =
    document.getElementById("contactName").value.trim();

  const email =
    document.getElementById("contactEmail").value.trim();

  const subject =
    document.getElementById("contactSubject").value;

  const message =
    document.getElementById("contactMessage").value.trim();


  if (!name || !email || !subject || !message) {

    formNote.textContent = "Please complete all fields.";

    return;

  }


  if (!FAMILY_CONTACT_EMAIL) {

    formNote.textContent =
      "Please configure the administrator email in script.js before sending.";

    return;

  }


  const emailSubject = encodeURIComponent(
    "Hatot & Mandas Family: " + subject
  );

  const emailBody = encodeURIComponent(
    `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\n\nMessage:\n${message}`
  );


  window.location.href =
    `mailto:${FAMILY_CONTACT_EMAIL}?subject=${emailSubject}&body=${emailBody}`;

  formNote.textContent =
    "Your email application is opening with your message.";

});


/* COPYRIGHT YEAR */

document.getElementById("year").textContent =
  new Date().getFullYear();



