import './index.css'

import {Card} from "../components/Card.js"
import Section from "../components/Section.js"
import PopupWithForm from "../components/PopupWithForm.js"
import PopupWithImage from "../components/PopupWithImage.js"
import UserInfo from "../components/UserInfo.js"
import FormValidator from "../components/FormValidator"
import {formValidationConfig} from "../components/FormValidator"
import Api from "../components/Api"
import PopupConfirm from "../components/PopupConfirm"

const editButton = document.querySelector('.profile__edit-button')
const addButton = document.querySelector('.profile__add-button')
const formElementProfile = document.forms['profile-form']
const formElementPlace = document.forms['place-form']
const formElementAvatar = document.forms['avatar-form']

const user = new UserInfo({userNameSelector: '.profile__name', userInfoSelector: '.profile__job', userAvatarSelector:'.profile__avatar-img'})

const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-64",
  headers: {
    authorization: "c8b18729-6303-4632-ac74-6dd691cdcdf0",
    "Content-Type": "application/json",
  },
})

const popupPlace = new PopupWithForm({popupSelector:'#popup_place', handleFormSubmit:handleFormSubmitPlace })
popupPlace.setEventListeners()
const popupImage = new PopupWithImage('#popup_image')
popupImage.setEventListeners()
const popupProfile = new PopupWithForm({popupSelector: '#popup_profile', handleFormSubmit: handleFormSubmitProfile})
popupProfile.setEventListeners()
const popupDelete = new PopupConfirm('.popup_delete', handleFormSubmitDelete)
popupDelete.setEventListeners()
const popupAvatar = new PopupWithForm({popupSelector: '#popup_avatar', handleFormSubmit: handleFormSubmitAvatar})
popupAvatar.setEventListeners()


const validationFormProfile = new FormValidator(formValidationConfig, formElementProfile)
validationFormProfile.enableValidation()
const validationFormPlace = new FormValidator(formValidationConfig, formElementPlace)
validationFormPlace.enableValidation()
const validationFormAvatar = new FormValidator(formValidationConfig, formElementAvatar)
validationFormAvatar.enableValidation()

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userData, cards]) => {
    user.setUserInfo(userData)
    cardsList.renderItems(cards)
  })
  .catch(console.log)

editButton.addEventListener('click', () => {
  const userInfo = user.getUserInfo()
  popupProfile.setInputValue(userInfo)
  document.querySelector('#name-input').value = userInfo.name
  document.querySelector('#job-input').value = userInfo.about
  popupProfile.open()
  validationFormProfile.resetValidation()
})

addButton.addEventListener('click', () => {
  validationFormPlace.resetValidation()
  popupPlace.open()
})

document.querySelector('.profile__avatar').addEventListener('click', () => {
  validationFormAvatar.resetValidation()
  popupAvatar.open()
})

function handleFormSubmitProfile(data) {
  popupProfile.setLoading(true, 'Сохранение...')
  api.setUserInfo(data)
    .then(res=> {
      user.setUserInfo(res)
      popupProfile.close()
    })
    .catch(console.log)
    .finally(() => {
      popupProfile.setLoading(false, 'Сохранить')
    })
}

function handleFormSubmitPlace(data) {
  popupPlace.setLoading(true, 'Сохранение...')
  api.addNewCard(data)
    .then(res=> {
      cardsList.addItem(createCard(res))
      popupPlace.close()
    })
    .catch(console.log)
    .finally(() => {
      popupPlace.setLoading(false, 'Сохранить')
    })
}

function handleFormSubmitDelete(cardId, card) {
  popupDelete.setLoading(true, 'Удаление...')
  api.deleteCard(cardId)
    .then(() => {
      card.deleteCard()
      popupDelete.close()
    })
    .catch(console.log)
    .finally(() => {
      popupDelete.setLoading(false, 'Да')
    })
}

function handleFormSubmitAvatar(url) {
  popupAvatar.setLoading(true, 'Сохранение...')
  api.changeAvatar(url)
    .then((res) => {
      user.setUserInfo(res)
      popupAvatar.close()
    })
    .catch(console.log)
    .finally(() => {
      popupAvatar.setLoading(false, 'Сохранить')
    })
}

function handleOpenConfirm(cardId, card) {
  popupDelete.open(cardId, card)
}

function createCard(data) {
  const card = new Card(data, user._userId, '#card', handleCardClick, handleCardLike, handleOpenConfirm)
  return card.generateCard()
}

function handleCardClick(name, link) {
  popupImage.open(name, link)
}

function handleCardLike(cardId, isLiked, card) {
  if (isLiked) {
    api.dislikeCard(cardId)
      .then(res=> card.toggleLike(res))
      .catch(console.log)
  }
  else {
    api.likeCard(cardId)
      .then(res=> {card.toggleLike(res)})
      .catch(console.log)
  }
}

const cardsList = new Section({
    renderer: (cardItem) => {
      cardsList.addItem(createCard(cardItem))
    },
  },
  '.cards'
)