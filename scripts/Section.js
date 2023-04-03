export default class Section {
  constructor({items, renderer}, containerSelector) {
    this._initialArray = items
    this._container = document.querySelector(containerSelector)
    this._renderer = renderer
  }
  addItem(element) {
    this._container.append(element)
  }
  renderItems() {
    this._initialArray.forEach( (item) => {
      this._renderer(item)
    })
  }
}