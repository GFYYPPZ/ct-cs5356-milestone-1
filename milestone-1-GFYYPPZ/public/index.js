// fetch data from json file
let currentIndex = 0
let activeProducts

fetch('./data/products.json')
    .then(response => response.json())
    .then(json => {
        activeProducts = json.filter(product => product.active)
        console.log(activeProducts)
        load_img()
        load_data()
    })
    .catch(error => console.log('Error', error))


function load_img() {
    const img = document.querySelector('.carousel-left img')
    img.src = activeProducts[currentIndex].imageUrl
}


function load_data() {
    const title = document.querySelector('.carousel-right #title')
    title.innerHTML = activeProducts[currentIndex].title

    const description = document.querySelector('.carousel-right #description')
    description.innerHTML = activeProducts[currentIndex].description

    const features = document.querySelector('.carousel-right #features')
    features.innerHTML = ''
    activeProducts[currentIndex].highlighted_features.forEach(element => {
        const li = document.createElement('li')
        const br = document.createElement('br')
        li.innerHTML = element
        features.appendChild(li)
        features.appendChild(br)
    })

    const paymentURL = document.querySelector('.carousel-right-btn a')
    paymentURL.setAttribute('href', activeProducts[currentIndex].paymentLink)

    const price = document.querySelector('.carousel-right #price')
    price.innerHTML = `Price: $${activeProducts[currentIndex].price}`
}


const carBtnRight = document.querySelector('.button-container #car-btn-right')
carBtnRight.addEventListener('click', function() {
    currentIndex = (currentIndex + 1) % activeProducts.length
    load_img()
    load_data()
})


const carBtnLeft = document.querySelector('.button-container #car-btn-left')
carBtnLeft.addEventListener('click', function() {
    currentIndex--
    if (currentIndex < 0) {
        currentIndex = (activeProducts.length - 1)
    }
    load_img()
    load_data()
})
    