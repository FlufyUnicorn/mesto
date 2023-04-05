export default class UserInfo {
  constructor({userNameSelector, userInfoSelector}) {
    this._name = document.querySelector(userNameSelector)
    this._info = document.querySelector(userInfoSelector)
  }

  getUserInfo() {
    return {
      name: this._name.textContent,
      info: this._info.textContent,
    }
  }

  setUserInfo(data) {
    this._name.textContent = data.name
    this._info.textContent = data.job
  }
}