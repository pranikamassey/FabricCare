/**
 * Create Flight Transaction
 * @param {org.fabriccare.organ.donateOrgan} organData
 * @transaction
 */

function    donateOrgan(organData) {
    // 1. Get the asset registry
    return getAssetRegistry('org.fabriccare.organ.Organ')
        .then(function(flightRegistry){
            // Now add the Flight

            // 2. Get resource factory
            var  factory = getFactory();
            var  NS =  'org.fabriccare.organ';

            // 3. Create the Resource instance
            var  organType = 1;
            
            var  organ = factory.newResource(NS,'Organ',organData.organId);
            organ.type = organType;
      		organ.hName = organData.hName;
      		organ.hState = organData.hState;
      		organ.hAddress = organData.hAddress;
      		organ.date = organData.date;
      		organ.time = organData.time;
      		organ.storingSolution = organData.storingSolution;
      		organ.temperature = organData.temperature;
            
  

            // 5. Create a new concept using the factory & set the data in it
        
  
      
    		var kin = factory.newConcept(NS,"Kin");
      		kin.kinName = organData.kinName;
      		kin.kinAadhar = organData.kinAadhar;
      		kin.kinPhoneNo = organData.kinPhoneNo;
      
            var donor = factory.newConcept(NS,"Donor");
            donor.donorName = organData.donorName;
            donor.bloodgroup = organData.bloodgroup;
            donor.donorId = organData.donorId;
      		donor.dob = organData.dob;
      		donor.gender = organData.gender
      		donor.donorAadhar = organData.donorAadhar;
      		donor.donorAddress = organData.donorAadhar;
      		donor.donorState = organData.donorState;
            organ.donor = donor;
      		organ.kin = kin;

            // 6. Emit the event FlightCreated
            var event = factory.newEvent(NS, 'organDonanted');
            event.organId = organData.organId;
            emit(event);

            return flightRegistry.addAll([organ]);
        });
}
