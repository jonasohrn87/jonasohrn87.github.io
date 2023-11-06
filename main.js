window.addEventListener("scroll",()=>{
    /*document.querySelector(".background").style.backgroundSize = `${window.scrollY * 1.8 + 1600}px`*/
    document.querySelector(".background").style.transform = "scale(1.5,1.5)"
    document.querySelector(".background h1").style.opacity = `${(-window.scrollY + 400) * 0.004}`
    if (window.scrollY ==0)
    {
        
        document.querySelector(".background").style.transform = "scale(1,1)"
    }
})

let isEnlarged = false; 

   let img1 = document.getElementById("pic1");
   let img2 = document.getElementById("pic2");
   let img3 = document.getElementById("pic3");
   let img4 = document.getElementById("pic4");

function toggleImageSize(bilder){

if (isEnlarged) {
    decreaseImg(bilder);
    isEnlarged = false;
}
else {
    enlargeImg(bilder);
    isEnlarged = true;
}
}

function enlargeImg(img) {
    img.style.zIndex ="10"
    img.style.transform = "scale(1.5)";
    img.style.transition = "transform 0.25s ease"
}
 
    function decreaseImg(img) {
    img.style.zIndex ="0"
    img.style.transform = "scale(1.0)";
    img.style.transition = "transform 0.25s ease"
}

window.addEventListener("scroll", () => {
    const stickyBar = document.querySelector("header nav");
    const fixedBar = document.querySelector(".social-media");
    const stickyBarHeight = stickyBar.getBoundingClientRect().height;

    if (window.scrollY >= stickyBarHeight) {
        fixedBar.style.top = "65px";
    } else {
        
        fixedBar.style.top = stickyBarHeight + "px";
    }
});

//Klocka

setInterval(displayTime, 1000);

function displayTime(){
    const timeNow = new Date();

let hourOfDay = timeNow.getHours();
let minutes = timeNow.getMinutes();
let seconds = timeNow.getSeconds();
//let weekDay = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
//let today = weekDay[timeNow.getDay()];
let today = timeNow.getDay();
let months = timeNow.toLocaleDateString("default", { month: "short" })
let year = timeNow.getFullYear();


hourOfDay = hourOfDay < 10 ? "0" + hourOfDay : hourOfDay;
minutes = minutes < 10 ? "0" + minutes : minutes;
seconds = seconds < 10 ? "0" + seconds : seconds;
today = today < 10 ? "0" + today : today;
let Time = hourOfDay + ":" + minutes + ":" + seconds;

document.getElementById('clock').innerHTML = Time + " ";
document.getElementById('date').innerHTML = today + " " + months.toUpperCase().replace(/[.]/g, '') + " " + year; 
}

displayTime();