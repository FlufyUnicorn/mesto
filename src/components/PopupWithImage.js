import Popup from "./Popup.js"

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector)
    this._image = this._popup.querySelector('.popup__img')
    this._title = this._popup.querySelector('.popup__img-description')
  }
  open (name, link) {
    this._image.src = link
    this._image.alt = name
    this._title.textContent = name
    super.open()
  }
}