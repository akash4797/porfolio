const typedTextSpan = document.querySelector(".typed-text");
const cursorSpan = document.querySelector(".cursor");

const textArary = ["Designer.", "Programmer.", "Developer.", "Vocalist."];
const typingDelay = 75;
const erasingDelay = 50;
const newTextDelay = 3000;
let textArrayIndex = 0;
let charIndex = 0;

function type() {
  if (charIndex < textArary[textArrayIndex].length) {
    if (!cursorSpan.classList.contains("cursor-typing"))
      cursorSpan.classList.add("cursor-typing");
    typedTextSpan.textContent += textArary[textArrayIndex].charAt(charIndex);
    charIndex++;
    setTimeout(type, typingDelay);
  } else {
    cursorSpan.classList.remove("cursor-typing");
    setTimeout(erase, newTextDelay);
  }
}

function erase() {
  if (charIndex > 0) {
    if (!cursorSpan.classList.contains("cursor-typing"))
      cursorSpan.classList.add("typing");
    typedTextSpan.textContent = textArary[textArrayIndex].substring(
      0,
      charIndex - 1
    );
    charIndex--;
    setTimeout(erase, erasingDelay);
  } else {
    cursorSpan.classList.remove("cursor-typing");
    textArrayIndex++;
    if (textArrayIndex >= textArary.length) textArrayIndex = 0;
    setTimeout(type, typingDelay + 1100);
  }
}

document.addEventListener("DOMContentLoaded", function() {
  if (textArary.length) setTimeout(type, newTextDelay + 250);
});

$(document).ready(function() {
  let $btn = $(".project-area .button-group button");
  $btn.click(function(e) {
    $(".project-area .button-group button").removeClass("active");
    e.target.classList.add("active");
    let selector = $(e.target).attr("data-filter");
    $(".project-area .grid").isotope({
      filter: selector
    });
    return false;
  });

  $(".project-area .grid .test-popup-link").magnificPopup({
    type: "inline",
    midClick: true,
    mainClass: "mfp-fade",
    removalDelay: 160,
    fixedContentPos: true
  });

  // sticky navigation menu

  let nav_offset_top = $(".header_area").height() + 50;

  function navbarFixed() {
    if ($(".header_area").length) {
      $(window).scroll(function() {
        let scroll = $(window).scrollTop();
        if (scroll >= nav_offset_top) {
          $(".header_area .main_menu").addClass("navbar_fixed");
        } else {
          $(".header_area .main_menu").removeClass("navbar_fixed");
        }
      });
    }
  }

  navbarFixed();

  $('a[href*="#"]')
    .not('[href="#"]')
    .not('[href="#0"]')
    .click(function(event) {
      if (
        location.pathname.replace(/^\//, "") ==
          this.pathname.replace(/^\//, "") &&
        location.hostname == this.hostname
      ) {
        var target = $(this.hash);
        target = target.length
          ? target
          : $("[name=" + this.hash.slice(1) + "]");
        if (target.length) {
          event.preventDefault();
          $("html, body").animate(
            {
              scrollTop: target.offset().top
            },
            1000,
            function() {
              var $target = $(target);
              $target.focus();

              if ($target.is(":focus")) {
                return false;
              } else {
                $target.attr("tabindex", "-1");
                $target.focus();
              }
            }
          );
        }
      }
    });
});
