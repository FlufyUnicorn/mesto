const closeButtons = document.querySelectorAll('.popup__close-button')

export default class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector
    this._handleEscClose = this._handleEscClose.bind(this)
    this._handleClickClose = this._handleClickClose.bind(this)
    this.close = this.close.bind(this)
    this._popup = document.querySelector(this._popupSelector)
    this.setEventListeners()
  }
  open() {
    this._popup.classList.add('popup_opened')
  }

  close () {
    this._popup.classList.remove('popup_opened')
    this.removeEventListeners()
  }

  _handleEscClose (evt) {
    if (evt.key === 'Escape') {
      this.close()
    }
  }

  _handleClickClose (evt) {
    if (evt.target.classList.contains('popup')) {
      this.close()
    }
  }

  setEventListeners() {
    closeButtons.forEach((button) => {
      button.addEventListener('click', this.close)
    })
    document.addEventListener('keydown', this._handleEscClose)
    this._popup.addEventListener('mousedown', this._handleClickClose)
  }

  removeEventListeners() {
    document.removeEventListener('keydown', this._handleEscClose)
    this._popup.removeEventListener('mousedown', this._handleClickClose)
  }
}