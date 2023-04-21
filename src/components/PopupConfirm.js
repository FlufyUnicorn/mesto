import Popup from "./Popup.js"

export default class PopupConfirm extends Popup {
  constructor(popupSelector, handleSubmit) {
    super(popupSelector)
    this._handleSubmit = handleSubmit
    this._form = this._popup.querySelector(".popup__form")
    this._buttonSubmit = this._form.querySelector('button')
  }

  open(cardId, card) {
    console.log(card, 'card in open')
    this._card = card
    this._cardId = cardId
    super.open()
  }

  setEventListeners() {
    super.setEventListeners()
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault()
      this._handleSubmit(this._cardId, this._card)
    })
  }

  setLoading(isLoading, buttonText) {
    if (isLoading) {
      this._buttonSubmit.textContent = buttonText
      this._buttonSubmit.disabled = true
    } else {
      this._buttonSubmit.textContent = buttonText
      this._buttonSubmit.disabled = false
    }
  }
}