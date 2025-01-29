class DomainProductCard extends HTMLElement {
  constructor() {
    super();
    this.imageWrapper = this.querySelector('.dpc__image-wrapper')
    this.mainImage = this.querySelector('.dpc__primary-image')
    this.swatches = this.querySelectorAll('.dpc__swatch')
    this.swatches.forEach((swatch) => {
      swatch.addEventListener('click', this.handleSwatchClick.bind(this))
    })
  }

  handleSwatchClick(event) {
    // remove borders
    this.swatches.forEach((swatch) => {
      swatch.classList.remove('border')
    })
    // add current border
    event.currentTarget.classList.add('border')
    // change images
    let primaryImage = event.currentTarget.dataset.primaryImage
    let secondaryImage = event.currentTarget.dataset.secondaryImage
    this.mainImage.src = primaryImage
    this.imageWrapper.style.backgroundImage = `url(${secondaryImage})`
  }
}

customElements.define('domain-product-card', DomainProductCard)
