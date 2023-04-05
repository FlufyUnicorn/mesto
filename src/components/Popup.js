export default class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector
    this._handleEscClose = this._handleEscClose.bind(this)
    this._handleClickClose = this._handleClickClose.bind(this)
    this.close = this.close.bind(this)
    this._popup = document.querySelector(this._popupSelector)
    this._closeButton = this._popup.querySelector('.popup__close-button')
  }
  open() {
    document.addEventListener('keydown', this._handleEscClose)
    this._popup.addEventListener('mousedown', this._handleClickClose)
    this._popup.classList.add('popup_opened')
  }

  close () {
    this._popup.classList.remove('popup_opened')
    document.removeEventListener('keydown', this._handleEscClose)
    this._popup.removeEventListener('mousedown', this._handleClickClose)
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
    this._closeButton.addEventListener('click', this.close)
  }
}