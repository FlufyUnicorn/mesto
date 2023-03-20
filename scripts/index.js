import {Card} from "./Card.js"
import {openPopup, closePopup} from "./utils.js";


const editButton = document.querySelector('.profile__edit-button')
const addButton = document.querySelector('.profile__add-button')
const profileName = document.querySelector('.profile__name')
const profileJob = document.querySelector('.profile__job')
const formElementProfile = document.forms['profile-form']
const formElementPlace = document.forms['place-form']
const nameInput = formElementProfile.elements.name
const jobInput = formElementProfile.elements.job
const popupProfile = document.querySelector('#popup_profile')
const popupPlace = document.querySelector('#popup_place')
const placeInput = formElementPlace.elements.new_place
const linkInput = formElementPlace.elements.place_link
const cards = document.querySelector('.cards')
const closeButtons = document.querySelectorAll('.popup__close-button')
const saveButton = popupPlace.querySelector('.popup__save-button')

nameInput.value = profileName.textContent
jobInput.value = profileJob.textContent

closeButtons.forEach((button) => {
  const popup = button.closest('.popup')
  button.addEventListener('click', () => closePopup(popup))
})

editButton.addEventListener('click', () => {
  openPopup(popupProfile)
  nameInput.value = profileName.textContent
  jobInput.value = profileJob.textContent
})

addButton.addEventListener('click', () => {
  openPopup(popupPlace)
  saveButton.classList.add('popup__save-button_inactive');
  saveButton.disabled = true
})

function handleFormSubmitProfile(evt) {
  evt.preventDefault()
  profileName.textContent = nameInput.value
  profileJob.textContent = jobInput.value
  closePopup(popupProfile)
}

formElementProfile.addEventListener('submit', handleFormSubmitProfile)

function handleFormSubmitPlace(evt) {
  evt.preventDefault()
  const item = {
    name: placeInput.value,
    link: linkInput.value
  }

  const card = new Card(item, '.card')
  const cardElement = card.generateCard()
  cards.prepend(cardElement)
  closePopup(popupPlace)
  evt.target.reset()
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
]

initialCards.forEach( (item) => {
  const card = new Card(item, '.card')
  const cardElement = card.generateCard()
  cards.append(cardElement)
})