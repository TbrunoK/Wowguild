const carousel = document.getElementById("carousel")
let currentIndex = 1 // começa na primeira real
let isDragging = false
let startX = 0
let currentTranslate = 0
let slideWidth = carousel.offsetWidth / carousel.children.length

function setPosition() {
  currentTranslate = -slideWidth * currentIndex
  carousel.style.transform = `translateX(${currentTranslate}px)`
}

// Corrige largura ao redimensionar
window.addEventListener("resize", () => {
  slideWidth = carousel.offsetWidth / carousel.children.length
  setPosition()
})

// Setas
function moverSlide(dir) {
  if (dir === 1 && currentIndex >= carousel.children.length - 1) return
  if (dir === -1 && currentIndex <= 0) return
  currentIndex += dir
  carousel.style.transition = "transform 0.4s ease"
  setPosition()
}

// Após transição
carousel.addEventListener("transitionend", () => {
  const slides = carousel.children
  if (slides[currentIndex].classList.contains("clone")) {
    carousel.style.transition = "none"
    if (currentIndex === 0) {
      currentIndex = slides.length - 2 // Último real
    } else if (currentIndex === slides.length - 1) {
      currentIndex = 1 // Primeiro real
    }
    setPosition()
  }
})

// Drag (arraste)
function startDrag(e) {
  isDragging = true
  startX = e.clientX
  carousel.style.transition = "none"
}

function drag(e) {
  if (!isDragging) return
  const diff = e.clientX - startX
  carousel.style.transform = `translateX(${currentTranslate + diff}px)`
}

function endDrag(e) {
  if (!isDragging) return
  isDragging = false
  const diff = e.clientX - startX
  if (diff > 50) {
    moverSlide(-1)
  } else if (diff < -50) {
    moverSlide(1)
  } else {
    carousel.style.transition = "transform 0.3s ease"
    setPosition()
  }
}

// Eventos de mouse
carousel.addEventListener("mousedown", startDrag)
carousel.addEventListener("mousemove", drag)
carousel.addEventListener("mouseup", endDrag)
carousel.addEventListener("mouseleave", endDrag)

// Inicia posição correta
setPosition()
