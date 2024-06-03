var Plyr = require('./lib/plyr.polyfilled');

window.addEventListener('load', function () {
  var headerHeight = document.querySelector('.page-header').clientHeight;
  var stickyNavbarElement = document.querySelector('.navbar-sticky');
  var offset = 300;

  toggleStickyNavbar();

  window.addEventListener('scroll', function () {
    toggleStickyNavbar();
  });

  function toggleStickyNavbar() {
    if (window.scrollY > headerHeight - offset) {
      return stickyNavbarElement.classList.add('visible');
    }
    stickyNavbarElement.classList.remove('visible');
  }
  var player = new Plyr('#player', {
    keyboard: {
      global: true,
    },
  });
  player.once('play', function () {
    var videoWrapper = document.querySelector('.plyr__video-wrapper');
    videoWrapper.classList.add('hidden-poster');

    const poster = videoWrapper.querySelector('.plyr__poster');
    if (poster) {
      poster.remove();
    }
  });

  registerNavigation();

  function registerNavigation() {
    var elements = document.querySelectorAll('.nav-wrapper a');
    elements.forEach(function (el) {
      const href = el.getAttribute('href') || '';
      const isAnchor = href[0] === '#';
      if (!isAnchor) {
        return;
      }
      el.addEventListener('click', function (event) {
        if (!el.scrollIntoView) {
          return;
        }
        event.preventDefault();

        var targetElement = document.querySelector(el.getAttribute('href'));
        if (targetElement) {
          targetElement.scrollIntoView({ block: 'start', behavior: 'smooth' });
        }
      });
    });
  }
  // Select elements
  const newsletterForm = document.querySelector('.newsletter-form form');
  const newsletterEmailInput = document.querySelector('#newsletter-email');
  const newsletterAddButton = document.querySelector('.newsletter-form button');

  newsletterForm.addEventListener('submit', handleFormSubmit);

  async function handleFormSubmit(e) {
    e.preventDefault();

    newsletterEmailInput.disabled = true;
    newsletterAddButton.disabled = true;

    const email = newsletterEmailInput.value.trim();

    try {
      const response = await fetch(
        'https://nbdggbnqnrevwg6xlex3st3vpe0nyhiq.lambda-url.us-east-2.on.aws/?token=db1f899025b5a59a76b6b34b2a013893',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email }),
        }
      );
      if (response.ok) {
        newsletterAddButton.classList.add('btn-success');
        newsletterEmailInput.value = '';
      } else {
        newsletterAddButton.classList.add('btn-error');
      }
    } catch (error) {
      newsletterAddButton.classList.add('btn-error');
    } finally {
      newsletterEmailInput.disabled = false;
      newsletterAddButton.disabled = false;
    }
  }
});

// cont url = 'http://localhost:4000/subscriptions'
