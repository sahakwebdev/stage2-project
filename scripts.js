/**
 * Used Car Sales Near You! Catalog Project / Data Catalog Project Starter Code - SEA Stage 2
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

window.onload = function() {
    display_catalog_listings(JSON_DATASET);
}

function display_catalog_listings(JSON_DATASET) {
    const NO_IMAGE_FOUND_URL = 'https://the90minutemovie.substack.com/img/missing-image.png';
    
    let listingContainerElem = document.querySelector('#listings-container');

    for (carData of JSON_DATASET) {
        let carMetadataElem = document.createElement('meta');
        carMetadataElem.dataset.yearMakeModel = carData['year'] + ' ' + carData['make'] + ' ' + carData['model'];
        carMetadataElem.dataset.make          = carData['make'];
        carMetadataElem.dataset.model         = carData['model'];
        carMetadataElem.dataset.price         = carData['sellingprice'];
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
        priceElem.textContent = to_US_currenty_format(carData['sellingprice']);

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

function shuffle_listings() {
    let input_data = JSON_DATASET;

    document.querySelector('#listings-container').innerHTML = '';

    let currentIndex = input_data.length;
    
    while (currentIndex != 0) {
        let randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
    
        let temp = input_data[currentIndex];
        input_data[currentIndex] = input_data[randomIndex];
        input_data[randomIndex] = temp;
    }

    display_catalog_listings(input_data);
}

function open_random_listing() {
    let allListingElems = document.querySelectorAll('.car-listing');

    let randomIndex = Math.floor(Math.random() * allListingElems.length);

    allListingElems[randomIndex].click();
}

function sort_by_pricing(direction) {
    let input_data = JSON_DATASET;

    if (direction == 'ascending') {
        input_data = mergeSort(input_data, 'sellingprice', order = 'ascending');
    } else if (direction == 'descending') {
        input_data = mergeSort(input_data, 'sellingprice', order = 'descending');
    }

    document.querySelector('#listings-container').innerHTML = '';
    display_catalog_listings(input_data);
}

function open_modal(selectedCarElem) {
    let modalElem = document.querySelector('#modal');

    if (modalElem.style.display == 'inherit') {
        return;
    }

    let carMetadataElem = selectedCarElem.querySelector("meta");

    document.querySelector('.modal-image').src = carMetadataElem.dataset.imageUrl;

    document.querySelector('.modal-car-year-make-model').innerText = carMetadataElem.dataset.yearMakeModel;
    document.querySelector('.modal-car-price').innerText           = 'Price: ' + to_US_currenty_format(carMetadataElem.dataset.price);
    document.querySelector('.modal-car-trim').innerText            = 'Trim: ' + carMetadataElem.dataset.trim;
    document.querySelector('.modal-car-body').innerText            = 'Body: ' + carMetadataElem.dataset.body;
    document.querySelector('.modal-car-transmission').innerText    = 'Transmission Type: ' + carMetadataElem.dataset.transmission;
    document.querySelector('.modal-car-odometer').innerText        = 'Odometer Reading: ' + carMetadataElem.dataset.odometer + ' miles';
    document.querySelector('.modal-car-seller').innerText          = 'Seller: ' + carMetadataElem.dataset.seller;

    modalElem.style.display = 'flex';
}

function close_modal() {
    document.querySelector('#modal').style.display = 'none';
}

function to_US_currenty_format(number) {
    number = parseInt(number);
    return number.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 2
    });
}

function mergeSort(arrayOfObjects, sortBy, order = 'ascending') {
    if (arrayOfObjects.length <= 1) {
        return arrayOfObjects;
    }

    let middleIndex = Math.floor(arrayOfObjects.length / 2);
    let leftHalf = arrayOfObjects.slice(0, middleIndex);
    let rightHalf = arrayOfObjects.slice(middleIndex);

    let sortedLeftHalf = mergeSort(leftHalf, order, sortBy);
    let sortedRightHalf = mergeSort(rightHalf, order, sortBy);

    return merge(sortedLeftHalf, sortedRightHalf, order, sortBy);
}

function merge(leftHalf, rightHalf, order, sortBy) {
    let result = [];
    let leftIndex = 0;
    let rightIndex = 0;

    while (leftIndex < leftHalf.length && rightIndex < rightHalf.length) {
        let leftPrice = leftHalf[leftIndex][sortBy];
        let rightPrice = rightHalf[rightIndex][sortBy];

        if ((order === 'ascending' && leftPrice <= rightPrice) || (order === 'descending' && leftPrice >= rightPrice)) {
            result.push(leftHalf[leftIndex]);
            leftIndex++;
        } else {
            result.push(rightHalf[rightIndex]);
            rightIndex++;
        }
    }

    return result.concat(leftHalf.slice(leftIndex), rightHalf.slice(rightIndex));
}