var express     =    require('express');
var bodyParser  =    require('body-parser');
var app         =    express();
var passport    =    require('passport');
var GitHubStrategy = require('passport-github').Strategy;


var OrganList = {
                    Kidney : [],
                    Liver :[],
                    Lung :[],
                    Heart :[],
                    Pancreas :[],
                    Intestine :[] 
                    };

app.use(express.static(__dirname+"/public"));
app.use(bodyParser.urlencoded({extended : true}));
app.set('view engine','ejs');
app.get("/",function(req,res){
    res.render('home.ejs')
})

app.get("/Home",function(req,res){
    res.render('home.ejs')
})
app.get("/List",function(req, res){
    res.render('list',{OrganList:OrganList})
})
app.get("/Organ",function(req, res){
    res.render('organ')
})
app.get("/Waiting",function(req, res){
    res.render('waiting')
})


app.post("/addFlight",function(req,res){
    console.log(req.body.origin);
    'use strict';

    // Constant values - change as per your needs
 const namespace = "org.fabriccare.organ";
 const transactionType = "donateOrgan";

// 1. Connect to airlinev7
const bnUtil = require('./bn-connection-util');
bnUtil.connect(main);

function main(error){
    
    // Check for error
    if(error){
        console.log(error);
        process.exit(1);
    }

    // 2. Get the Business Network Definition
    let bnDef =  bnUtil.connection.getBusinessNetwork();
    console.log("2. Received Definition from Runtime: ",
                   bnDef.getName(),"  ",bnDef.getVersion());

    // 3. Get the factory
    let factory = bnDef.getFactory();
    
    // 4. Lets create a new Resource of type = Transaction
    //    Here is the sample data
    // {
    //     "$class": "org.acme.airline.flight.CreateFlight",
    //     "flightNumber": "AE101-06-06-2019",
    //     "origin": "MSP",
    //     "destination": "SEA",
    //     "schedule": "2019-06-06T18:49:58.273Z"
    // }

    // 4. Create an instance of transaction
    let options = {
        generate: false,
        includeOptionalFields: false
    }
    let organId = "AE105-05-06-2019";
    let transaction = factory.newTransaction(namespace,transactionType,organId,options);

    
    // 5. Set up the properties of the transaction object
   
    transaction.setPropertyValue('organId',req.body.organId);
    transaction.setPropertyValue('type',parseInt(req.body.gridRadios));
    transaction.setPropertyValue('donorName', req.body.donorName);
    transaction.setPropertyValue('bloodgroup' , req.body.bloodGroup);
    transaction.setPropertyValue('donorId' , parseInt(req.body.donorId));
    transaction.setPropertyValue('hName',req.body.hName);
    transaction.setPropertyValue('hState',req.body.hState);
    transaction.setPropertyValue('hAddress', req.body.hAddress);
    transaction.setPropertyValue('date' , req.body.date);
    transaction.setPropertyValue('time' , req.body.time);
    transaction.setPropertyValue('storingSolution',req.body.storingSolution);
    transaction.setPropertyValue('temperature',req.body.temperature);
    transaction.setPropertyValue('dob', req.body.dob);
    transaction.setPropertyValue('gender' , req.body.gender);
    transaction.setPropertyValue('donorAadhar' , req.body.donorAadhar);
    transaction.setPropertyValue('donorState',req.body.donorState);
    transaction.setPropertyValue('donorAddress',req.body.donorAddress);
    transaction.setPropertyValue('kinName', req.body.kinName);
    transaction.setPropertyValue('kinAadhar' , req.body.kinAadhar);
    transaction.setPropertyValue('kinPhoneNo' , req.body.kinPhoneNo);


    // 6. Submit the transaction
    return bnUtil.connection.submitTransaction(transaction).then(()=>{
        console.log("6. Transaction Submitted/Processed Successfully!!")
        switch(parseInt(req.body.gridRadios)){
            case 1:OrganList.Kidney.push({
                organId: req.body.organId,
                hospital: req.body.hName,
                date: req.body.date,
                time: req.body.time,
                solution: req.body.storingSolution,
                temperature: req.body.temperature
            });
            break;
            case 2:OrganList.Liver.push({
                organId: req.body.organId,
                hospital: req.body.hName,
                date: req.body.date,
                time: req.body.time,
                solution: req.body.storingSolution,
                temperature: req.body.temperature
            });
            break;
            case 3:OrganList.Lung.push({
                organId: req.body.organId,
                hospital: req.body.hName,
                date: req.body.date,
                time: req.body.time,
                solution: req.body.storingSolution,
                temperature: req.body.temperature
            });
            break;
            case 4:OrganList.Heart.push({
                organId: req.body.organId,
                hospital: req.body.hName,
                date: req.body.date,
                time: req.body.time,
                solution: req.body.storingSolution,
                temperature: req.body.temperature
            });
            break;
            case 5:OrganList.Pancreas.push({
                organId: req.body.organId,
                hospital: req.body.hName,
                date: req.body.date,
                time: req.body.time,
                solution: req.body.storingSolution,
                temperature: req.body.temperature
            });
            break;
            case 6:OrganList.Intestine.push({
                organId: req.body.organId,
                hospital: req.body.hName,
                date: req.body.date,
                time: req.body.time,
                solution: req.body.storingSolution,
                temperature: req.body.temperature
            });
            break;
            default:
            console.log("why not");
        }
    

        bnUtil.disconnect();

    }).catch((error)=>{
        console.log(error);

        bnUtil.disconnect();
    });
}
    res.redirect("/");
})

app.listen("4200",function(){
    console.log("Fabric Care started on port 4200");
})