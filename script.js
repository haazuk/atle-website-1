// Loading Screen
window.addEventListener("load", function() {
  // Get the elements for the loading screen and hover images container
  let hoverImagesContainer = document.getElementById('imageHover');
  let loadingScreen = document.getElementById('loadingScreen');

  // Hide the loading screen
  loadingScreen.style.opacity = '0';
  loadingScreen.style.zIndex = '-1';

  // Show the hover images container
  hoverImagesContainer.style.opacity = '1';
});

// Handle a button click event
const button = document.querySelector('.slide');

button.addEventListener('click', function() {
  // Redirect to the 'story.html' page
  window.location.href = 'story.html';
});

// Define some variables for the following code

// Number of columns
const cols = 3;
// Get the main element
const main = document.getElementById('main');
// Create an array to store 'part' elements
let parts = [];

// Array of image paths
let images = [
  "images/pond.gif",
  "images/cloud.gif",
  "images/city.gif"
];

// Index of the current image
let current = 0;
// Flag to check if an animation is playing
let playing = false;

// Preload the images
for (let i in images) {
  new Image().src = images[i];
}

// Create 'part' elements and populate them with images
for (let col = 0; col < cols; col++) {
  let part = document.createElement('div');
  part.className = 'part';
  let el = document.createElement('div');
  el.className = "section";
  let img = document.createElement('img');
  img.src = images[current];
  el.appendChild(img);
  part.style.setProperty('--x', -100 / cols * col + 'vw');
  part.appendChild(el);
  main.appendChild(part);
  parts.push(part);
}

// Animation options
let animOptions = {
  duration: 2.3,
  ease: Power4.easeInOut
};

// Function to perform image transitions
function go(dir) {
  if (!playing) {
    playing = true;
    if (current + dir < 0) current = images.length - 1;
    else if (current + dir >= images.length) current = 0;
    else current += dir;

    // Function to move the image up
    function up(part, next) {
      part.appendChild(next);
      gsap.to(part, { ...animOptions, y: -window.innerHeight }).then(function() {
        part.children[0].remove();
        gsap.to(part, { duration: 0, y: 0 });
      })
    }

    // Function to move the image down
    function down(part, next) {
      part.prepend(next);
      gsap.to(part, { duration: 0, y: -window.innerHeight });
      gsap.to(part, { ...animOptions, y: 0 }).then(function() {
        part.children[1].remove();
        playing = false;
      })
    }

    // Loop through 'parts' and transition images
    for (let p in parts) {
      let part = parts[p];
      let next = document.createElement('div');
      next.className = 'section';
      let img = document.createElement('img');
      img.src = images[current];
      next.appendChild(img);

      if ((p - Math.max(0, dir)) % 2) {
        down(part, next);
      } else {
        up(part, next);
      }
    }
  }
}

// Listen for keyboard arrow keys
window.addEventListener('keydown', function(e) {
  if (['ArrowDown', 'ArrowRight'].includes(e.key)) {
    go(1);
  } else if (['ArrowUp', 'ArrowLeft'].includes(e.key)) {
    go(-1);
  }
});

// Linear interpolation function
function lerp(start, end, amount) {
  return (1 - amount) * start + amount * end;
}

// Create cursor elements
const cursor = document.createElement('div');
cursor.className = 'cursor';

const cursorF = document.createElement('div');
cursorF.className = 'cursor-f';

// Initialize cursor position and properties
let cursorX = 0;
let cursorY = 0;
let pageX = 0;
let pageY = 0;
let size = 8;
let sizeF = 36;
let followSpeed = .16;

// Append cursor elements to the document
document.body.appendChild(cursor);
document.body.appendChild(cursorF);

// Hide cursor elements on touch devices
if ('ontouchstart' in window) {
  cursor.style.display = 'none';
  cursorF.style.display = 'none';
}

// Set the initial cursor sizes
cursor.style.setProperty('--size', size + 'px');
cursorF.style.setProperty('--size', sizeF + 'px');

// Handle mouse movement
window.addEventListener('mousemove', function(e) {
  pageX = e.clientX;
  pageY = e.clientY;
  cursor.style.left = e.clientX - size / 2 + 'px';
  cursor.style.top = e.clientY - size / 2 + 'px';
});

// Function to update cursor position
function loop() {
  cursorX = lerp(cursorX, pageX, followSpeed);
  cursorY = lerp(cursorY, pageY, followSpeed);
  cursorF.style.top = cursorY - sizeF / 2 + 'px';
  cursorF.style.left = cursorX - sizeF / 2 + 'px';
  requestAnimationFrame(loop);
}

loop();

// Variables for tracking click and swipe actions
let startY;
let endY;
let clicked = false;

// Handle mouse down event
function mousedown(e) {
  gsap.to(cursor, { scale: 4.5 });
  gsap.to(cursorF, { scale: .4 });

  clicked = true;
  startY = e.clientY || e.touches[0].clientY || e.targetTouches[0].clientY;
}

// Handle mouse up event
function mouseup(e) {
  gsap.to(cursor, { scale: 1 });
  gsap.to(cursorF, { scale: 1 });

  endY = e.clientY || endY;
  if (clicked && startY && Math.abs(startY - endY) >= 40) {
    go(!Math.min(0, startY - endY) ? 1 : -1);
    clicked = false;
    startY = null;
    endY = null;
  }
}

// Listen for mouse and touch events
window.addEventListener('mousedown', mousedown, false);
window.addEventListener('touchstart', mousedown, false);
window.addEventListener('touchmove', function(e) {
  if (clicked) {
    endY = e.touches[0].clientY || e.targetTouches[0].clientY;
  }
}, false);
window.addEventListener('touchend', mouseup, false);
window.addEventListener('mouseup', mouseup, false);

// Handle mouse wheel events with a delay
let scrollTimeout;
function wheel(e) {
  clearTimeout(scrollTimeout);
  setTimeout(function() {
    if (e.deltaY < -40) {
      go(-1);
    }
    else if (e.deltaY >= 40) {
      go(1);
    }
  })
}

// Listen for mouse wheel events
window.addEventListener('mousewheel', wheel, false);
window.addEventListener('wheel', wheel, false);
