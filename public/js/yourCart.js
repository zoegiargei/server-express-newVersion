const cart = document.getElementById('cartId');
const cid = cart.value
console.log(cid)
const url = `/api/carts/:${cid}/purchase`

const btnPurchase = document.getElementById('btnPurchase')

btnPurchase.addEventListener('click', () => {
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(result => {
        if(result.status == 201){
            Swal.fire({
                icon: 'success',
                title: 'Successful purchase',
            }).then( result => {
                window.location.replace('/web/')
            })
        } else if(result.status == 202){
            Swal.fire({
                icon: 'info',
                title: 'Some product is not available',
            }).then( result => {
                window.location.reload()
            })
        }
    })
})
