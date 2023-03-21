import {Card} from "./Card.js"

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
const popupPicture = document.querySelector('.popup__img')
const popupCaption = document.querySelector('.popup__img-description')
const popupImage = document.querySelector('#popup_image')

nameInput.value = profileName.textContent
jobInput.value = profileJob.textContent

function openPopup(popup) {
  popup.classList.add('popup_opened')
  document.addEventListener('keydown', closePopupEsc)
  popup.addEventListener('mousedown', closePopupClick)
}

function closePopupEsc(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened')
    closePopup(openedPopup)
  }
}

function closePopupClick(evt) {
  if (evt.target.classList.contains('popup')) {
    closePopup(evt.target)
  }
}

function closePopup(popup) {
  popup.classList.remove('popup_opened')
  document.removeEventListener('keydown', closePopupEsc)
  popup.removeEventListener('mousedown', closePopupClick)
  popup.querySelector('.popup__form').reset()
}

closeButtons.forEach((button) => {
  const popup = button.closest('.popup')
  button.addEventListener('click', () => closePopup(popup))
})

editButton.addEventListener('click', () => {
  validationFormProfile.resetValidation()
  openPopup(popupProfile)
  nameInput.value = profileName.textContent
  jobInput.value = profileJob.textContent
})

addButton.addEventListener('click', () => {
  validationFormPlace.resetValidation()
  openPopup(popupPlace)
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
  cards.prepend(createCard(item))
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

function createCard(item) {
  const card = new Card(item, '#card', handleCardClick)
  return card.generateCard()
}

function handleCardClick(name, link) {
  popupCaption.textContent = name
  popupPicture.src = link
  popupPicture.alt = name
  openPopup(popupImage)
}

initialCards.forEach( (item) => {
  cards.append(createCard(item))
})

const validationFormProfile = new FormValidator(formValidationConfig, formElementProfile)
validationFormProfile.enableValidation()
const validationFormPlace = new FormValidator(formValidationConfig, formElementPlace)
validationFormPlace.enableValidation()