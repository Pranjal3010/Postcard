// ================================
// PART 3A
// Flip Card + Mouse Tilt
// ================================

const card = document.getElementById("postcard");
const video = document.getElementById("loveVideo");

let flipped = false;

// --------------------------------
// Flip Animation
// --------------------------------

card.addEventListener("click", () => {

    flipped = !flipped;

    card.classList.toggle("flip", flipped);

    if (flipped) {

        video.currentTime = 0;

        video.play().catch(() => {});

    } else {

        video.pause();

    }

});

// --------------------------------
// Mouse Parallax Effect
// --------------------------------

const scene = document.querySelector(".scene");
const isTouchDevice =
    ('ontouchstart' in window) ||
    (navigator.maxTouchPoints > 0);

scene.addEventListener("mousemove", (e) => {

    if (flipped) return;

    const rect = scene.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateY = ((x - centerX) / centerX) * 12;
    const rotateX = ((centerY - y) / centerY) * 12;

   card.style.setProperty("--rotateX", `${rotateX}deg`);
card.style.setProperty("--rotateY", `${rotateY}deg`);

});

// --------------------------------
// Reset Position
// --------------------------------
if(!isTouchDevice){
scene.addEventListener("mouseleave", () => {

    if (flipped) return;

    card.style.setProperty("--rotateX", "0deg");
    card.style.setProperty("--rotateY", "0deg");


});
}

// --------------------------------
// Mobile Touch Flip
// --------------------------------



// ================================
// PART 3B
// Loader + Hearts + Sparkles
// ================================

// Loader

window.addEventListener("load", () => {

const loader = document.getElementById("loader");

const container = document.querySelector(".container");

setTimeout(() => {

loader.classList.add("hide-loader");

container.classList.add("show");

},1200);

});

// --------------------------------
// Floating Hearts
// --------------------------------

const heartsContainer = document.getElementById("hearts");

function createHeart(){

const heart=document.createElement("div");

heart.className="heart";

heart.innerHTML=["❤️","💖","💕","💗","💓"][Math.floor(Math.random()*5)];

heart.style.left=Math.random()*100+"vw";

heart.style.fontSize=(18+Math.random()*26)+"px";

heart.style.animationDuration=
(6+Math.random()*6)+"s";

heartsContainer.appendChild(heart);

setTimeout(()=>{

heart.remove();

},12000);

}

setInterval(createHeart,450);

// --------------------------------
// Sparkles
// --------------------------------

document.addEventListener("mousemove",(e)=>{

for(let i=0;i<1;i++){

const s=document.createElement("div");

s.className="sparkle";

s.style.left=e.pageX+"px";

s.style.top=e.pageY+"px";

document.body.appendChild(s);

setTimeout(()=>{

s.remove();

},900);

}

});

// ==========================================
// PART 3C
// Music + Swipe + Heart Burst + Card Entrance
// ==========================================

// ---------- MUSIC ----------

const music = document.getElementById("music");
const musicBtn = document.getElementById("musicBtn");

let musicPlaying = false;

musicBtn.addEventListener("click", (e) => {

    e.stopPropagation();

    if (!musicPlaying) {

        music.play();
        musicBtn.innerHTML = "⏸️";
        musicBtn.classList.add("playing");

    } else {

        music.pause();
        musicBtn.innerHTML = "🎵";
        musicBtn.classList.remove("playing");

    }

    musicPlaying = !musicPlaying;

});

// ---------- CARD ENTRANCE ----------

window.addEventListener("load", () => {

    card.animate([
        {
            transform:"translateY(80px)",
            opacity:0
        },
        {
            transform:"translateY(0)",
            opacity:1
        }
    ],{

        duration:1200,
        easing:"ease-out"

    });

});

// ---------- MOBILE SWIPE ----------

let startX = 0;

card.addEventListener("touchstart",(e)=>{

    startX = e.touches[0].clientX;

});

card.addEventListener("touchend",(e)=>{

    const endX = e.changedTouches[0].clientX;

   if (Math.abs(endX - startX) > 60) {

    flipped = !flipped;

    card.classList.toggle("flip");

    if (flipped) {

        video.currentTime = 0;
        video.play();

    } else {

        video.pause();

    }

}

});

// ---------- DOUBLE CLICK HEART BURST ----------

card.addEventListener("dblclick",(e)=>{

    for(let i=0;i<20;i++){

        const heart=document.createElement("div");

        heart.className="heart";

        heart.innerHTML=["❤️","💖","💕","💗"][Math.floor(Math.random()*4)];

        heart.style.left=e.pageX+"px";

        heart.style.top=e.pageY+"px";

        heart.style.bottom="auto";

        heart.style.animationDuration="2s";

        document.body.appendChild(heart);

        const x=(Math.random()-0.5)*300;
        const y=(Math.random()-0.5)*300;

        heart.animate([

            {
                transform:"translate(0,0) scale(1)",
                opacity:1
            },

            {
                transform:`translate(${x}px,${y}px) scale(.3)`,
                opacity:0
            }

        ],{

            duration:2000,
            easing:"ease-out"

        });

        setTimeout(()=>{

            heart.remove();

        },2000);

    }

});

// ---------- MUSIC ICON ROTATION ----------

setInterval(()=>{

    if(musicPlaying){

        musicBtn.style.transform="rotate(360deg)";

        setTimeout(()=>{

            musicBtn.style.transform="rotate(0deg)";

        },900);

    }

},1000);

// ---------- CARD HOVER GLOW ----------

card.addEventListener("mouseenter",()=>{

    card.style.filter="drop-shadow(0 0 35px rgba(255,90,150,.45))";

});

card.addEventListener("mouseleave",()=>{

    card.style.filter="none";

});

// ---------- KEYBOARD SUPPORT ----------

document.addEventListener("keydown",(e)=>{

    if(e.code==="Space"){

        e.preventDefault();

        flipped=!flipped;

        card.classList.toggle("flip");

    }

});

document.addEventListener("touchmove",(e)=>{

    const touch = e.touches[0];

    const sparkle = document.createElement("div");

    sparkle.className = "sparkle";

    sparkle.style.left = touch.pageX + "px";

    sparkle.style.top = touch.pageY + "px";

    document.body.appendChild(sparkle);

    setTimeout(()=>{

        sparkle.remove();

    },900);

});