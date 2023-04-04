export class Card {
  constructor(data, templateSelector, handleCardClick) {
    this._link = data.link
    this._name = data.name
    this._templateSelector = templateSelector
    this._handleCardClick = handleCardClick
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
      this._handleCardClick(this._name, this._link)
    })
  }
  _handleCardLike() {
    this._likeButton.classList.toggle('card__like-button_active')
  }
  _handleCardDelete() {
    this._element.closest('.card').remove()
    this._element = null
  }
}