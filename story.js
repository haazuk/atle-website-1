// Loading Screen
window.addEventListener("load", function(){
	let hoverImagesContainer = document.getElementById('imageHover');
	let loadingScreen = document.getElementById('loadingScreen');
	loadingScreen.style.opacity = '0';
	loadingScreen.style.zIndex = '-1';
	hoverImagesContainer.style.opacity = '1';
});




// Highlighting Mechanic For Animated Text Sections
const highlight = document.getElementById("highlight-style");
const mode = document.getElementById("mode");

gsap.registerPlugin(ScrollTrigger);

gsap.utils.toArray(".text-highlight").forEach((highlight) => {
  ScrollTrigger.create({
    trigger: highlight,
    start: "-100px center",
    onEnter: () => highlight.classList.add("active")
  });
});

const setHighlightStyle = (value) =>
  document.body.setAttribute("data-highlight", value);

mode.addEventListener("click", (e) =>
  document.body.classList.toggle("dark-mode")
);

highlight.addEventListener("change", (e) => setHighlightStyle(e.target.value));

setHighlightStyle(highlight.value);


//Navigation

$(document).ready(function () {
  $("html").on("DOMMouseScroll mousewheel", function (e) {
    if (e.originalEvent.detail > 0 || e.originalEvent.wheelDelta < 0) {
      //alternative options for wheelData: wheelDeltaX & wheelDeltaY
      //scroll down
      console.log("Down");
      $("#header-nav").addClass("hide-nav-bar");
    } else {
      //scroll up
      console.log("Up");
      $("#header-nav").removeClass("hide-nav-bar");
    }
    //prevent page fom scrolling
    //return false;
  });

  // On click show menu on small screen

  $("body").addClass("js");
  var $menu = $("#menu"),
    $menulink = $(".menu-link");

  $menulink.click(function () {
    $menulink.toggleClass("active");
    $menu.toggleClass("active");
    return false;
  });

  var toggled = 0;

  $(".menu-link").click(function () {
    if (toggled == 0) {
      $(".bar3").stop().transition({ rotate: "45", "margin-top": "13px" });
      $(".bar2").stop().transition({ opacity: "0" }, "fast");
      $(".bar1").stop().transition({ rotate: "-45", "margin-top": "13px" });
      toggled++;
      console.log("toggled down");
    } else {
      $(".bar3").stop().transition({ rotate: "+=135", "margin-top": "3px" });
      $(".bar2").transition({ opacity: "1" }, "fast");
      $(".bar1").stop().transition({ rotate: "-=135", "margin-top": "23px" });
      toggled--;
      console.log("Togged Up");
    }
  });
});

