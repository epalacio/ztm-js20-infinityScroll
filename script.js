const imageContainer = document.getElementById('image-container')
const loader = document.getElementById('loader')

let ready = false
let imagesLoaded = 0
let totalImages = 0
let photosArray = []

// Unsplash API
const count = 10
const apiKey = 'P4NSMrRAI3EZIilRNaZ-3dKk_zSSeEs5GdodRbXl3jc'
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`

// Check if all images were loaded
const imageLoaded = () => {
    imagesLoaded++
    if (imagesLoaded === totalImages) {
        ready = true
        loader.hidden = true
    }
}

// Helper Function to set attributes to DOM elements
const setAttributes = (element, attributes) => {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key])
    }
}

// Create Elements for Links & Photos, Add to DOM
const displayPhotos = () => {
    imagesLoaded = 0
    totalImages = photosArray.length
    // Run function for each object in the photos array
    photosArray.forEach((photo) => {
        // create <a> to link to Unsplash
        const item = document.createElement('a')
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank',
        })

        // create <img> for photo
        const img = document.createElement('img')
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description
        })
        // Event listener, check when each is finished loading
        imageLoaded()
        // Put <img> inside <a>, then put both inside image Container element
        item.appendChild(img)
        imageContainer.appendChild(item)
    })
}


// Get photos from Unsplash API
const getPhotos = async () => {
    try {
        const response = await fetch(apiUrl)
        photosArray = await response.json()
        displayPhotos()
    } catch (error) {
        // Catch error here
        console.log(error)
    }
}

// Check to see if scrolling near bottom of page, then load more photos
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        ready = false
        getPhotos()
    } else {
        
    }
})

// On load
getPhotos()