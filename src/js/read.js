import {ref as dataRef, get, set, update} from 'firebase/database';
import {db} from './libs/firebase/firebaseConfig';
import {knifeProduct} from './templates/knifeProduct'


async function pageInit(){
    const knifeRef = dataRef(db, 'knifes/');
    const knifeSnapShot = await get(knifeRef)
    const data = knifeSnapShot.val();
    // ES Modules For The Render Function
    // API Data Data Structure
    // {{}, {}, {}, {}}
    // Arrays of Objects...
    // Object.keys(obj)   Object.enteries(obj) Object.values(obj)
    // object['prop']
     Object.values(data).map(knife=>{
          const card = knifeProduct(knife)
          //document.body.append(card)
          document.getElementById('main-knife-content').append(card)
          
     })
}

pageInit()

