/**
 * Data Catalog Project Starter Code - SEA Stage 2
 *
 * This file is where you should be doing most of your work. You should
 * also make changes to the HTML and CSS files, but we want you to prioritize
 * demonstrating your understanding of data structures, and you'll do that
 * with the JavaScript code you write in this file.
 * 
 * The comments in this file are only to help you learn how the starter code
 * works. The instructions for the project are in the README. That said, here
 * are the three things you should do first to learn about the starter code:
 * - 1 - Change something small in index.html or style.css, then reload your 
 *    browser and make sure you can see that change. 
 * - 2 - On your browser, right click anywhere on the page and select
 *    "Inspect" to open the browser developer tools. Then, go to the "console"
 *    tab in the new window that opened up. This console is where you will see
 *    JavaScript errors and logs, which is extremely helpful for debugging.
 *    (These instructions assume you're using Chrome, opening developer tools
 *    may be different on other browsers. We suggest using Chrome.)
 * - 3 - Add another string to the titles array a few lines down. Reload your
 *    browser and observe what happens. You should see a fourth "card" appear
 *    with the string you added to the array, but a broken image.
 * 
 */


// const FRESH_PRINCE_URL = "https://upload.wikimedia.org/wikipedia/en/3/33/Fresh_Prince_S1_DVD.jpg";
// const CURB_POSTER_URL = "https://m.media-amazon.com/images/M/MV5BZDY1ZGM4OGItMWMyNS00MDAyLWE2Y2MtZTFhMTU0MGI5ZDFlXkEyXkFqcGdeQXVyMDc5ODIzMw@@._V1_FMjpg_UX1000_.jpg";
// const EAST_LOS_HIGH_POSTER_URL = "https://static.wikia.nocookie.net/hulu/images/6/64/East_Los_High.jpg";

// // This is an array of strings (TV show titles)
// let titles = [
//     "Fresh Prince of Bel Air",
//     "Curb Your Enthusiasm",
//     "East Los High"
// ];
// // Your final submission should have much more data than this, and 
// // you should use more than just an array of strings to store it all.


// // This function adds cards the page to display the data in the array
// function showCards() {
//     const cardContainer = document.getElementById("card-container");
//     cardContainer.innerHTML = "";
//     const templateCard = document.querySelector(".card");
    
//     for (let i = 0; i < titles.length; i++) {
//         let title = titles[i];

//         // This part of the code doesn't scale very well! After you add your
//         // own data, you'll need to do something totally different here.
//         let imageURL = "";
//         if (i == 0) {
//             imageURL = FRESH_PRINCE_URL;
//         } else if (i == 1) {
//             imageURL = CURB_POSTER_URL;
//         } else if (i == 2) {
//             imageURL = EAST_LOS_HIGH_POSTER_URL;
//         }

//         const nextCard = templateCard.cloneNode(true); // Copy the template card
//         editCardContent(nextCard, title, imageURL); // Edit title and image
//         cardContainer.appendChild(nextCard); // Add new card to the container
//     }
// }

// function editCardContent(card, newTitle, newImageURL) {
//     card.style.display = "block";

//     const cardHeader = card.querySelector("h2");
//     cardHeader.textContent = newTitle;

//     const cardImage = card.querySelector("img");
//     cardImage.src = newImageURL;
//     cardImage.alt = newTitle + " Poster";

//     // You can use console.log to help you debug!
//     // View the output by right clicking on your website,
//     // select "Inspect", then click on the "Console" tab
//     console.log("new card:", newTitle, "- html: ", card);
// }

// // This calls the addCards() function when the page is first loaded
// document.addEventListener("DOMContentLoaded", showCards);

// function quoteAlert() {
//     console.log("Button Clicked!")
//     alert("I guess I can kiss heaven goodbye, because it got to be a sin to look this good!");
// }

// function removeLastCard() {
//     titles.pop(); // Remove last item in titles array
//     showCards(); // Call showCards again to refresh
// }

function start(JSON_DATASET) {
    const NO_IMAGE_FOUND_URL = 'https://the90minutemovie.substack.com/img/missing-image.png';
    
    let listingContainerElem = document.querySelector('#listings-container');

    for (carData of JSON_DATASET) {
        let carMetadataElem = document.createElement('meta');
        carMetadataElem.dataset.yearMakeModel = carData['year'] + ' ' + carData['make'] + ' ' + carData['model'];
        carMetadataElem.dataset.make          = carData['make'];
        carMetadataElem.dataset.model         = carData['model'];
        carMetadataElem.dataset.trim          = carData['trim'];
        carMetadataElem.dataset.body          = carData['body'];
        carMetadataElem.dataset.transmission  = carData['transmission'];
        carMetadataElem.dataset.odometer      = carData['odometer'].toLocaleString('en-US');
        carMetadataElem.dataset.seller        = carData['seller'];
        
        let carImageElem = document.createElement('img');

        if (carData['image_url'].length === 0) {
            carImageElem.src = NO_IMAGE_FOUND_URL;
            carMetadataElem.dataset.imageUrl = NO_IMAGE_FOUND_URL;
        } else {
            carImageElem.src = carData['image_url'];
            carMetadataElem.dataset.imageUrl = carData['image_url'];
        }
        carImageElem.classList.add('car-image');

        let priceElem = document.createElement('p');
        priceElem.classList.add('price');
        priceElem.textContent = carData['sellingprice'].toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 2
        });

        let yearMakeModelElem = document.createElement('p');
        yearMakeModelElem.classList.add('year-make-model');
        yearMakeModelElem.textContent = carData['year'] + ' ' + carData['make'] + ' ' + carData['model'];

        let shortDescElem = document.createElement('div');
        shortDescElem.classList.add('short-desc');
        shortDescElem.appendChild(yearMakeModelElem);
        shortDescElem.appendChild(priceElem);
        
        let carListingElem = document.createElement('div');
        carListingElem.href = '#';
        carListingElem.classList.add('car-listing');
        carListingElem.setAttribute('onclick','open_modal(this);');
        carListingElem.appendChild(carImageElem);
        carListingElem.appendChild(shortDescElem);
        carListingElem.appendChild(carMetadataElem);

        listingContainerElem.appendChild(carListingElem);
    }
}

window.onload = function() {
    start(JSON_DATASET);
    

}

function shuffle_listings() {
    input_data = JSON_DATASET;
    document.querySelector('#listings-container').innerHTML = ''
    input_data = JSON_DATASET;
    let currentIndex = input_data.length;
    
    while (currentIndex != 0) {
    
        let randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
    
        temp = input_data[currentIndex];
        input_data[currentIndex] = input_data[randomIndex];
        input_data[randomIndex] = temp;
    }

    start(input_data);
}

function close_modal() {
    document.querySelector('#modal').style.display = 'none';
}

function open_modal(selectedCarElem) {
    let modalElem = document.querySelector('#modal');

    if (modalElem.style.display == 'inherit') {
        return;
    }

    let carMetadataElem = selectedCarElem.querySelector("meta");

    document.querySelector('.modal-image').src = carMetadataElem.dataset.imageUrl;

    document.querySelector('.modal-car-year-make-model').innerText = carMetadataElem.dataset.yearMakeModel;
    document.querySelector('.modal-car-trim').innerText            = 'Trim: ' + carMetadataElem.dataset.trim;
    document.querySelector('.modal-car-body').innerText            = 'Body: ' + carMetadataElem.dataset.body;
    document.querySelector('.modal-car-transmission').innerText    = 'Transmission Type: ' + carMetadataElem.dataset.transmission;
    document.querySelector('.modal-car-odometer').innerText        = 'Odometer Reading: ' + carMetadataElem.dataset.odometer + ' miles';
    document.querySelector('.modal-car-seller').innerText          = 'Seller: ' + carMetadataElem.dataset.seller;

    modalElem.style.display = 'flex';
}