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

// Image Gallery

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

// Got to top and other animations on some scroll

function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

var topBtn = document.getElementById("top");
var intro = document.getElementById("intro");
window.onscroll = function () {
  if (document.documentElement.scrollTop > 1350) {
    document.getElementById('icon1').style.opacity = '1';
    document.getElementById('icon2').style.opacity = '1';
    document.getElementById('icon3').style.opacity = '1';
    document.getElementById('icon4').style.opacity = '1';
    document.getElementById('icon5').style.opacity = '1';
    document.getElementById('icon6').style.opacity = '1';
  }
  else if (document.documentElement.scrollTop > 800) {
    const counters = document.querySelectorAll('.counters');
    counters.forEach(counter => {
      const updateCount = () => {
        const target = +counter.getAttribute('data-target');
        const count = +counter.innerHTML;
        const inc = target / target;
        if (count < target) {
          counter.innerHTML = count + inc;
          setTimeout(updateCount, 100);
        }
        else {
          count.innerHTML = target;
        }
      }
      updateCount();
    })
  }
  else if (document.documentElement.scrollTop > 300) {
    intro.style.transform = 'translateX(0px)';
    topBtn.style.transform = "translateY(0px)";
  }
  else {
    topBtn.style.transform = "translateY(65px)";
  }
}