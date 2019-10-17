
let randomUsers = [];
let currentIndex = 0;

// Make an AJAX call to the random users API
$.ajax({
  url: 'https://randomuser.me/api/?results=12&inc=name,location,email,picture,cell,dob&nat=us&',
  dataType: 'json',
  success: function(data) {
    randomUsers = data.results;
    createGallery(data.results);
    createSearchForm();
  }
});

// This method will create the DOM elements and append to the serch container
// It will filter the directory by fullname
const createSearchForm = () => {
  $('.search-container').append(
    `<form action="#" method="get">
       <input type="search" id="search-input" class="search-input" placeholder="Search...">
       <input type="submit" value="&#x1F50D;" id="serach-submit" class="search-submit">
   </form>`
  )

  // Adding message to DOM when no results are found
  const messageForNoResults = $(`<h2 id="no-results"> No results found</h2>`);
  messageForNoResults.hide();
  $('#gallery').append(messageForNoResults);

  // Event listener for search keyup
  $('.search-container').on('keyup',(e) => {
    const searchValue = e.target.value;
    let searchResults = false;
    messageForNoResults.hide();

    // Iterate through the cards and show the cards which includes in search
    $('.card').each(function() {
      // jqeury reference for the current .card
      let $this = $(this);
      const fullName = $this.find('#name')[0].textContent.toLowerCase();

      // If current card includes in the search input, show the card, else hide it.
      if(fullName.includes(searchValue)) {
        $this.show();
        searchResults = true;
      } else {
        $this.hide();
      }
    })
    if(!searchResults){
      messageForNoResults.show();
    }
  })
};

// For the given users create a gallery displaying
// their image, email, city and state
const createGallery = (users) => {
  users.forEach((person, index) => {
    const thumbnail = person.picture.large;
    const firstName = person.name.first;
    const lastName = person.name.last;
    const email = person.email;
    const city = person.location.city;
    const state = person.location.state;

    $('#gallery').append(
      `<div class="card">
        <div class="card-img-container">
          <img class="card-img" src="${thumbnail}" alt="profile picture">
        </div>
        <div class="card-info-container">
            <h3 id="name" class="card-name cap">${firstName} ${lastName}</h3>
            <p class="card-text">${email}</p>
            <p class="card-text cap">${city}, ${state}</p>
        </div>
      </div>`
    )

    $('.card').on('click', (e) => {
      currentIndex = index;
      createModal(randomUsers[index]);
      // To prevent iterting to the end of the loop
      // This method displays the selected card
      e.stopPropogation();
    });
  });
}

// For a given person display the modal with their picture, name, email,
// city, state, birthday,phone number, address
const createModal = (person) => {
  const thumbnail = person.picture.large;
  const firstName = person.name.first;
  const lastName = person.name.last;
  const email = person.email;
  const city = person.location.city;
  const state = person.location.state;

    const birthday = person.dob.date.substring(0,10);
    const phoneNumber = person.cell;
    const streetNum = person.location.street.number;
    const streetName = person.location.street.name;
    //console.log(street);
    const postcode =person.location.postcode;

  $('body').append(
    `<div class="modal-container">
        <div class="modal">
            <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
            <div class="modal-info-container">
                <img class="modal-img" src="${thumbnail}" alt="profile picture">
                <h3 id="name" class="modal-name cap">${firstName} ${lastName}</h3>
                <p class="modal-text">${email}</p>
                <p class="modal-text cap">${city}</p>
                <hr>
                <p class="modal-text">${phoneNumber}</p>
                <p class="modal-text">${streetNum} ${streetName}, ${city}, ${state} 97204</p>
                <p class="modal-text">Birthday:${birthday}</p>
            </div>
            <div class="modal-btn-container">
                <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
                <button type="button" id="modal-next" class="modal-next btn">Next</button>
            </div>
        </div>`
      )

    // To remove the modal once the close button is clicked
    $('.modal-close-btn').on('click', () => {
      $('.modal-container').remove();
    });

    // In order to toggle back and forth between the employees when the
    // modal window is open we add the below functionality
    $('.modal-prev').on('click',() => {
      $('.modal-container').remove();
      if(currentIndex === 0) {
        currentIndex = randomUsers.length - 1;
      } else {
        currentIndex = currentIndex - 1;
      }
      createModal(randomUsers[currentIndex]);
    })

    $('.modal-next').on('click',() => {
      $('.modal-container').remove();
      if(currentIndex === randomUsers.length - 1) {
        currentIndex = 0;
      } else {
        currentIndex = currentIndex + 1;
      }
      createModal(randomUsers[currentIndex]);
    })
}
