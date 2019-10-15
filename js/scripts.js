

// To get data from the Random User API endpoint.
let randomUsers = [];

$.ajax({
  url: 'https://randomuser.me/api/?results=12',
  dataType: 'json',
  success: function(data) {
    randomUsers = data.results;
    console.log(randomUsers);
    //console.log(data);
    createGallery(data.results);
    //createModal(data.results);
  }
});

// Get and display 12 random users, and display their image, email, city and state

const createGallery = (users) => {
  users.forEach((person, index) => {
    console.log(index);
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
      // console.log(index);
      // console.log(randomUsers[index])
      // console.log('something')
      createModal(randomUsers[index]);
      // To prevent iterting to the end of the loop
      // This method displays the selected card
      e.stopPropogation();
    });
  });
}

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
        </div>`
      )
    $(".modal-close-btn").on('click', () => {
      $(".modal-container").remove();
    });
}
