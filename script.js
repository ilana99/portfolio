const portfolio = document.getElementById('portfolio')
const graphismeSection = document.getElementById('graphisme')
const devSection = document.getElementById('dev')
const portfolioSection = document.querySelectorAll('.portfolio-section')

let jsonData;
const json = '/travaux.json'
function fetchJson() {
    fetch(json)
        .then(response => {
            if (!response.ok) {
                throw new Error('Erreur')
            }
            return response.json();
        })
        .then(data => {
            jsonData = data;
        })
}
fetchJson();

graphismeSection.addEventListener('click', function () {
    portfolioSection.forEach(function (section) {
        section.style.display = 'none';
    })
    openModal('Graphisme')
})

devSection.addEventListener('click', function () {
    portfolioSection.forEach(function (section) {
        section.style.display = 'none';
    })
    openModal('Développement')
})


function openModal(category) {
    const modalSection = document.createElement('section');
    const divContainer = document.createElement('div')
    const h2 = document.createElement('h2');

    const close = document.createElement('span');
    close.textContent = "close";
    close.classList.add('material-symbols-rounded')

    portfolio.appendChild(modalSection);
    modalSection.appendChild(close)
    modalSection.appendChild(h2);
    modalSection.appendChild(divContainer);


    modalSection.id = 'modal'
    divContainer.id = 'modaldivContainer'


    const data = jsonData.filter(item => item.category === category);

    h2.textContent = category;

    data.forEach(item => {
        const card = document.createElement('div')

        card.classList.add('card')

        const dataIframe = document.createElement('img')
        const dataTitle = document.createElement('h3')
        const dataTagline = document.createElement('p')

        card.appendChild(dataIframe);
        card.appendChild(dataTitle);
        card.appendChild(dataTagline);

        dataIframe.src = item.cover;
        dataTitle.textContent = item.title;
        dataTagline.textContent = item.tagline;

        const tagsDiv = document.createElement('div')

        item.tags.forEach(tag => {
            const dataTags = document.createElement('button');
            dataTags.textContent = tag;
            tagsDiv.appendChild(dataTags);
        })
        card.appendChild(tagsDiv);
        divContainer.appendChild(card)


        card.addEventListener('click', function () {

            openCard(item);
        })

    })

    close.addEventListener('click', function () {
        const modal = document.getElementById('modal')
        modal.parentNode.removeChild(modal)
        portfolioSection.forEach(function (section) {
            section.style.display = 'flex';
        })
    })




}

function openCard(item) {
    console.log(item);
    const modalSection = document.createElement('section');
    const divContainer = document.createElement('div')
    const h2 = document.createElement('h2');

    const close = document.createElement('span');
    close.textContent = "close";
    close.classList.add('material-symbols-rounded')

    const back = document.createElement('span');
    back.textContent = "chevron_left";
    back.classList.add('material-symbols-rounded')

    portfolio.appendChild(modalSection);
    modalSection.appendChild(close)
    modalSection.appendChild(back)
    modalSection.appendChild(h2);
    modalSection.appendChild(divContainer);

    modalSection.id = 'modalCard'
    divContainer.id = 'cardDivContainer'

    h2.textContent = item.title;

    const dataIframe = document.createElement('iframe')
    const dataTitle = document.createElement('h3')
    const dataDescription = document.createElement('p')
    const dataClientName = document.createElement('h4')
    const dataLink = document.createElement('a');
   

    dataIframe.src = item.iframe;
    dataTitle.textContent = item.title;
    dataDescription.textContent = item.description;
    dataClientName.textContent = item.clientName;
    dataLink.href = item.link;


    const link = document.createElement('span')
    link.textContent = "link";
    link.classList.add('material-symbols-rounded')

    dataLink.appendChild(link);

    const dataTitleContainer = document.createElement('div');
    dataTitleContainer.appendChild(dataTitle)
    dataTitleContainer.appendChild(dataLink)

    const tagsDiv = document.createElement('div')
    tagsDiv.classList.add('tags')
    item.tags.forEach(tag => {
        const dataTags = document.createElement('button');
        dataTags.textContent = tag;
        tagsDiv.appendChild(dataTags);
    })
    

    divContainer.appendChild(dataIframe)
    divContainer.appendChild(tagsDiv);
    divContainer.appendChild(dataTitleContainer)
    divContainer.appendChild(dataClientName)
    divContainer.appendChild(dataDescription)
    


    close.addEventListener('click', function () {
        const modalCard = document.getElementById('modalCard')
        modalCard.parentNode.removeChild(modalCard)
        const modal = document.getElementById('modal')
        modal.parentNode.removeChild(modal)
        portfolioSection.forEach(function (section) {
            section.style.display = 'flex';
        })
    })

    back.addEventListener('click', function () {
        const modalCard = document.getElementById('modalCard')
        modalCard.parentNode.removeChild(modalCard)
        portfolioSection.forEach(function (section) {
            section.style.display = 'flex';
        })
    })
}

