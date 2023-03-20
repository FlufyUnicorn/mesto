import {openPopup} from "./utils.js"
const popupPicture = document.querySelector('.popup__img')
const popupCaption = document.querySelector('.popup__img-description')
const popupImage = document.querySelector('#popup_image')
const cardTemplate = document.querySelector('#card').content

export class Card {
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