export default class UserInfo {
  constructor({userNameSelector, userInfoSelector}) {
    this._inputName = document.querySelector(userNameSelector)
    this._inputInfo = document.querySelector(userInfoSelector)
    this._name = document.querySelector('.profile__name')
    this._info = document.querySelector('.profile__job')
  }

  getUserInfo() {
    return {
      name: this._name.textContent,
      info: this._info.textContent,
    }
  }

  setUserInfoPopup(data) {
    this._inputName.value = data.name
    this._inputInfo.value = data.info
  }

  setUserInfoProfile(data) {
    this._name.textContent = data.name
    this._info.textContent = data.job
  }
}