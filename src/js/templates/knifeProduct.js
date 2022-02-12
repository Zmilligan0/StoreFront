/* 
          Vanilla JS Templating
          template string with markup that is pre styled
          setup the template.js file.
*/

function knifeProduct({key, urlPath, name, steel, price}){
    const template = `
        <aside class="knife-products">

            <figure>
                <img src="${urlPath}" width="160" alt="view of the knife is located in ${name}">
                <figcaption>
                  <h2>Product name: ${name}</h2>
                  <h2>Price: $${price}</h2>
                  <h2>Steel: ${steel}</h2>
                </figcaption>
                
            </figure>
            <div class="buy-button">
                <button>Buy</button>
            </div>

            <footer>
                <button id="edit" data-key="${key}">edit</button>
                <button id="delete" data-key="${key}">delete</button>
            </footer>

        </aside>
    `
    const element = document.createRange().createContextualFragment(template).children[0]
    addButtonControls(element)
    return element
}


function addButtonControls(rental){
    rental.querySelector('#edit').addEventListener('click', onEditKnife)
    rental.querySelector('#delete').addEventListener('click', onRemoveKnife)
}

function onEditKnife(e){
    const key = e.target.dataset.key;
    sessionStorage.setItem('key', key)
    window.location.assign('update.html')
}

function onRemoveKnife(e){
    const key = e.target.dataset.key;
    sessionStorage.setItem('key', key)
    window.location.assign('delete.html')
}

export {knifeProduct}