import Popup from "./Popup.js"

export default class PopupWithForm extends Popup {
  constructor({popupSelector, handleFormSubmit}) {
    super(popupSelector)
    this._handleFormSubmit = handleFormSubmit
    this._form = this._popup.querySelector('.popup__form')
    this._handleSubmit = this.handleSubmit.bind(this)
    this._inputList = this._popup.querySelectorAll('.popup__input')
    this._buttonSubmit = this._form.querySelector('button')
  }

  _getInputValues() {
    this._formValues = {}
    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value
    })
    return this._formValues
  }

  setInputValue(data) {
    console.log(this._inputList)
    this._inputList.forEach((item) => {
      item.value = data[item.name]
    })
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