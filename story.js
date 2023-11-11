// Loading Screen
window.addEventListener("load", function() {
  let hoverImagesContainer = document.getElementById('imageHover'); // Get the element with the id 'imageHover'
  let loadingScreen = document.getElementById('loadingScreen'); // Get the element with the id 'loadingScreen'
  loadingScreen.style.opacity = '0'; // Set the opacity of the loading screen to 0 (hides it)
  loadingScreen.style.zIndex = '-1'; // Set the z-index of the loading screen to -1 (moves it behind other elements)
  hoverImagesContainer.style.opacity = '1'; // Set the opacity of the 'imageHover' container to 1 (makes it visible)
});

// Highlighting Mechanic For Animated Text Sections
const highlight = document.getElementById("highlight-style");
const mode = document.getElementById("mode");

// Register ScrollTrigger plugin for animation
gsap.registerPlugin(ScrollTrigger);

// Add animation to elements with the 'text-highlight' class when they enter the viewport
gsap.utils.toArray(".text-highlight").forEach((highlight) => {
  ScrollTrigger.create({
    trigger: highlight,
    start: "-100px center",
    onEnter: () => highlight.classList.add("active") // Add 'active' class to trigger element
  });
});

// Function to set the highlight style
const setHighlightStyle = (value) =>
  document.body.setAttribute("data-highlight", value);

// Toggle dark mode when the 'mode' element is clicked
mode.addEventListener("click", (e) =>
  document.body.classList.toggle("dark-mode")
);

// Change the highlight style when the 'highlight' element value changes
highlight.addEventListener("change", (e) => setHighlightStyle(e.target.value));

setHighlightStyle(highlight.value); // Set initial highlight style

// Navigation functionality using jQuery
$(document).ready(function() {
  // Detect scroll events and adjust the navigation bar
  $("html").on("DOMMouseScroll mousewheel", function(e) {
    if (e.originalEvent.detail > 0 || e.originalEvent.wheelDelta < 0) {
      // Scroll down
      console.log("Down");
      $("#header-nav").addClass("hide-nav-bar");
    } else {
      // Scroll up
      console.log("Up");
      $("#header-nav").removeClass("hide-nav-bar");
    }
    // Prevent the default page scroll behavior
    // return false;
  });

  // Show/hide a menu on small screens
  $("body").addClass("js");
  var $menu = $("#menu"),
    $menulink = $(".menu-link");

  $menulink.click(function() {
    $menulink.toggleClass("active");
    $menu.toggleClass("active");
    return false;
  });

  var toggled = 0;

  // Toggle menu button animation
  $(".menu-link").click(function() {
    if (toggled == 0) {
      $(".bar3").stop().transition({ rotate: "45", "margin-top": "13px" });
      $(".bar2").stop().transition({ opacity: "0" }, "fast");
      $(".bar1").stop().transition({ rotate: "-45", "margin-top": "13px" });
      toggled++;
      console.log("Toggled down");
    } else {
      $(".bar3").stop().transition({ rotate: "+=135", "margin-top": "3px" });
      $(".bar2").transition({ opacity: "1" }, "fast");
      $(".bar1").stop().transition({ rotate: "-=135", "margin-top": "23px" });
      toggled--;
      console.log("Toggled Up");
    }
  });
});

// Function to fetch current time and start a countdown
function pullTime() {
  // Fetch current time from an API
  fetch('https://api.timezonedb.com/v2.1/get-time-zone?key=6IFWYMZG93VG&format=json&by=zone&zone=New-Zealand')
    .then(response => response.json()) // Parse the response as JSON
    .then(data => {
      const currentTime = data.formatted; // Extract the current time from the API response
      const targetDate = new Date('2023-11-25T00:00:00Z'); // Define the target date
      const timeRemaining = calculateTimeRemaining(currentTime, targetDate); // Calculate the time remaining
      displayTimeRemaining(timeRemaining); // Display the time remaining
    });
}

// Calculate time remaining between current time and a target date
function calculateTimeRemaining(currentTime, targetDate) {
  const timeDiff = targetDate - new Date(currentTime); // Calculate the time difference in milliseconds
  const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24)); // Calculate days
  const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)); // Calculate hours
  const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60)); // Calculate minutes
  return { days, hours, minutes };
}

// Display the time remaining in the HTML
function displayTimeRemaining(timeRemaining) {
  document.getElementById('days').textContent = timeRemaining.days; // Set the content of the 'days' element
  document.getElementById('hours').textContent = timeRemaining.hours; // Set the content of the 'hours' element
  document.getElementById('minutes').textContent = timeRemaining.minutes; // Set the content of the 'minutes' element
}

// Start a countdown by periodically recalculating time remaining
function startCountdown() {
  calculateTimeRemaining();
  setInterval(() => {
    calculateTimeRemaining();
  }, 10); // Recalculate every 10 milliseconds
}
