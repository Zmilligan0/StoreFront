
import {ref as databaseRef, push, set, get, remove} from 'firebase/database'
import { db, storage  } from "./libs/firebase/firebaseConfig";

const knifeForm = document.forms['knifeForm']
const key = sessionStorage.getItem('key')
const knifeRef = databaseRef(db, `knifes/${key}`)

async function pageInit(){
    
    console.log("Delete Page")
    console.log(key)
    
    const knifeSnapShot = await get(knifeRef)
    //remove the entry when delete is clicked on the read page

    
    if (knifeSnapShot.exists()) {
      setFieldValues(knifeSnapShot.val())
    }
    
    knifeForm.addEventListener('submit', deleteKnife)

}
  
function setFieldValues({name, price, steel, urlPath}){
  
    knifeForm.elements['knifeName'].value = name
    knifeForm.elements['knifePrice'].value = price
    knifeForm.elements['knifeSteel'].value = steel
    document.querySelector('#uploadImage img').src = urlPath
}

function deleteKnife(e) {
  e.preventDefault();
  remove(knifeRef)
  window.location.replace("../index.html");
  console.log("deleteKnife")
  //redirect to index.html
}
  
pageInit()