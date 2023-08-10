// Loading Screen
window.addEventListener("load", function(){
	let hoverImagesContainer = document.getElementById('imageHover');
	let loadingScreen = document.getElementById('loadingScreen');
	loadingScreen.style.opacity = '0';
	loadingScreen.style.zIndex = '-1';
	hoverImagesContainer.style.opacity = '1';
});





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
