import { useState } from 'react';
import 'firebase/compat/firestore';
import { Link } from 'react-router-dom';
import { decryptRSA } from '../rsautils';
import { decryptDES} from '../desutils'
import db from '../firebase'
import {
  collection,
  getDocs
} from 'firebase/firestore';

function DisplayDetailsTable({ data }) {
    return (
      <div className='bg-[#141416] min-h-[40vh] w-[100%] text-[#f0e5f0] flex flex-col justify-center items-center'>
        <div className="headers flex flex-col justify-center items-center">
          <div className='text-3xl text-center mt-9 text-white md:text-5xl lg:text-6xl font-semibold tracking-wide pb-2'>Data Details</div>
        </div>
        <table className='mt-4 text-white max-w-[50%] table-fixed'>
          <thead>
            <tr>
              <th className='px-4 py-2'>ID</th>
              <th className='px-4 py-2 sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5'>Content</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id}>
                <td className='border px-4 py-2'>{item.id}</td>
                <td className='border max-w-[250px] px-4 py-2 whitespace-normal break-words overflow-auto'>{item.content}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

const DisplayDetails = ({encryptionKeys}) => {
    const [firebaseData, setFirebaseData] = useState([]);
    const [isdecrypt, setIsDecrypt] = useState(false)
    const getFromFirebase = async () => {
      const listCollectionRef = collection(db, 'data-store');
      const snapshot = await getDocs(listCollectionRef);
      const data = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setFirebaseData(data);
    };

    const handleDecryption = ()=>{
        const decryptedData = 
        firebaseData.map((item) =>{
            let encryptedData = item.content
            const decrypted = decryptRSA(encryptedData, encryptionKeys[0].privateKey);
            const desDecrypt = decryptDES(decrypted,encryptionKeys[0].desKey)
            item.content = (desDecrypt);
            return item
        })
        setFirebaseData(decryptedData)
        setIsDecrypt(true)
    }

    
    return ( 
        <div className='bg-[#141416] min-h-[100vh] w-[100%] text-[#f0e5f0] flex flex-col justify-center items-center'>
        {/* ... */}
            <br />
            <Link to="/">
                <button className='text-lg max-h-[50px] max-w-[200px] font-semibold mt-4 lg:mt-0 lg:ml-8 border border-gray-500/25 p-2 mx-4 bg-indigo-700 hover:bg-indigo-600 text-white transition-all ease-in-out active:scale-95 rounded-sm'>Go Back</button>
            </Link>
            <br />
            {Object.keys(firebaseData).length === 0 && 
                <button
                    className='text-lg max-h-[50px] max-w-[200px] font-semibold mt-4 lg:mt-0 lg:ml-8 border border-gray-500/25 p-2 mx-4 bg-indigo-700 hover:bg-indigo-600 text-white transition-all ease-in-out active:scale-95 rounded-sm'
                    onClick={getFromFirebase}>
                    Get from Firebase
                </button>
            }
        
            {/* ... */}
            {firebaseData.length > 0 && <DisplayDetailsTable data={firebaseData} />}
            {(firebaseData.length >0 && !isdecrypt) && <button className='text-lg max-h-[50px] max-w-[200px] font-semibold lg:mt-0 border border-gray-500/25 p-2 bg-indigo-700 hover:bg-indigo-600 text-white transition-all ease-in-out active:scale-95 rounded-sm mb-5' onClick={handleDecryption}>Decrypt</button>}

      </div>
    );
}
 
export default DisplayDetails;