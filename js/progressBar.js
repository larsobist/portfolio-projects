const root = document.documentElement
const body = document.body

const totalScrollDistance = () =>
    body.clientHeight - window.innerHeight || 1

const scrollProgress = scrollPos =>
    (scrollPos / totalScrollDistance() * 100).toFixed(4)

const updateCSSvar = scrollPos =>
    root.style.setProperty('--scroll-pos', scrollProgress(scrollPos))

const displayProgress = scrollPos => {
    const element = document.querySelector('.progress-percentage')
        // element.innerHTML = `${scrollProgress(scrollPos)} %`s
}

window.addEventListener('scroll', () => {
    const scrollPos = window.pageYOffset
    updateCSSvar(scrollPos)
        // displayProgress(scrollPos)
})