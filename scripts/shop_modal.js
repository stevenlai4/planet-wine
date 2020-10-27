const shopModal = () => {
    // Get the modal
    var modal = document.querySelectorAll('.modal');

    // Get the image and insert it inside the modal - use its "alt" text as a caption
    var img = document.querySelectorAll('.shop-img');
    var modalImg = document.querySelectorAll('.modal-content');
    var captionText = document.querySelectorAll('.caption');

    for (let i = 0; i < img.length; i++) {
        img[i].onclick = function () {
            modal[i].style.display = 'block';
            modalImg[i].src = this.src;
            captionText[i].innerHTML = this.alt;
        };
    }

    // Get the <span> element that closes the modal
    var span = document.querySelectorAll('.close');

    console.log(span);

    // When the user clicks on <span> (x), close the modal
    for (let i = 0; i < span.length; i++) {
        span[i].onclick = function () {
            modal[i].style.display = 'none';
        };
    }
};
