const formValidationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  saveButtonSelector: '.popup__save-button',
  inputWithErrorClass: 'popup__input_type_error',
  inputErrorTextActiveClass: 'popup__input-error-text_active',
  saveButtonInactiveClass: 'popup__save-button_inactive',
}

class FormValidator {
  constructor(data, form) {
    this._data = data
    this._form = form
  }
  enableValidation() {
      this._setEventListeners(this._form, this._data)
  }

  _setEventListeners = (formElement) => {
    this._inputList = Array.from(formElement.querySelectorAll(this._data.inputSelector))
    this._buttonElement = formElement.querySelector(this._data.saveButtonSelector)
    this._toggleButtonState()
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._isValid(formElement, inputElement)
        this._toggleButtonState()
      })
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

  _isValid = (formElement, inputElement) => {
    if (!inputElement.validity.valid) {
      this._showInputError(formElement, inputElement, inputElement.validationMessage)
    } else {
      this._hideInputError(formElement, inputElement)
    }
  }

  _showInputError = (formElement, inputElement, errorMessage) => {
    this._errorElement = formElement.querySelector(`.${inputElement.id}-error`)
    inputElement.classList.add(this._data.inputWithErrorClass)
    this._errorElement.textContent = errorMessage
    this._errorElement.classList.add(this._data.inputErrorTextActiveClass)
  }

  _hideInputError = (formElement, inputElement) => {
    this._errorElement = formElement.querySelector(`.${inputElement.id}-error`)
    inputElement.classList.remove(this._data.inputWithErrorClass)
    this._errorElement.classList.remove(this._data.inputErrorTextActiveClass)
    this._errorElement.textContent = ''
  }
}

const formList = Array.from(document.querySelectorAll('.popup__form'))
formList.forEach((formElement) => {
  const validationForm = new FormValidator(formValidationConfig, formElement)
  validationForm.enableValidation()
})
