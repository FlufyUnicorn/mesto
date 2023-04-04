export default class UserInfo {
  constructor({userNameSelector, userInfoSelector}) {
    this._name = document.querySelector(userNameSelector)
    this._info = document.querySelector(userInfoSelector)
  }
  getUserInfo () {
    this._name.value = document.querySelector('.profile__name').textContent
    this._info.value = document.querySelector('.profile__job').textContent
  }
  setUserInfo() {
    document.querySelector('.profile__name').textContent = this._name.value
    document.querySelector('.profile__job').textContent = this._info.value
  }
}