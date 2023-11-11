// Loading Screen
window.addEventListener("load", function() {
  let 
    hoverImagesContainer = document.getElementById('imageHover'); // Get the element with the id 'imageHover'
  let loadingScreen = document.getElementById('loadingScreen');   // Get the element with the id 'loadingScreen'
  loadingScreen.style.opacity = '0';   // Set the opacity of the loading screen to 0 (hides it)
  loadingScreen.style.zIndex = '-2';   // Set the z-index of the loading screen to -2 (moves it behind other elements)
  hoverImagesContainer.style.opacity = '1';   // Set the opacity of the 'imageHover' container to 1 (makes it visible)
});

// Function to fetch current time and start a countdown
function pullTime() {
  // Fetch current time from an API
  fetch('https://api.timezonedb.com/v2.1/get-time-zone?key=6IFWYMZG93VG&format=json&by=zone&zone=New-Zealand')
    .then(response => response.json())   // Parse the response as JSON
    .then(data => {
      const currentTime = data.formatted;   // Extract the current time from the API response
      const targetDate = new Date('2023-11-25T00:00:00Z');   // Define the target date
      const timeRemaining = calculateTimeRemaining(currentTime, targetDate);  // Calculate the time remaining
      displayTimeRemaining(timeRemaining);  // Display the time remaining
    });
}

// Calculate time remaining between current time and a target date
function calculateTimeRemaining(currentTime, targetDate) {
  const timeDiff = targetDate - new Date(currentTime);   // Calculate the time difference in milliseconds
  const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));   // Calculate days
  const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));   // Calculate hours
  const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));   // Calculate minutes
  return { days, hours, minutes };   // Return an object with days, hours, and minutes
}

// Display the time remaining in the HTML
function displayTimeRemaining(timeRemaining) {
  document.getElementById('days').textContent = timeRemaining.days;   // Set the content of the 'days' element
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
  var $menu = $("#menu");
  var $menulink = $(".menu-link");

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
      console.log("Toggled up");
    }
  });
});

// Horizontal scrolling functionality
const track = document.querySelector('.h-track');

if (track) {
  track.classList.add('invisible-scrollbar');
  const trackContainer = track.querySelector('.h-content-container');

  let registeredScroll = false;
  let outerWidth = track.offsetWidth;
  let innerWidth = trackContainer.scrollWidth;

  const updatePct = () => {
    const pct = (track.scrollLeft / (innerWidth - outerWidth)) * 100;

    track.dataset.scrollPercent = pct;
    document.documentElement.style.setProperty('--scroll-pct', `${track.dataset.scrollPercent}%`);
  };
  updatePct();

  window.addEventListener('resize', (e) => {
    outerWidth = track.offsetWidth;
    innerWidth = trackContainer.scrollWidth;
    updatePct();
  });

  // Handle scroll events and update scroll position
  track.addEventListener("scroll", (evt) => {
    if (!registeredScroll) {
      track.setAttribute('data-scroll', track.scrollLeft + evt.deltaY + evt.deltaX);
    }
  });

  // Handle wheel events and update scroll position
  track.addEventListener("wheel", (evt) => {
    registeredScroll = true;
    evt.preventDefault();
    const tpMultiplier = evt.deltaY % 1 === 0 ? 5 : 1;
    track.setAttribute('data-scroll', track.scrollLeft + (evt.deltaY * tpMultiplier) + (evt.deltaX * tpMultiplier));
  });

  // Handle keyboard arrow keys for scrolling
  window.addEventListener('keydown', (e) => {
    if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
      registeredScroll = true;
      track.setAttribute('data-scroll', track.scrollLeft - 100);
    } else if (e.key === "ArrowDown" || e.key === "ArrowRight") {
      registeredScroll = true;
      track.setAttribute('data-scroll', track.scrollLeft + 100);
    }
  });

  // Handle mouse drag to scroll
  const mouseDownHandler = (e) => {
    registeredScroll = true;

    track.style.cursor = 'grabbing';
    track.style.userSelect = 'none';

    pos = {
      left: track.scrollLeft,
      x: e.clientX ?? e.touches?.[0]?.clientX + e.touches?.[0]?.clientY ?? 0,
    };

    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler);
  };

  const mouseMoveHandler = (e) => {
    registeredScroll = true;

    const cx = e.clientX ?? e.touches?.[0]?.clientX + e.touches?.[0]?.clientY ?? 0;
    const dx = cx - pos.x;
    track.setAttribute('data-scroll', pos.left - dx);
  };

  const mouseUpHandler = () => {
    document.removeEventListener('mousemove', mouseMoveHandler);
    document.removeEventListener('mouseup', mouseUpHandler);

    track.style.cursor = 'grab';
    track.style.removeProperty('user-select');
  };

  track.addEventListener('mousedown', mouseDownHandler);

  // Update the scroll position
  const update = () => {
    if (registeredScroll) {
      const toX = parseFloat(track.getAttribute('data-scroll')) ?? 0;
      const dx = toX - track.scrollLeft;

      if (dx > 1 || dx < -1) {
        track.scrollLeft += dx * .10;
      } else {
        track.scrollLeft = toX;
        registeredScroll = false;
      }
    }
    updatePct();
    requestAnimationFrame(update);
  }

  requestAnimationFrame(update);
}

// Color changing sections based on intersection
const defaults = {
  bgColor: document.documentElement.style.getPropertyValue('--bg-color'),
  textColor: document.documentElement.style.getPropertyValue('--text-color')
}

// Observe elements with data-bg-color attribute for intersection
const bgColorObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      document.documentElement.style.setProperty('--bg-color', entry.target.dataset.bgColor ?? defaults.bgColor);
      document.documentElement.style.setProperty('--text-color', entry.target.dataset.textColor ?? defaults.textColor);
    }
  });
}, {
  rootMargin: '0px',
  threshold: 0.501
});

// Observe elements with data-bg-color attribute
document.querySelectorAll('[data-bg-color]').forEach(changer => {
  changer.style.setProperty('background-color', changer.dataset.navColor); // This is just for identification
  bgColorObserver.observe(changer);
});
