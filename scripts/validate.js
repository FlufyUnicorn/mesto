const formValidationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  saveButtonSelector: '.popup__save-button',
  inputWithErrorClass: 'popup__input_type_error',
  inputErrorTextActiveClass: 'popup__input-error-text_active',
  saveButtonInactiveClass: 'popup__save-button_inactive',
}

const showInputError = (formElement, inputElement, errorMessage, config) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`)
  inputElement.classList.add(config.inputWithErrorClass)
  errorElement.textContent = errorMessage
  errorElement.classList.add(config.inputErrorTextActiveClass)
}

const hideInputError = (formElement, inputElement, config) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`)
  inputElement.classList.remove(config.inputWithErrorClass)
  errorElement.classList.remove(config.inputErrorTextActiveClass)
  errorElement.textContent = ''

}

const isValid = (formElement, inputElement, config) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, config)
  } else {
    hideInputError(formElement, inputElement, config)
  }
}

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid
  })
}

const toggleButtonState = (inputList, buttonElement, config) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true
    buttonElement.classList.add(config.saveButtonInactiveClass)
  } else {
    buttonElement.disabled = false
    buttonElement.classList.remove(config.saveButtonInactiveClass)
  }
}

const setEventListeners = (formElement, config) => {
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector))
  const buttonElement = formElement.querySelector(config.saveButtonSelector)
  toggleButtonState(inputList, buttonElement, config)
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      isValid(formElement, inputElement, config)
      toggleButtonState(inputList, buttonElement, config)
    })
  })
}

const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector))
  formList.forEach((formElement) => {
    setEventListeners(formElement, config)
  })
}

enableValidation(formValidationConfig)