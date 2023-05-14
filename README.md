# Hybrid Encryption For Cloud Security

## Setting it up
1. Clone the repository
2. `cd` into the repository and run the command `npm i` to install packages present in the package.json file
3. run the command `npx json-server --watch ./src/data/keys.json --port 8000` to start the local JSON server that stores the keys
4. run `nom start` to run a developmental server

This is what the intro screen should look like: 
![image](https://github.com/Takashi069/Hybrid-Encryption-For-Cloud-Security/assets/73834506/c55a95a4-96a8-40e8-a338-019f22a7204e)

## Running the application
### Inputing data into the Firebase Server: 
1. Click on the input button and fill in the plain text
2. Press Fetch/Generate Keys to fetch encryption keys or create them if they are not present
3. Your Public and Private Keys should be displayed.
> **Warning** : Do not show private keys out during production. This is a test environment and no private data is being stored in firebase
4. Then press Encrypt and Send, this will send the encrypted Data to Firebase ( Google's Cloud Service )
5. Press Recieve and Decrypt if you want to recieve the latest data sent to firebase and decrypt it

![image](https://github.com/Takashi069/Hybrid-Encryption-For-Cloud-Security/assets/73834506/2828c967-c839-4fc4-b5f8-0fd845a5c504)
![image](https://github.com/Takashi069/Hybrid-Encryption-For-Cloud-Security/assets/73834506/6fea00c1-5fe1-4f74-a1ff-14a43bd933a3)

### Fetching the data in Firebase
To prove that the data in firebase in indeed encrypted, you can click on the Display Contents button in the homepage followed by the Get From Firebase button.
![image](https://github.com/Takashi069/Hybrid-Encryption-For-Cloud-Security/assets/73834506/c73017b9-5b1e-4305-9058-557c96102c31)

<br />
This fetches the data in firebase and you can see that it is encrypted. <br/>
![image](https://github.com/Takashi069/Hybrid-Encryption-For-Cloud-Security/assets/73834506/92b7221a-4ec1-47ab-b757-88db574d6e93)
<br />
To decrypt the contents, just press the decrypt button and since you have the keys locally stored, it will decrypt the content for you.
![image](https://github.com/Takashi069/Hybrid-Encryption-For-Cloud-Security/assets/73834506/6e553b7f-784f-43a7-abda-67dde77e8b2a)

Hence this method allows data to be encrypted locally and sent to the server, thus preventing your data from being at the mercy of service provider. Moreover the locally hosted json server can be replaced with a password manager as well, but that's a topic for another project.
