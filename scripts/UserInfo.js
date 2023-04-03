export default class UserInfo {
  constructor({userNameSelector, userInfoSelector}) {
    this._name = document.querySelector(userNameSelector)
    this._info = document.querySelector(userInfoSelector)
  }
  getUserInfo () {
    const userInfo = {
      fullName: this._name.textContent,
      workplace: this._info.textContent,
    }
    return userInfo
  }
  setUserInfo(data) {
    if (data.name) this._name.textContent = data.name
    if (data.info) this._info.textContent = data.info
  }
}