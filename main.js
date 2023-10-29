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

function toggleImageSize(){
   const img = document.getElementById("pic1");

if (isEnlarged) {
    decreaseImg(img);
    isEnlarged = false;
}
else {
    enlargeImg(img);
    isEnlarged = true;
}
}

function enlargeImg(img) {

    img.style.transform = "scale(1.5)";
    img.style.transition = "transform 0.25s ease"
}
 
    function decreaseImg(img) {
    img.style.transform = "scale(1.0)";
    img.style.transition = "transform 0.25s ease"
}
