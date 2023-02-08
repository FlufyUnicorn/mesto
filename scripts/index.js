const editButton = document.querySelector('.profile__edit-button')
const addButton = document.querySelector('.profile__add-button')
const profileName = document.querySelector('.profile__name')
const profileJob = document.querySelector('.profile__job')
const formElementProfile = document.querySelector('#profile_form')
const formElementPlace = document.querySelector('#place_form')
const nameInput = document.querySelector('#input_type_name')
const jobInput = document.querySelector('#input_type_job')
const popupProfile = document.querySelector('#popup_profile')
const popupPlace = document.querySelector('#popup_place')
const popupImage = document.querySelector('#popup_image')
const placeInput = document.querySelector('#input_type_place-name')
const linkInput = document.querySelector('#input_type_link')
const cardTemplate = document.querySelector('#card').content
const cards = document.querySelector('.cards')
let cardElement

editButton.addEventListener('click', () => {
  popupProfile.classList.add('popup_opened')
  nameInput.value = profileName.textContent
  jobInput.value = profileJob.textContent
})

addButton.addEventListener('click', () => {
  popupPlace.classList.add('popup_opened')
})

function closeProfilePopup() {
  popupProfile.classList.remove('popup_opened')
}

function closePlacePopup() {
  popupPlace.classList.remove('popup_opened')
}

function closeImagePopup() {
  popupImage.classList.remove('popup_opened')
  popupImage.querySelector('.popup__img').src = '#'
}

popupProfile.querySelector('.popup__close-button').addEventListener('click', closeProfilePopup)
popupPlace.querySelector('.popup__close-button').addEventListener('click', closePlacePopup)
popupImage.querySelector('.popup__close-button').addEventListener('click', closeImagePopup)

function handleFormSubmitProfile(evt) {
  evt.preventDefault()
  profileName.textContent = nameInput.value
  profileJob.textContent = jobInput.value
  closeProfilePopup()
}

formElementProfile.addEventListener('submit', handleFormSubmitProfile)

function addCard() {
  cardElement = cardTemplate.querySelector('.card').cloneNode(true)
  cardElement.querySelector('.card__like-button').addEventListener('click', function (evt) {
    evt.target.classList.toggle('card__like-button_active')
  })
  cardElement.querySelector('.card__delete-button').addEventListener('click', function (evt) {
    evt.target.closest('.card').remove();
  })
  cardElement.querySelector('.card__image').addEventListener('click', function (evt) {
    popupImage.classList.add('popup_opened')
    document.querySelector('.popup__img-description').textContent = evt.target.closest('.card__image').nextElementSibling.firstElementChild.textContent
    document.querySelector('.popup__img').src = evt.target.closest('.card__image').src
  })
}

function handleFormSubmitPlace(evt) {
  evt.preventDefault()
  addCard()
  cardElement.querySelector('.card__image').src = linkInput.value
  cardElement.querySelector('.card__image').alt = placeInput.value
  cardElement.querySelector('.card__name').textContent = placeInput.value
  cards.prepend(cardElement)
  closePlacePopup()
}

formElementPlace.addEventListener('submit', handleFormSubmitPlace)

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

initialCards.forEach(function (card) {
  addCard()
  cardElement.querySelector('.card__image').src = card.link
  cardElement.querySelector('.card__image').alt = card.name
  cardElement.querySelector('.card__name').textContent = card.name
  cards.append(cardElement)
})






