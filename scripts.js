document.addEventListener("DOMContentLoaded", function() {
  const input = document.querySelector("input")

  input.focus()

  input.onkeyup = function(el) {
    const value = el.target.value
    const color = stringToColor(value)

    setColorLabels(color)
    setBodyColor(color.hex)
  }

  const stringToColor = function(str) {
    // Code from https://stackoverflow.com/a/16348977
    const length = str.length
    let hash = 0
    for (let i = 0; i < length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash)
    }

    const rgbValue = []
    let hexValue = ''
    for (let i = 0; i < 3; i++) {
      rgbValue[i] = (hash >> (i * 8)) & 0xFF
      hexValue += ('00' + rgbValue[i].toString(16)).substr(-2)
    }

    const color = {
      rgb: `rgb(${ rgbValue.join(', ') })`,
      hex: `#${ hexValue }`,
    }

    return color
  }

  function setColorLabels(color) {
    document.querySelector(".color-hex").innerHTML = color.hex
    document.querySelector(".color-rgb").innerHTML = color.rgb
  }

  function setBodyColor(color) {
    document.querySelector("body").setAttribute(
      "style", `background-color: ${ color }; color: ${ color };`
    )
  }
})
