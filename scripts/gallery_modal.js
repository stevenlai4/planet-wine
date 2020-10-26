// Get the modal
var modal = document.querySelectorAll(".modal");

// Get the image and insert it inside the modal - use its "alt" text as a caption
var img = document.querySelectorAll(".gallery-img");
var modalImg = document.querySelectorAll(".modalImg");

for (let i = 0; i < img.length; i++) {
    img[i].onclick = function () {
        modal[i].style.display = "block";
        modalImg[i].src = this.src;
    };
}

// Get the <span> element that closes the modal
var span = document.querySelectorAll(".close");

// When the user clicks on <span> (x), close the modal
for (let i = 0; i < span.length; i++) {
    span[i].onclick = function () {
        modal[i].style.display = "none";
    };
}
