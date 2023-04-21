export class Card {
  constructor(data, userId, templateSelector, handleCardClick, handleCardLike, handleOpenConfirm) {
    this._link = data.link
    this._name = data.name
    this._likes = data.likes
    this._cardId =data._id
    this._userId = userId
    this._templateSelector = templateSelector
    this._owner = data.owner._id
    this._handleCardClick = handleCardClick
    this._handleCardLike = handleCardLike
    this._handleOpenConfirm = handleOpenConfirm

  }
  _getTemplate() {
    return document.querySelector(this._templateSelector).content.querySelector('.card').cloneNode(true)
  }
  generateCard() {
    this._element = this._getTemplate()
    this._likeButton = this._element.querySelector('.card__like-button')
    this._deleteButton = this._element.querySelector('.card__delete-button')
    this._likeCounter = this._element.querySelector('.card__like-counter')
    this._cardImage = this._element.querySelector('.card__image')

    if (this._likes.some(item=>item._id === this._userId)) {
      this._isLiked = true
      this._likeButton.classList.add('card__like-button_active')
    }
    else {
      this._isLiked = false
      this._likeButton.classList.remove('card__like-button_active')
    }

    if (this._userId !== this._owner) {
      this._deleteButton.classList.add('card__delete-button_hidden')
    }

    this._setEventListeners()
    this._cardImage.src = this._link
    this._cardImage.alt = this._name
    this._likeCounter.textContent = this._likes.length
    this._element.querySelector('.card__name').textContent = this._name
    return this._element
  }

  _setEventListeners() {
    this._likeButton.addEventListener('click', () => {
      this._handleCardLike(this._cardId, this._isLiked, this)
    })
    this._deleteButton.addEventListener('click', () => {
      this._handleCardDelete(this._cardId, this)
    })
    this._cardImage.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link)
    })
  }

  toggleLike({ likes }) {
    this._likeCounter.textContent = likes.length
    this._isLiked = !this._isLiked
    this._isLiked
      ? this._likeButton.classList.add('card__like-button_active')
      : this._likeButton.classList.remove('card__like-button_active')
  }

  deleteCard() {
    this._element.closest('.card').remove()
    this._element = null
  }

  _handleCardDelete() {
    this._handleOpenConfirm(this._cardId, this)
  }
}