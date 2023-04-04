import './index.css'

import {Card} from "../components/Card.js"
import Section from "../components/Section.js"
import PopupWithForm from "../components/PopupWithForm.js"
import PopupWithImage from "../components/PopupWithImage.js"
import UserInfo from "../components/UserInfo.js"
import FormValidator from "../components/FormValidator"
import {formValidationConfig} from "../components/FormValidator"

const editButton = document.querySelector('.profile__edit-button')
const addButton = document.querySelector('.profile__add-button')
const formElementProfile = document.forms['profile-form']
const formElementPlace = document.forms['place-form']
const cards = document.querySelector('.cards')

const user = new UserInfo({userNameSelector: '#name-input', userInfoSelector: '#job-input'})

const popupPlace = new PopupWithForm({popupSelector:'#popup_place', handleFormSubmit:handleFormSubmitPlace })
const popupImage = new PopupWithImage('#popup_image')
const popupProfile = new PopupWithForm({popupSelector: '#popup_profile', handleFormSubmit: handleFormSubmitProfile})

const validationFormProfile = new FormValidator(formValidationConfig, formElementProfile)
validationFormProfile.enableValidation()
const validationFormPlace = new FormValidator(formValidationConfig, formElementPlace)
validationFormPlace.enableValidation()

user.getUserInfo()

editButton.addEventListener('click', () => {
  validationFormProfile.resetValidation()
  popupProfile.open()
  return user.getUserInfo()
})

addButton.addEventListener('click', () => {
  validationFormPlace.resetValidation()
  popupPlace.open()
})

function handleFormSubmitProfile() {
  user.setUserInfo()
  popupProfile.close()
}

function handleFormSubmitPlace(data) {
  const item = {
    name: data.new_place,
    link: data.place_link
  }
  cards.prepend(createCard(item))
  popupPlace.close()
}

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
  popupImage.open(name, link)
}

const cardsList = new Section({
    items: initialCards,
    renderer: (cardItem) => {
      cardsList.addItem(createCard(cardItem))
    },
  },
  '.cards'
);
cardsList.renderItems()