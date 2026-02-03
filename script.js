const next = document.querySelector(".next");
const prev = document.querySelector(".prev");
const slide = document.querySelector(".slide");

prev.addEventListener("click", function(){
    slide.appendChild(slide.firstElementChild);
})

next.addEventListener("click", function(){
    slide.prepend(slide.lastElementChild);
})