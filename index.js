const editButton = document.querySelector('.profile__edit-button');
const closeButton = document.querySelector('.popup__close-button');
const popup = document.querySelector('.popup');
const profileName = document.querySelector('.profile__name')
const profileJob = document.querySelector('.profile__job')

function openPopup() {
  popup.classList.add('popup_opened');
  const inputName = document.querySelector('.popup__input_type_name')
  const inputJob = document.querySelector('.popup__input_type_job')
  inputName.value = profileName.textContent
  inputJob.value = profileJob.textContent
}

function closePopup() {
  popup.classList.remove('popup_opened');
}

editButton.addEventListener('click', openPopup);
closeButton.addEventListener('click', closePopup);

const formElement = document.querySelector('.popup__form')
const nameInput = formElement.querySelector('.popup__input_type_name')
const jobInput = formElement.querySelector('.popup__input_type_job')

  function handleFormSubmit (evt) {
    evt.preventDefault()
    profileName.textContent = nameInput.value
    profileJob.textContent = jobInput.value
    closePopup()
  }

formElement.addEventListener('submit', handleFormSubmit);