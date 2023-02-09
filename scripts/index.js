const editButton = document.querySelector('.profile__edit-button')
const addButton = document.querySelector('.profile__add-button')
const profileName = document.querySelector('.profile__name')
const profileJob = document.querySelector('.profile__job')
const formElementProfile = document.forms['profile-form']
const formElementPlace = document.forms['place-form']
const nameInput = formElementProfile.elements.name
const jobInput = formElementProfile.elements.job
const popupProfile = document.querySelector('#popup_profile')
const popupPlace = document.querySelector('#popup_place')
const popupImage = document.querySelector('#popup_image')
const placeInput = formElementPlace.elements.new_place
const linkInput = formElementPlace.elements.place_link
const cardTemplate = document.querySelector('#card').content
const cards = document.querySelector('.cards')
const closeButtons = document.querySelectorAll('.popup__close-button');
const popupPicture = document.querySelector('.popup__img')
const popupCaption = document.querySelector('.popup__img-description')

function openPopup(popup) {
  popup.classList.add('popup_opened')
}

function closePopup(popup) {
  return () => popup.classList.remove('popup_opened')
}

closeButtons.forEach((button) => {
  const popup = button.closest('.popup')
  button.addEventListener('click', closePopup(popup))
});

editButton.addEventListener('click', () => {
  openPopup(popupProfile)
  nameInput.value = profileName.textContent
  jobInput.value = profileJob.textContent
})

addButton.addEventListener('click', () => {
  openPopup(popupPlace)
})

function handleFormSubmitProfile(evt) {
  evt.preventDefault()
  profileName.textContent = nameInput.value
  profileJob.textContent = jobInput.value
  closePopup(popupProfile)()
}

formElementProfile.addEventListener('submit', handleFormSubmitProfile)

function addCard(card) {
  let cardElement = cardTemplate.querySelector('.card').cloneNode(true)
  const cardImage = cardElement.querySelector('.card__image')
  cardImage.src = card.link
  cardImage.alt = card.name
  cardElement.querySelector('.card__name').textContent = card.name
  cardElement.querySelector('.card__like-button').addEventListener('click', function (evt) {
    evt.target.classList.toggle('card__like-button_active')
  })
  cardElement.querySelector('.card__delete-button').addEventListener('click', function (evt) {
    evt.target.closest('.card').remove();
  })
  cardImage.addEventListener('click', function() {
    openPopup(popupImage)
    popupCaption.textContent = card.name
    popupPicture.src = card.link
    popupPicture.alt = card.name
  })
  return cardElement
}

function handleFormSubmitPlace(evt) {
  evt.preventDefault()
  const item = {
    name: placeInput.value,
    link: linkInput.value
  }
  const cardElement = addCard(item)
  cards.prepend(cardElement)
  placeInput.value=''
  linkInput.value=''
}

formElementPlace.addEventListener('submit', handleFormSubmitPlace)

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

initialCards.forEach(function (card) {
  const cardElement = addCard(card)
  cards.append(cardElement)
})