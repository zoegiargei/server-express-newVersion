/* eslint-disable no-undef */
class Quantity {
    constructor (quantity) {
        this.quantity = Number(quantity)
    }
}

// eslint-disable-next-line no-unused-vars
async function addToCart (e) {
    const form = e.target.closest('form')
    const qty = form.elements.quantity.value
    console.log(qty)
    const quantity = new Quantity(qty)

    const pid = form.elements.productId.value
    console.log(pid)
    const cid = form.elements.btnAddToCart.value
    console.log(cid)

    const url = `/api/carts/:${cid}/products/:${pid}`

    fetch(url, {
        method: 'POST',
        body: JSON.stringify(quantity),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(result => {
        if (result.status === 200) {
            console.log(result)
            Swal.fire({
                icon: 'success',
                title: 'Product successfully added to cart!'
            })
        }
    })
}

// Mandar con fetch estos datos y hacer blocke de quantity en la vista
