class DomainProductCard extends HTMLElement {
  constructor() {
    super();
    this.imageWrapper = this.querySelector('.dpc__image-wrapper')
    this.mainImage = this.querySelector('.dpc__primary-image')
    this.swatches = this.querySelectorAll('.dpc__swatch')
    this.atcButton = this.querySelector('.dpc__atc')
    this.swatches.forEach((swatch) => {
      swatch.addEventListener('click', this.handleSwatchClick.bind(this))
    })
    this.atcButton.addEventListener('click', this.addToCart.bind(this))
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

    // Change variant id on atc
    let variantId = event.currentTarget.dataset.variantId;
    this.atcButton.dataset.variantId = variantId
  }

  addToCart(event) {
    console.log('add to cart', event)
    const url = "/cart/add.js"
    let payload = {
      items: [
        {
          quantity: 1,
          id: event.currentTarget.dataset.variantId
        }
      ]
    }
    fetch(url, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })
    .then((resp) => resp.json())
    .then((data) => {
      console.log(data)
    })
    .catch((error) => {
      console.error('atc error: ', error)
    })
  }
}

customElements.define('domain-product-card', DomainProductCard)
