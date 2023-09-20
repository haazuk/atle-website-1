const api_url = "https://itch.io/api/1/QsKjA7CPf7Rs8TN13CgzGBhlRAvEIMNLmYqUOoEZ/my-games"




// Loading Screen
window.addEventListener("load", function() {
  let hoverImagesContainer = document.getElementById('imageHover');
  let loadingScreen = document.getElementById('loadingScreen');
  loadingScreen.style.opacity = '0';
  loadingScreen.style.zIndex = '-1';
  hoverImagesContainer.style.opacity = '1';
});


// spaghetti code

const cols = 3;
const main = document.getElementById('main');
let parts = [];

let images = [
  "images/pond.gif",
  "images/cloud.gif",
  "images/city.gif"
];
let current = 0;
let playing = false;

for (let i in images) {
  new Image().src = images[i];
}

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

let animOptions = {
  duration: 2.3,
  ease: Power4.easeInOut
};

function go(dir) {
  if (!playing) {
    playing = true;
    if (current + dir < 0) current = images.length - 1;
    else if (current + dir >= images.length) current = 0;
    else current += dir;

    function up(part, next) {
      part.appendChild(next);
      gsap.to(part, { ...animOptions, y: -window.innerHeight }).then(function() {
        part.children[0].remove();
        gsap.to(part, { duration: 0, y: 0 });
      })
    }

    function down(part, next) {
      part.prepend(next);
      gsap.to(part, { duration: 0, y: -window.innerHeight });
      gsap.to(part, { ...animOptions, y: 0 }).then(function() {
        part.children[1].remove();
        playing = false;
      })
    }

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

window.addEventListener('keydown', function(e) {
  if (['ArrowDown', 'ArrowRight'].includes(e.key)) {
    go(1);
  }

  else if (['ArrowUp', 'ArrowLeft'].includes(e.key)) {
    go(-1);
  }
});

function lerp(start, end, amount) {
  return (1 - amount) * start + amount * end
}

const cursor = document.createElement('div');
cursor.className = 'cursor';

const cursorF = document.createElement('div');
cursorF.className = 'cursor-f';
let cursorX = 0;
let cursorY = 0;
let pageX = 0;
let pageY = 0;
let size = 8;
let sizeF = 36;
let followSpeed = .16;

document.body.appendChild(cursor);
document.body.appendChild(cursorF);

if ('ontouchstart' in window) {
  cursor.style.display = 'none';
  cursorF.style.display = 'none';
}

cursor.style.setProperty('--size', size + 'px');
cursorF.style.setProperty('--size', sizeF + 'px');

window.addEventListener('mousemove', function(e) {
  pageX = e.clientX;
  pageY = e.clientY;
  cursor.style.left = e.clientX - size / 2 + 'px';
  cursor.style.top = e.clientY - size / 2 + 'px';
});

function loop() {
  cursorX = lerp(cursorX, pageX, followSpeed);
  cursorY = lerp(cursorY, pageY, followSpeed);
  cursorF.style.top = cursorY - sizeF / 2 + 'px';
  cursorF.style.left = cursorX - sizeF / 2 + 'px';
  requestAnimationFrame(loop);
}

loop();

let startY;
let endY;
let clicked = false;

function mousedown(e) {
  gsap.to(cursor, { scale: 4.5 });
  gsap.to(cursorF, { scale: .4 });

  clicked = true;
  startY = e.clientY || e.touches[0].clientY || e.targetTouches[0].clientY;
}
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
window.addEventListener('mousedown', mousedown, false);
window.addEventListener('touchstart', mousedown, false);
window.addEventListener('touchmove', function(e) {
  if (clicked) {
    endY = e.touches[0].clientY || e.targetTouches[0].clientY;
  }
}, false);
window.addEventListener('touchend', mouseup, false);
window.addEventListener('mouseup', mouseup, false);

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
window.addEventListener('mousewheel', wheel, false);
window.addEventListener('wheel', wheel, false);

//Navigation

$(document).ready(function() {
  $("html").on("DOMMouseScroll mousewheel", function(e) {
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

  $menulink.click(function() {
    $menulink.toggleClass("active");
    $menu.toggleClass("active");
    return false;
  });

  var toggled = 0;

  $(".menu-link").click(function() {
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



