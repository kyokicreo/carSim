let speedCount = 0
let speed = document.getElementById("speed")
let handbrake = document.getElementById("handbrake")
let statusEng = document.getElementById("statusEng")
let speedometr = document.getElementById("speedometr")
const ENGINE_VOLUME = 1.2
let rate = 0.05 + (ENGINE_VOLUME* 0.06)
let pressed = false
let brakeStrong = 1
let engineOn = false
let stopCar = false
const maxSpeed = 240

document.addEventListener("keydown", (e) => {
    if (e.code == "KeyW") {
        if (engineOn || stopCar) return
        pressed = true
    }
    if (e.code == "KeyF") {
        if (engineOn) engineOn = false
        else engineOn = true

        if (engineOn) {
            pressed = false
        }
    }
    if(e.code == "KeyS") {
        if (engineOn || stopCar) return
        speedCount -= brakeStrong
        if (speedCount < 0) speedCount = 0
    }
    if (e.code == "Space") {
        e.preventDefault()
        if (stopCar) stopCar = false
        else stopCar = true

        if (stopCar) {
            pressed = false
        }
    }
})

document.addEventListener("keyup", (e) => {
    if (e.code == "KeyW") {
        pressed = false
    }
})

function updateSpeed() {
    if (stopCar) {
        if (speedCount > 0) {
            speedCount -= 3
            if (speedCount < 0) speedCount = 0
        }
    }
    else if (pressed) {
        if (speedCount < maxSpeed) speedCount += rate
    }
    else {
        
        if (speedCount > 0) {
            speedCount -= 0.07
            if (speedCount < 0) speedCount = 0
        }
    }

    if (speedCount > 234) {
        speedometr.style.backgroundColor = "red"
    } else {
        speedometr.style.backgroundColor = "green"
    }

    speed.textContent = "Speed: " + Math.floor(speedCount)
    speedometr.style.width = Math.floor(speedCount) * 2 + "px"
    statusEng.textContent = engineOn ? "Engine: on" : "Engine: off"
    handbrake.textContent = stopCar ? "Handbrake: on" : "Handbrake: off"
    requestAnimationFrame(updateSpeed)

}

updateSpeed()