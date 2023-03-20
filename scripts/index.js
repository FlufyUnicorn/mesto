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
const popupPicture = document.querySelector('.popup__img')
const popupCaption = document.querySelector('.popup__img-description')
const popupImage = document.querySelector('#popup_image')
const cardTemplate = document.querySelector('#card').content
const placeInput = formElementPlace.elements.new_place
const linkInput = formElementPlace.elements.place_link
const cards = document.querySelector('.cards')
const closeButtons = document.querySelectorAll('.popup__close-button')

const saveButton = popupPlace.querySelector('.popup__save-button')

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
}

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

class Card {
  constructor(data, templateSelector) {
    this._link = data.link
    this._name = data.name
    this._templateSelector = templateSelector
  }
  _getTemplate() {
    return cardTemplate.querySelector(this._templateSelector).cloneNode(true)
  }
  generateCard() {
    this._element = this._getTemplate()
    this._setEventListeners()
    this._element.querySelector('.card__image').src = this._link
    this._element.querySelector('.card__image').alt = this._name
    this._element.querySelector('.card__name').textContent = this._name
    return this._element
  }
  _setEventListeners() {
    this._element.querySelector('.card__like-button').addEventListener('click', () => {
      this._handleCardLike()
    })
    this._element.querySelector('.card__delete-button').addEventListener('click', () => {
      this._handleCardDelete()
    })
    this._element.querySelector('.card__image').addEventListener('click', () => {
      this._handleCardImageClick()
    })
  }
  _handleCardLike() {
    this._element.querySelector('.card__like-button').classList.toggle('card__like-button_active')
  }
  _handleCardDelete() {
    this._element.closest(this._templateSelector).remove()
    this._element = null
  }
  _handleCardImageClick() {
    openPopup(popupImage)
    popupCaption.textContent = this._name
    popupPicture.src = this._link
    popupPicture.alt = this._name
  }
}

initialCards.forEach( (item) => {
  const card = new Card(item, '.card')
  const cardElement = card.generateCard()
  cards.append(cardElement)
})