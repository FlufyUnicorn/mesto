import Popup from "./Popup.js"

export default class PopupWithForm extends Popup {
  constructor({popupSelector, handleFormSubmit}) {
    super(popupSelector)
    this._handleFormSubmit = handleFormSubmit
    this._form = this._popup.querySelector('.popup__form')
    this._handleSubmit = this.handleSubmit.bind(this)
  }

  open() {
    super.open()
    this.setEventListeners()
  }

  _getInputValues() {
    this._inputList = this._popup.querySelectorAll('.popup__input')
    this._formValues = {}
    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value
    })
    return this._formValues
  }

  handleSubmit (evt) {
    evt.preventDefault()
    this._handleFormSubmit(this._getInputValues())
  }

  setEventListeners() {
    super.setEventListeners()
    this._popup.addEventListener('submit', this._handleSubmit)
  }

  close() {
    super.close()
    this._form.reset()
    this._popup.removeEventListener('submit', this._handleSubmit)
  }
}