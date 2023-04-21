export default class UserInfo {
  constructor({userNameSelector, userInfoSelector, userAvatarSelector}) {
    this._name = document.querySelector(userNameSelector)
    this._job = document.querySelector(userInfoSelector)
    this._avatar = document.querySelector(userAvatarSelector)
    this._userId = ''
  }

  getUserInfo() {
    return {
      name: this._name.textContent,
      about: this._job.textContent,
      avatar: this._avatar.src,
    }
  }

  setUserInfo(data) {
    if (data.name) this._name.textContent = data.name
    if (data.about) this._job.textContent = data.about
    if (data.avatar) this._avatar.src = data.avatar
    if (data.name) this._avatar.alt = data.name
    this._userId =data._id
  }

  getUserId() {
    return this._userId
  }
}