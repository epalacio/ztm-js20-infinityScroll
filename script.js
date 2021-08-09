const imageContainer = document.getElementById('image-container')
const loader = document.getElementById('loader')

let photosArray = []

// Unsplash API
const count = 10
const apiKey = 'P4NSMrRAI3EZIilRNaZ-3dKk_zSSeEs5GdodRbXl3jc'
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`

// Helper Function to set attributes to DOM elements
const setAttributes = (element, attributes) => {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key])
    }
}

// Create Elements for Links & Photos, Add to DOM
const displayPhotos = () => {
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

// On load
getPhotos()