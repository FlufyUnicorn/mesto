export const formValidationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  saveButtonSelector: '.popup__save-button',
  inputWithErrorClass: 'popup__input_type_error',
  inputErrorTextActiveClass: 'popup__input-error-text_active',
  saveButtonInactiveClass: 'popup__save-button_inactive',
}

export default class FormValidator {
  constructor(data, form) {
    this._data = data
    this._form = form
  }

  enableValidation() {
      this._setEventListeners()
  }

  _setEventListeners = () => {
    this._inputList = Array.from(this._form.querySelectorAll(this._data.inputSelector))
    this._buttonElement = this._form.querySelector(this._data.saveButtonSelector)
    this._toggleButtonState()
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._isValid(inputElement)
        this._toggleButtonState()
      })
    })
  }

  resetValidation = () => {
    this._toggleButtonState()
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement)
    })
  }

  _toggleButtonState = () => {
    if (this._hasInvalidInput()) {
      this._buttonElement.disabled = true
      this._buttonElement.classList.add(this._data.saveButtonInactiveClass)
    } else {
      this._buttonElement.disabled = false
      this._buttonElement.classList.remove(this._data.saveButtonInactiveClass)
    }
  }

  _hasInvalidInput = () => {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid
    })
  }

  _isValid = (inputElement) => {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage)
    } else {
      this._hideInputError(inputElement)
    }
  }

  _showInputError = (inputElement, errorMessage) => {
    this._errorElement = this._form.querySelector(`.${inputElement.id}-error`)
    inputElement.classList.add(this._data.inputWithErrorClass)
    this._errorElement.textContent = errorMessage
    this._errorElement.classList.add(this._data.inputErrorTextActiveClass)
  }

  _hideInputError = (inputElement) => {
    this._errorElement = this._form.querySelector(`.${inputElement.id}-error`)
    inputElement.classList.remove(this._data.inputWithErrorClass)
    this._errorElement.classList.remove(this._data.inputErrorTextActiveClass)
    this._errorElement.textContent = ''
  }
}