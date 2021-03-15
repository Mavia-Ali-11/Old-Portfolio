// Dropdowns

function showDropDown(a, b) {
  var dd = document.getElementById(a);
  var dda = document.getElementById(b);
  if (dda.getAttribute('class') == 'fa fa-angle-down') {
    dd.classList.remove('d-none');
    dd.classList.add('d-block');
    dda.setAttribute('class', 'fa fa-angle-up');
  }
  else {
    dd.classList.remove('d-block');
    dd.classList.add('d-none');
    dda.setAttribute('class', 'fa fa-angle-down');
  }

}

// Slider

var modal = document.getElementById("modal");
var modalImg = document.getElementById("modalImg");
var span = document.getElementsByClassName("close")[0];

function openImage(image) {
  modal.style.display = "block";
  modalImg.setAttribute('src', image);
}

span.onclick = function () {
  modal.style.display = "none";
}

document.addEventListener('keydown', function (event) {
  if (event.keyCode == 27) {
    modal.style.display = 'none'
  }
});

function nextImage() {
  if (modalImg.getAttribute('src') == 'images/Rashan.jpg') {
    modalImg.setAttribute('src', 'images/Catering.jpg');
  }
  else if (modalImg.getAttribute('src') == 'images/Catering.jpg') {
    modalImg.setAttribute('src', 'images/Hazrat.jpg');
  }
  else if (modalImg.getAttribute('src') == 'images/Hazrat.jpg') {
    modalImg.setAttribute('src', 'images/Rashan-Copy.jpg');
  }
  else if (modalImg.getAttribute('src') == 'images/Rashan-Copy.jpg') {
    modalImg.setAttribute('src', 'images/Hazrat2.jpg');
  }
  else {
    modalImg.setAttribute('src', 'images/Rashan.jpg');
  }
}

document.addEventListener('keydown', function (event) {
  if (event.keyCode == 39) {
    nextImage()
  }
});

function prevImage() {
  if (modalImg.getAttribute('src') == 'images/Rashan.jpg') {
    modalImg.setAttribute('src', 'images/Hazrat2.jpg');
  }
  else if (modalImg.getAttribute('src') == 'images/Catering.jpg') {
    modalImg.setAttribute('src', 'images/Rashan.jpg');
  }
  else if (modalImg.getAttribute('src') == 'images/Hazrat.jpg') {
    modalImg.setAttribute('src', 'images/Catering.jpg');
  }
  else if (modalImg.getAttribute('src') == 'images/Rashan-Copy.jpg') {
    modalImg.setAttribute('src', 'images/Hazrat.jpg');
  }
  else {
    modalImg.setAttribute('src', 'images/Rashan-Copy.jpg');
  }
}

document.addEventListener('keydown', function (event) {
  if (event.keyCode == 37) {
    prevImage();
  }
});

// Got to top

function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

var topBtn = document.getElementById("top");
window.onscroll = function () {
  if (document.documentElement.scrollTop > 600) {
    topBtn.style.transform = "translateY(0px)";
  } 
  else {
    topBtn.style.transform = "translateY(65px)";
  }
}