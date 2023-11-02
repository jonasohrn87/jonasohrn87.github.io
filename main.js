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