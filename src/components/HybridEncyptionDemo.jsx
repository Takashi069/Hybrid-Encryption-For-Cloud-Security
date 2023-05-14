import React, { useState } from 'react';
import { generateRSAKeyPair, encryptRSA, decryptRSA } from '../rsautils';
import { generateDESKey, encryptDES, decryptDES} from '../desutils'
import { Link } from 'react-router-dom';
import 'firebase/compat/firestore';
import db from '../firebase'
import {
  collection,
  addDoc,
  getDocs
} from 'firebase/firestore';

function HybridEncryptionDecryption({encryptionKeys}) {
  const [plaintext, setPlaintext] = useState('');
  const [publicKey, setPublicKey] = useState('');
  const [desKey, setDESKey] = useState('')
  const [privateKey, setPrivateKey] = useState('');
  const [encryptedData, setEncryptedData] = useState('');
  const [decryptedData, setDecryptedData] = useState('');

  const listCollectionRef = collection(db , "data-store");

  const sendFirebase = async (content)=>{
    await addDoc(listCollectionRef, {content:content})
  }

  const getFromFirebase = async () => {
    const listCollectionRef = collection(db, 'data-store');
    const dat = await getDocs(listCollectionRef);
    setEncryptedData(dat.docs.map((doc) => ({ ...doc.data(), id: doc.id }))[0].content)
};

  const handleGenerateKeyPair = (encryptionKeys) => {
    if(Object.keys(encryptionKeys).length === 0){
      const keyPair = generateRSAKeyPair();
      const desKey = generateDESKey();  
      
      setDESKey(desKey)
      setPublicKey(keyPair.publicKey);
      setPrivateKey(keyPair.privateKey);
      
      const encryptionKeys = {
        publicKey: publicKey,
        privateKey: privateKey,
        desKey: desKey
      }
      fetch("http://localhost:8000/encryptionKeys",{
                method:"POST",
                headers:{"Content-Type": "application/JSON"},
                body:JSON.stringify(encryptionKeys)
            }).then(()=>{
                console.log("Added Key")
            })
    }else{
      console.log("Keys already present")
      setDESKey(encryptionKeys[0].desKey)
      setPublicKey(encryptionKeys[0].publicKey)
      setPrivateKey(encryptionKeys[0].privateKey)
    }
  };

  const handleEncrypt = () => {
    if(desKey === '' || publicKey === ''){
      setTimeout(handleGenerateKeyPair(encryptionKeys),3000) 
      const desEncrypt = encryptDES(plaintext,desKey)
      const encrypted = encryptRSA(desEncrypt, publicKey);
      setEncryptedData(encrypted);

      //now send encrypted data to firebase
      sendFirebase(encrypted)
    }else{
      const desEncrypt = encryptDES(plaintext,desKey)
      const encrypted = encryptRSA(desEncrypt, publicKey);
      setEncryptedData(encrypted);  
      
      //now send encrypted data to firebase
      sendFirebase(encrypted)
    }
    
  };

  const handleDecrypt = () => {

    //retrieve from Firebase and setEncrypted Data to the one you recieved from Firebase
    getFromFirebase()
    const decrypted = decryptRSA(encryptedData, privateKey);
    const desDecrypt = decryptDES(decrypted,desKey)
    setDecryptedData(desDecrypt);
  };

  return (
    <div className='bg-[#141416] min-h-[100vh] w-[100%] text-[#f0e5f0] flex flex-col justify-center items-center'>
      <div className="headers flex flex-col justify-center items-center">
                <div className='text-3xl text-center mt-9 text-white md:text-5xl lg:text-6xl font-semibold tracking-wide pb-2'>Form</div>
                <br></br>
                <Link to="/">
                    <button className='text-lg max-h-[50px] max-w-[200px] font-semibold mt-4 lg:mt-0 border border-gray-500/25 p-2 mx-4 bg-indigo-700 hover:bg-indigo-600 text-white transition-all ease-in-out active:scale-95 rounded-sm'>Go Back</button>
                </Link>
      </div>
      <br></br>
      <label  >Plaintext: </label>
      <input className='max-w-[60%] xl:max-w-[200px] h-[50px] bg-gray-500/25 rounded-lg px-6' type="text" value={plaintext} onChange={(e) => setPlaintext(e.target.value)} />
      <br />
      <button className=' text-lg 
                          max-h-[150px] 
                          max-w-[200px] 
                          font-semibold 
                          mt-4 
                          lg:mt-0 
                          border 
                          border-gray-500/25 
                          p-2 
                          mx-4 
                          bg-indigo-700 
                          hover:bg-indigo-600 
                          text-white 
                          transition-all 
                          ease-in-out 
                          active:scale-95 
                          rounded-sm'  onClick={()=>handleGenerateKeyPair(encryptionKeys)}>Generate/Fetch Key Pair</button>
      <br />

      <label>Public Key: </label>
      <div className='max-w-[80%] xl:max-w-[200px] py-1 min-h-[30px] min-w-[50%] bg-gray-500/25 rounded-lg px-6' readOnly >{publicKey}</div>
      <br />

      <label>Private Key: </label>
      <div className='max-w-[80%] xl:max-w-[200px] py-1 min-h-[30px] min-w-[50%] bg-gray-500/25 rounded-lg px-6' value={privateKey} readOnly>{privateKey}</div>
      <br />
      <button className='text-lg max-h-[50px] max-w-[200px] font-semibold mt-4 lg:mt-0 lg:ml-8 border border-gray-500/25 p-2 mx-4 bg-indigo-700 hover:bg-indigo-600 text-white transition-all ease-in-out active:scale-95 rounded-sm' onClick={handleEncrypt}>Encrypt and Send</button>
      <br />

      <label>Encrypted Data: </label>
      <div className='max-w-[80%] xl:max-w-[200px] py-1 min-h-[30px] min-w-[50%] bg-gray-500/25 rounded-lg px-6 overflow-x-auto' readOnly >{encryptedData}</div>
      <br />
      <button className=' text-lg 
                          max-h-[50px] 
                          max-w-[200px] 
                          font-semibold 
                          mt-4 
                          lg:mt-0 
                          lg:ml-8 
                          border 
                          border-gray-500/25 
                          p-2 
                          mx-4 
                          bg-indigo-700 
                          hover:bg-indigo-600 
                          text-white 
                          transition-all 
                          ease-in-out 
                          active:scale-95 
                          rounded-sm' 
                          onClick={handleDecrypt}>Recieve Decrypt</button>

      <br />

      <label>Decrypted Data: </label>
      <textarea className='max-w-[80%] xl:max-w-[200px] py-1 mb-10 min-h-[30px] min-w-[50%] bg-gray-500/25 rounded-lg px-6 overflow-x-auto' value={decryptedData} readOnly />
    </div>
  );
}

export default HybridEncryptionDecryption;
