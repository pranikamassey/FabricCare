'use strict';
/**
 * Part of a course on Hyperledger Fabric: 
 * http://ACloudFan.com
 * 
 * Composer 0.19.0  : Does not require a FileSystemCardStore to be created
 * 
 * https://hyperledger.github.io/composer/latest//api/admin-adminconnection
 * 
 * Demonstrates the use of the admin connection class
 * 1. Create an instance of the AdminConnection object
 * 2. Connect as the PeerAdmin
 * 3. List the deployed Business Network Apps
 * 4. Disconnect 
 * 5. Connect as the Network Admin for airlinev7
 * 6. Ping airlinev7
 * 7. Disconnect
 */

// Need the card store instance
//const FileSystemCardStore = require('composer-common').FileSystemCardStore;
const AdminConnection = require('composer-admin').AdminConnection;

// Used as the card for all calls
const   cardNameForPeerAdmin   = "PeerAdmin@hlfv1";
const   cardNameForNetworkAdmin   = "admin@airlinev7";
const   appToBePinged = "airlinev7";

// 1. Create instance of file system card store
// NOT NEEDED in 0.19.0
//const cardStore = new FileSystemCardStore();

// 2. Create Admin Connection object for the fabric
// NOT NEEDED in 0.19.0
// const cardStoreObj = { cardStore: cardStore };
// const adminConnection = new AdminConnection(cardStoreObj);
var cardType = { type: 'composer-wallet-filesystem' }
const adminConnection = new AdminConnection(cardType);
console.log("Admin Connected Successfully!!!");

// 3. Initiate a connection as PeerAdmin
return adminConnection.connect(cardNameForPeerAdmin).then(function(){

    console.log("Admin Connected Successfully!!!");
    // Display the name and version of the network app
   listBusinessNetwork();
}).catch((error)=>{
    console.log(error);
});


// Extracts information about the network
function listBusinessNetwork(){
    // 4. List the network apps
    adminConnection.list().then((networks)=>{
        console.log("Successfully retrieved the deployed Networks: ",networks);

        networks.forEach((businessNetwork) => {
            console.log('Deployed business network', businessNetwork);
         });
        // 5. Disconnect
        adminConnection.disconnect();
        reconnectAsNetworkAdmin();
    }).catch((error)=>{
        console.log(error);
    });
}

// Ping the network
function reconnectAsNetworkAdmin(){

    // 6. Reconnect with the card for network admin
    return adminConnection.connect(cardNameForNetworkAdmin).then(function(){
        console.log("Network Admin Connected Successfully!!!");
        // 7. Ping the BNA 
        
        adminConnection.ping(appToBePinged).then(function(response){
            console.log("Ping response from "+appToBePinged+" :",response);
            // 8. Disconnect
            adminConnection.disconnect();
        }).catch((error)=>{
            console.log(error);
        });
    });

    
}
