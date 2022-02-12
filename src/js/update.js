import { ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";
import {ref as databaseRef, set, get} from 'firebase/database'
import { db, storage  } from "./libs/firebase/firebaseConfig";

const knifeForm = document.forms['knifeForm']
document.querySelector("#knifeImage").addEventListener("change", onImageSelected);

async function pageInit(){
  const key = sessionStorage.getItem('key')
  const knifeRef = databaseRef(db, `knifes/${key}`)
  const knifeSnapShot = await get(knifeRef)


  if (knifeSnapShot.exists()) {
    setFieldValues(knifeSnapShot.val())
  }
  
  knifeForm.addEventListener('submit', onUpdateKnife)
  
}

function onUpdateKnife(e)
{
  e.preventDefault();
  updateKnifeData()

}

function onImageSelected(e) {
  //selected file
  // file objets   [fileObj, fileObj, fileObj]
  let file = e.target.files[0];
  console.log(file)
  // update the display with the requested image
  document.querySelector(".display img").src = URL.createObjectURL(file);
   
  }

function setFieldValues({name, price, steel, urlPath}){
  
    knifeForm.elements['knifeName'].value = name
    knifeForm.elements['knifePrice'].value = price
    knifeForm.elements['knifeSteel'].value = steel
    document.querySelector('#uploadImage img').src = urlPath
}

async function updateKnifeData(){
  const name = knifeForm.elements['knifeName'].value.trim()
  const steel = knifeForm.elements['knifeSteel'].value.trim()
  const price = knifeForm.elements['knifePrice'].value.trim()
  const file = knifeForm.elements['knifeImage'].files[0]
  const key = sessionStorage.getItem('key');
  const dataRef = databaseRef(db, `knifes/${key}`)
 //need to update picture with the selected one
 //also need to make it so it doesn't upload a null pic when one isnt chosen
  if (file !== 0) {
    const imageRef = storageRef(storage, `images/${file.name}`)
    // uploading file to the storage bucket
    const uploadResult = await uploadBytes(imageRef, file);
    // url to the image stored in storage bucket
    const urlPath =  await getDownloadURL(imageRef) 
    // path on the storage bucket to the image
    const storagePath = uploadResult.metadata.fullPath;
    set(dataRef, {
      key,
      sku:`jhvr${key}`,
      urlPath,
      storagePath,
      name,
      steel,
      price
    })
    window.location.replace("../index.html");
  }
  else 
  {
    //if no image is uploaded use this set
    //should set the urlpath and storagepath to the same as it came in with
    set(dataRef, {
      key,
      sku:`jhvr${key}`,
      urlPath,
      storagePath,
      name,
      steel,
      price
    })

    window.location.replace("../index.html");
  }
  
  //need to have urlPath and storagePath within scope of this set command
  
}

pageInit()