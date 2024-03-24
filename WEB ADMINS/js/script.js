window.addEventListener('load', function() {
  var loadingScreen = document.querySelector('.loading-screen');
  loadingScreen.style.opacity = '0';

  setTimeout(function() {
    loadingScreen.classList.add('visually-hidden');
  }, 1000); // Espera 1 segundo antes de ocultar el elemento
});

const panels = document.querySelectorAll('.panel')

panels.forEach(panel => {
    panel.addEventListener('click', () => {
        removeActiveClasses()
        panel.classList.add('active')
    })
})

function removeActiveClasses() {
    panels.forEach(panel => {
        panel.classList.remove('active')
    })
}


let observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.remove('hidden');
      observer.unobserve(entry.target); // Deja de observar el elemento
    }
  });
});

document.querySelectorAll('.tex').forEach(element => {
  if (!element.classList.contains('loading-screen')) {
    observer.observe(element);
  }
});

  $('.navbar-nav .nav-link').on('click', function() {
    $('.navbar-collapse').collapse('hide');
  });

  $('.navbar-brand').on('click', function() {
    $('.navbar-collapse').collapse('hide');
  });