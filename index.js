let speedCount = 0
let speed = document.getElementById("speed")
let handbrake = document.getElementById("handbrake")
let statusEng = document.getElementById("statusEng")
let pressed = false
let turnOn = true
let stopCar = false

document.addEventListener("keydown", (e) => {
    if (e.code == "KeyW") {
        if (turnOn || stopCar) return
        pressed = true
    }
    if (e.code == "KeyF"){
        if (turnOn) turnOn = false
        else turnOn = true

        if (turnOn) {
            pressed = false
        }
    }
    if (e.code == "Space") {
        e.preventDefault()
        if(stopCar) stopCar = false
        else stopCar = true

        if(stopCar) {
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
        if(speedCount > 0) {
            speedCount -= 3
            if(speedCount < 0) speedCount = 0
        }
    }
    else if (pressed) {
        if (speedCount < 240) speedCount += 0.3
    }
    else {
        if (speedCount > 0) {
            speedCount -= 0.07
            if (speedCount < 0) speedCount = 0 
        }
    }

    speed.textContent = "Speed: " + Math.floor(speedCount)
    statusEng.textContent = turnOn ? "Engine: off" : "Engine: on"
    handbrake.textContent = stopCar ? "Handbrake: on" : "Handbrake: off"
    requestAnimationFrame(updateSpeed)

}

updateSpeed()