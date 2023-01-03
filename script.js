const menuBtn = document.querySelector(".menu-btn");
const ul = document.querySelector(".ul");
const alink = document.querySelectorAll(".a-link");

const hiddenelements = document.querySelectorAll(".hidden");

const fullsections = document.querySelectorAll(".full-section");

function toggleSideBar() {
  menuBtn.classList.toggle("active");
  ul.classList.toggle("remove");
}

menuBtn.addEventListener("click", toggleSideBar);
alink.forEach((link) => {
  link.addEventListener("click", () => {
    ul.classList.remove("remove");
    menuBtn.classList.remove("active");
  });
});

const obs = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      // console.log(entry);
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  },
  {
    threshold: 0.2,
  }
);

hiddenelements.forEach((el) => {
  obs.observe(el);
});

function scrollactive() {
  const scrollY = window.pageYOffset;

  fullsections.forEach((section) => {
    const sectionheight = section.offsetHeight;

    const sectiontop = section.offsetTop - 50;

    sectionid = section.getAttribute("id");

    if (scrollY > sectiontop && scrollY <= sectiontop + sectionheight) {
      document.querySelector(`.a-${sectionid}`).classList.add("highlight");
    } else {
      document.querySelector(`.a-${sectionid}`).classList.remove("highlight");
    }
  });
}

window.addEventListener("scroll", scrollactive);

// console.log(document.querySelectorAll(".a-link"));

const scriptURL =
  "https://script.google.com/macros/s/AKfycbwgYcHoav9npxRQR4mNDxKLaS98S0yxIcZ1SCRmt6_ZOeSGlWsiDbcbFUrjajtGZ4zfzw/exec";
const form = document.forms["submit-to-google-sheet"];

const msg = document.getElementById("msg");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  fetch(scriptURL, { method: "POST", body: new FormData(form) })
    .then((response) => {
      msg.innerHTML = "message sent successfully";
      setTimeout(() => {
        msg.innerHTML = "";
      }, 5000);
      form.reset();
    })
    .catch((error) => console.error("Error!", error.message));
});
