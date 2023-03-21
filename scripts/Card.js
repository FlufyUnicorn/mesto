import {openPopup} from "./utils.js"
const popupPicture = document.querySelector('.popup__img')
const popupCaption = document.querySelector('.popup__img-description')
const popupImage = document.querySelector('#popup_image')

export class Card {
  constructor(data, templateSelector) {
    this._link = data.link
    this._name = data.name
    this._templateSelector = templateSelector
  }
  _getTemplate() {
    return document.querySelector(this._templateSelector).content.querySelector('.card').cloneNode(true)
  }
  generateCard() {
    this._element = this._getTemplate()
    this._cardImage = this._element.querySelector('.card__image')
    this._setEventListeners()
    this._cardImage.src = this._link
    this._cardImage.alt = this._name
    this._element.querySelector('.card__name').textContent = this._name
    return this._element
  }
  _setEventListeners() {
    this._likeButton = this._element.querySelector('.card__like-button')


    this._likeButton.addEventListener('click', () => {
      this._handleCardLike()
    })
    this._element.querySelector('.card__delete-button').addEventListener('click', () => {
      this._handleCardDelete()
    })
    this._cardImage.addEventListener('click', () => {
      this._handleCardImageClick()
    })
  }
  _handleCardLike() {
    this._likeButton.classList.toggle('card__like-button_active')
  }
  _handleCardDelete() {
    this._element.closest('.card').remove()
    this._element = null
  }
  _handleCardImageClick() {
    openPopup(popupImage)
    popupCaption.textContent = this._name
    popupPicture.src = this._link
    popupPicture.alt = this._name
  }
}