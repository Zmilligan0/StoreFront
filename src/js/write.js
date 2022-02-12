import { ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";
import {ref as databaseRef, push, set, get, remove} from 'firebase/database'
import { db, storage  } from "./libs/firebase/firebaseConfig";

document.querySelector("#knifeImage").addEventListener("change", onImageSelected);
document.forms["knifeForm"].addEventListener("submit", onAddKnife); 


    function onAddKnife(e) {
        e.preventDefault();
        uploadNewKnife();
    }
  

   function onImageSelected(e) {
    //selected file
    // file objets   [fileObj, fileObj, fileObj]
    let file = e.target.files[0];
    console.log(file)
    // update the display with the requested image
    document.querySelector(".display img").src = URL.createObjectURL(file);
     
    }

    async function uploadNewKnife() {
        // form data
        const name= document.querySelector('#knifeName').value.trim();
        const price = document.querySelector('#knifePrice').value.trim();
        const steel = document.querySelector('#knifeSteel').value.trim();
        const file = document.querySelector('#knifeImage').files[0]
        
        // paths to the data to write
        const imageRef =     storageRef( storage, `images/${file.name}`);
        const dataRef =  databaseRef( db, 'knifes')

        // uploading file to the storage bucket
        const uploadResult = await uploadBytes(imageRef, file);
        // url to the image stored in storage bucket
        const urlPath =  await getDownloadURL(imageRef) 
        // path on the storage bucket to the image
        const storagePath = uploadResult.metadata.fullPath;

        // firebase unique key
        const itemRef = await push(dataRef)
        
        set(itemRef,{
           key:itemRef.key,
           sku:`jhvr${itemRef.key}`,
           urlPath,
           storagePath,
           name,
           steel,
           price
        })
        window.location.replace("../index.html");
    }
 