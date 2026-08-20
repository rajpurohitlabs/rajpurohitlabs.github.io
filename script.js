// Smooth scrolling for navigation links

document.querySelectorAll('a[href^="#"]').forEach(function (link) {

  link.addEventListener("click", function (event) {

    const targetId = this.getAttribute("href");

    const target = document.querySelector(targetId);

    if (target) {
      event.preventDefault();

      target.scrollIntoView({
        behavior: "smooth"
      });
    }

  });

});


// Small welcome message in browser console

console.log("Welcome to Shree Ji Computer Classes!");


// Call button confirmation

const callButtons = document.querySelectorAll('a[href^="tel:"]');

callButtons.forEach(function (button) {

  button.addEventListener("click", function () {

    console.log("Calling Shree Ji Computer Classes...");

  });

});
