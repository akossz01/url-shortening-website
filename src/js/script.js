// https://api.shrtco.de/v2/shorten?url=example.org/

const generateLinkBtn = document.querySelector('.shorten-btn');
const cardsContainer = document.querySelector('.generated-container')
const copyButton = document.querySelector('.cpy-btn');

generateLinkBtn.addEventListener('click', generateLink);

function generateLink(){
    const errorMsg = document.querySelector('.check');
    var link = document.getElementById('shorten-link').value;

    fetch(`https://api.shrtco.de/v2/shorten?url=${link}/`)
    .then(response => response.json())
    .then(data => {
        if (data.ok === true) {
            const shortLink = data.result.short_link;
            errorMsg.style.display = 'none';

            createCard(link, shortLink);

            console.log(shortLink);
        } else if (data.error_code === 2) {
            errorMsg.innerText = 'Not a valid URL';
            errorMsg.style.display = 'flex';
        } else if (data.error_code === 1) {
            errorMsg.innerText = 'No URL submitted';
            errorMsg.style.display = 'flex';
        } else if (data.error_code === 3) {
            errorMsg.innerText = 'Wait a second and try again';
            errorMsg.style.display = 'flex';
        }
    })
    .catch(error => console.error(error));
}

function createCard(link, shortLink){
    const card = document.createElement('div');
    card.classList.add('generated-item');

    const originalLink = document.createElement('p');
    originalLink.classList.add('original-link');
    originalLink.textContent = link;

    const divider = document.createElement('span');
    divider.classList.add('divider');

    const short = document.createElement('p');
    short.classList.add('short-link');
    short.textContent = shortLink;

    const button = document.createElement('div');
    button.classList.add('cpy-btn');
    button.textContent = 'Copy';

    button.addEventListener('click', () => {
        navigator.clipboard.writeText(shortLink);

        /* Change styling */
        button.textContent = 'Copied!';
        button.style.background = '#676767';

        setTimeout(() => {
            button.textContent = 'Copy';
            button.style.background = '#2bd0d0';
        }, '2000');
    });

    card.appendChild(originalLink);
    card.appendChild(divider);
    card.appendChild(short);
    card.appendChild(button);

    /* Insert card first */
    cardsContainer.insertBefore(card, cardsContainer.firstChild);

    /* Insert card last */
    /* cardsContainer.appendChild(card); */
}

/* Animate on scroll */

const observer = new IntersectionObserver(entries => {
    // Loop over the entries
    entries.forEach(entry => {
      // If the element is visible
      if (entry.isIntersecting) {
        // Add the animation class
        entry.target.classList.add('fadeIn-animation');
      }
    });
});

const cards = document.querySelectorAll('.card');
const line = document.querySelectorAll('.line');
cards.forEach(card => {
    observer.observe(card);
});
observer.observe(document.querySelector('.statistics h2'));
observer.observe(document.querySelector('.statistics p'));

const observer2 = new IntersectionObserver(entries => {
    // Loop over the entries
    entries.forEach(entry => {
      // If the element is visible
      if (entry.isIntersecting) {
        // Add the animation class
        entry.target.classList.add('expandOpen');
      }
    });
});

observer2.observe(document.querySelector('.boost .btn'));
observer2.observe(document.querySelector('.boost a'));