var ns = 'org.ehr.net';
let factory = getFactory();
/*
* function to add new doctor
* @param {org.ehr.net.AddDoctor} tx
* @transaction
*/
async function AddDoctor(tx){
	var me = getCurrentParticipant();
  	if(me.designation2 == 'Admin'){
    	let DrReg = await getParticipantRegistry(ns+'.Doctor');
      	await DrReg.add(tx.doc_obj);
    } else{
    	throw new Error('Insufficient privileges');
    }
}
/*
* function to add new pharmacy
* @param {org.ehr.net.AddPharmacy} tx
* @transaction
*/
async function AddPharmacy(tx){
	var me = getCurrentParticipant();
  	if(me.designation2 == 'Admin'){
    	let PhReg = await getParticipantRegistry(ns+'.Pharmacy');
      	await PhReg.add(tx.pharma_obj);
    } else{
    	throw new Error('Insufficient privileges');
    }
}
/*
* function to add new Admin
* @param {org.ehr.net.AddAdmin} tx
* @transaction
*/
async function AddAdmin(tx){
	var me = getCurrentParticipant();
  	if(me.designation2 == 'Admin'){
    	let AdReg = await getParticipantRegistry(ns+'.Admin');
      	await AdReg.add(tx.admin_obj);
    } else{
    	throw new Error('Insufficient privileges');
    }
}
/*
* function to add patient
* @param {org.ehr.net.RegisterPatient} tx
* @transaction
*/
async function RegisterPatient(tx){
	var me = getCurrentParticipant();
  	if(me.designation2 == 'Admin'){
    	let PtReg = await getParticipantRegistry(ns+'.Patient');
      	await PtReg.add(tx.pat_obj);
    } else{
    	throw new Error('Insufficient privileges');
    }
}
/*
* function to remove Doctor
* @param {org.ehr.net.RemoveDoctor} tx
* @transaction
*/
async function RemoveDoctor(tx){
	var me = getCurrentParticipant();
  	if(me.designation2 == 'Admin'){
    	let DrReg = await getParticipantRegistry(ns+'.Doctor');
      	await DrReg.remove(tx.doc_obj);
    } else{
    	throw new Error('Insufficient privileges');
    }
}
/*
* function to remove Pharmacy
* @param {org.ehr.net.RemovePharmacy} tx
* @transaction
*/
async function RemovePharmacy(tx){
	var me = getCurrentParticipant();
  	if(me.designation2 == 'Admin'){
    	let PhReg = await getParticipantRegistry(ns+'.Pharmacy');
      	await PhReg.remove(tx.pharma_obj);
    } else{
    	throw new Error('Insufficient privileges');
    }
}
/*
* function to remove Admin
* @param {org.ehr.net.RemoveAdmin} tx
* @transaction
*/
async function RemoveAdmin(tx){
	var me = getCurrentParticipant();
  	if(me.designation2 == 'Admin'){
    	let AdReg = await getParticipantRegistry(ns+'.Admin');
      	await AdReg.remove(tx.admin_obj);
    } else{
    	throw new Error('Insufficient privileges');
    }
}
/*
* function to add Treatment
* @param {org.ehr.net.AddTreatment} tx
* @transaction
*/
async function AddTreatment(tx){
	var me = getCurrentParticipant();
  	if(me.designation1 == 'Doctor'){
      	let tx_patient = tx.tt_obj.patient_obj.getIdentifier();
      	let queryResult = await query('IndividualPatient',{pid:tx_patient});
      	const IsEmpty = Object.keys(queryResult).length === 0;
        if(!IsEmpty){
        let TtReg = await getAssetRegistry(ns+'.Treatment');
  		await TtReg.add(tx.tt_obj);
        }
      	else{
        	throw new Error('Patient does not exist');
        }
    }
     else{
    	throw new Error('Only HCPs can add Treatment records');
    }
}
/*
* function to add Medical History
* @param {org.ehr.net.AddMedicalHistory} tx
* @transaction
*/
async function AddMedicalHistory(tx){
	var me = getCurrentParticipant();
  	if(me.designation1 == 'Doctor'){
      	let tx_patient = tx.mh_obj.patient_obj.getIdentifier();
      	let queryResult = await query('IndividualPatient',{pid:tx_patient});
      	const IsEmpty = Object.keys(queryResult).length === 0;
        if(!IsEmpty){
    	let MhReg = await getAssetRegistry(ns+'.MedicalHistory');
        await MhReg.add(tx.mh_obj);
        }
        else
        {
        throw new Error('Patient does not exist');
        }
      	
    } else{
    	throw new Error('Only HCPs can Medical History of a patient');
    }
}
/*
* function to add Prescription
* @param {org.ehr.net.AddPrescription} tx
* @transaction
*/
async function AddPrescription(tx){
	var me = getCurrentParticipant();
  	if(me.designation1 == 'Doctor'){
      	let tx_patient = tx.ps_obj.patient_obj.getIdentifier();
      	let queryResult = await query('IndividualPatient',{pid:tx_patient});
      	const IsEmpty = Object.keys(queryResult).length === 0;
        if(!IsEmpty){
    	let PrReg = await getAssetRegistry(ns+'.Prescription');   
        await PrReg.add(tx.ps_obj);
        }else
        {
        throw new Error('Patient does not exist');
        }
      	
    } else{
    throw new Error('Only HCPs can Medical History of a patient');
    }
}
/*
* function to update patient
* @param {org.ehr.net.UpdatePatientInfo} tx
* @transaction
*/
async function UpdatePatientInfo(tx){
	var me = getCurrentParticipant();
  	if(me.designation2 == 'Admin'){
    	let PtReg = await getParticipantRegistry(ns+'.Patient');
      	await PtReg.update(tx.pat_obj);
    } else{
    	throw new Error('Insufficient privileges');
    }
}
/*
* function to update Treatment
* @param {org.ehr.net.UpdateTreatmentInfo} tx
* @transaction
*/
async function UpdateTreatmentInfo(tx){
	var me = getCurrentParticipant();
  	if(me.designation1 == 'Doctor'){
      	let tx_patient = tx.tt_obj.patient_obj.getIdentifier();
      	let queryResult = await query('IndividualPatient',{pid:tx_patient});
      	const IsEmpty = Object.keys(queryResult).length === 0;
        if(!IsEmpty){
    	let TtReg = await getAssetRegistry(ns+'.Treatment');
      	await TtReg.update(tx.tt_obj);
    	} 
		else 
      	throw new Error('Patient does not exist'); 
        }
  else{
    	throw new Error('Only HCPs can update Treatment records');
    }
}
/*
* function to update Medical History
* @param {org.ehr.net.UpdateMedicalHistory} tx
* @transaction
*/
async function UpdateMedicalHistory(tx){
	var me = getCurrentParticipant();
  	if(me.designation1 == 'Doctor'){
      	let tx_patient = tx.mh_obj.patient_obj.getIdentifier();
      	let queryResult = await query('IndividualPatient',{pid:tx_patient});
      	const IsEmpty = Object.keys(queryResult).length === 0;
        if(!IsEmpty){
    	let MhReg = await getAssetRegistry(ns+'.MedicalHistory');
      	await MhReg.update(tx.mh_obj);
        }
      else
	throw new Error('Patient does not exist'); 
    } else{
    	throw new Error('Only HCPs can update Treatment records');
    }
}

/*
* function to update Treatment status
* @param {org.ehr.net.UpdateTreatmentStatus} tx
* @transaction
*/
async function UpdateTreatmentStatus(tx){
	var me = getCurrentParticipant();
  	if(me.designation1 == 'Doctor'){
		let CurrentTreatment = tx.treatment;
  		CurrentTreatment.status = tx.Status;
  		let TreatmentReg = await getAssetRegistry(ns+'.Treatment');
  		await TreatmentReg.update(CurrentTreatment);
   } else{
    throw new Error('Only HCPs can update Treatment records');
   }
}
/*
* function to update Pharmacy status
* @param {org.ehr.net.UpdatePharmacyStatus} tx
* @transaction
*/
async function UpdatePharmacyStatus(tx){
	var me = getCurrentParticipant();
  	if(me.designation3 == 'Pharmacy'){
		let CurrentPrescription = tx.prescription;
  		CurrentPrescription.PharmacyStatus = tx.Status;		
  		let PrescriptionReg = await getAssetRegistry(ns+'.Prescription');
  		await PrescriptionReg.update(CurrentPrescription);
   } else{
    throw new Error('Only Pharmacy can update Pharmacy status');
   }
}
/*
* @param {org.ehr.net.QueryTreatmentData} tx
* @transaction
*/
async function QueryTreatmentData(tx){
  	let tx_patient = tx.patient;
  	let resource = 'resource:'+tx_patient.getFullyQualifiedIdentifier();
	let queryResult = await query('TreatmentData',{pid:resource});
  	if(queryResult.length>0){
    	queryResult.forEach(item=>alert(JSON.stringify(item)));
    }else 
      throw new Error('No results');
}

/*
* @param {org.ehr.net.QueryPrescriptionData} tx
* @transaction
*/
async function QueryPrescriptionData(tx){
  	let tx_patient = tx.patient;
  	let resource = 'resource:'+tx_patient.getFullyQualifiedIdentifier();
	let queryResult = await query('PrescriptionData',{pid:resource});
  	if(queryResult.length>0){
    	queryResult.forEach(item=>alert(JSON.stringify(item)));
    }else 
      throw new Error('No results');
}

/*
* @param {org.ehr.net.QueryMedicalHistory} tx
* @transaction
*/
async function QueryMedicalHistory(tx){
  	let tx_patient = tx.patient;
  	let resource = 'resource:'+tx_patient.getFullyQualifiedIdentifier();
	let queryResult = await query('MedicalHistoryData',{pid:resource});
  	if(queryResult.length>0){
    	queryResult.forEach(item=>alert(JSON.stringify(item)));
    }else 
      throw new Error('No results');
}

/*
* @param {org.ehr.net.initialiseAll} no param
* @transaction
*/
async function initialiseAll(){
 	//values to populate Doctor
  	let dids = ['1000', '2000', '3000','4000'];
  	let drnames = ['Anne John', 'Harry Tyler', 'Elza Bennet','Jay Pritchett'];
  	let specs = ['Pediatrician','General Surgeon','Physician','Physician'];
    let qual = ['BSc MD','MBBS MD','MBBS MD','MBBS'];
    let hospital = ['Royal London hospital','Royal London Hospital','University College 	Hospital','Royal London Hospital'];
    let grades = ['Doctor','Doctor','Doctor','Doctor'];
   	
  	//values to populate admin
    let adids = ['001','002','003','004'];
  	let adnames = ['Liza Tyler','Monica Bing','Ross Geller','Tina Goldstein'];
  	//let hospitals = ['Royal London hospital','Royal London Hospital','University College Hospital','Royal London Hospital'];
  	let adgrades = ['Admin','Admin','Admin','Admin'];
  
  	//values to populate pharmacies
  	let phids = ['001','002','003','004'];
  	let phnames = ['Boots - 1','DrugsCo','NewPharma','Boots - 2'];
  	let phreg = ['Reg001','Reg002','Reg003','Reg004']
  	let phgrades = ['Pharmacy','Pharmacy','Pharmacy','Pharmacy'];
  	
  	//values to populate patient
  	let pids = ['001','002','003','004'];
  	let pnames = ['Raj Prakash','Tessa Jose','Priya MS','Lia Tress'];
  	let p_ages = [20,52,31,07];
  	let p_gender = ['Male','Female','Female','Female'];
  	let p_adname =['AA','BB','CC','DD'];
  	let p_adnameno = ['4','5','7','6'];
  	let p_adstreet = ['Barking','Park Ave','Bond Street','Fress Street']
  	let p_adpc = ['AA1 001','BB2 002','CC3 003','DD4 004'];
 	let p_rs = ['ACTIVE','ACTIVE','ACTIVE','ACTIVE'];

  	let staff = new Array();
  	//Add Doctors as participants
    for(let i=0; i<dids.length; i++){
     	
      	let newStaff = factory.newResource(ns, 'Doctor', dids[i]);
      	newStaff.name = drnames[i];
      	newStaff.specialization = specs[i];
      	newStaff.qualification = qual[i];
      	newStaff.hospital = hospital[i];
      	newStaff.designation1 = grades[i];
      	staff.push(newStaff);
    }
  	let traderReg = await getParticipantRegistry(ns+'.Doctor');
  	await traderReg.addAll(staff);
  
  	let adstaff = new Array();
  	//Add Admins as participants
    for(let i=0; i<adids.length; i++){
     	let factory = getFactory();
      	let newStaff = factory.newResource(ns, 'Admin', adids[i]);
      	newStaff.name = adnames[i];
      	//newStaff.hospital = hospitals[i];
      	newStaff.designation2 = adgrades[i];
      	adstaff.push(newStaff);
    }
  	let traderRegad = await getParticipantRegistry(ns+'.Admin');
  	await traderRegad.addAll(adstaff);
  
  	let phstaff = new Array();
  	//Add Pharmacy as participants
    for(let i=0; i<phids.length; i++){
     	let factory = getFactory();
      	let newStaff = factory.newResource(ns, 'Pharmacy', phids[i]);
      	newStaff.name = phnames[i];
      	newStaff.pharmaRegNo = phreg[i];
      	newStaff.designation3 = phgrades[i];
      	phstaff.push(newStaff);
    }
  	let traderRegph = await getParticipantRegistry(ns+'.Pharmacy');
  	await traderRegph.addAll(phstaff);
  	
  	let patients = new Array();
  	//Add Patients as participants
    for(let i=0; i<pids.length; i++){
     	let factory = getFactory();
      	let newStaff = factory.newResource(ns, 'Patient', pids[i]);
      	let addresss = factory.newConcept(ns,'ADDRESS');
      	newStaff.address = addresss;
      	newStaff.name = pnames[i];
      	newStaff.age = p_ages[i];
      	newStaff.gender = p_gender[i];
      	newStaff.status = p_rs[i];
      	addresss.Name = p_adname[i];
        addresss.NameNumber = p_adnameno[i];
        addresss.Street = p_adstreet[i];
        addresss.PostCode = p_adpc[i];
      	patients.push(newStaff);
    }
  	let traderRegpt = await getParticipantRegistry(ns+'.Patient');
  	await traderRegpt.addAll(patients);
}
/*
* @param {org.ehr.net.initialiseAsset} no param
* @transaction
*/
async function initialiseAsset(){
    //values to populate Medical History 
  	let MedHids = ['1','2','3','4'];
  	let Bloodtypes = ['AB+','B-','A+','O-'];
  	let Allergies = ['Nil','Lactose intolerance','Peanut allergy','Nil'];
  	let Surgeries = ['Nil','Appendix removal','Nil','Nil'];
  	let Genetic = ['Diabetes','Nil','Nil','Nil'];
  	let DescMh = ['Type 2 Diabetes','Nil','Nil','Nil'];
  	let PatientIds = ['001','002','003','004'];
  	let MedH = new Array();
  	
  	//values to populate Treatment
  	let Ttids = ['1','2','3','4'];
  	let Sympt = ['Sore throat, Stuffy nose, Fever','Gas, Burning pain in the tummy','Pink eye, inflammation in eye','Vomitting','Diarrhhea'];
    let Diag = ['Flu','Ulcer','Conjunctivitis','Food poison'];
  	let DiagDesc = ['Nil','Nil','Nil','Nil'];
  	let AddNotes = ['Nil','Nil','Nil','Nil'];
  	let Dstatus = ['Treated','Treated','Treated','Treated'];
  	let Treat = new Array();
  	
  	let psids = ['1','2','3','4'];
  	let Prescr = ['Paracetamol 500mg','Pepto-Bismol','Eye Drop','ORS'];
  	let Phstatus = ['Purchased','NotPurchased','Purchased','NotPurchased'];
  	let Prescriptions = new Array();
  
  	//To Store values to Medical History
    MedHids.forEach( (Mval, Mindex) => {
   		let factory = getFactory();
   		let newMedH = factory.newResource(ns, 'MedicalHistory', Mval);
   		let PatientRel = factory.newRelationship(ns, 'Patient', PatientIds[Mindex]);
      	newMedH.patient_obj = PatientRel;
        newMedH.Bloodtype = Bloodtypes[Mindex];
        newMedH.Allergy = Allergies[Mindex];
        newMedH.Surgery = Surgeries[Mindex];
        newMedH.GeneticDisorders = Genetic[Mindex];
      	newMedH.Description = DescMh[Mindex];
      	MedH.push(newMedH);
    });
  	let commodityReg = await getAssetRegistry(ns+'.MedicalHistory');
  	await commodityReg.addAll(MedH);
  
  	//To store values to Treatment
  	Ttids.forEach( (Mval, Mindex) => {
   		let factory = getFactory();
   		let newTreat = factory.newResource(ns, 'Treatment', Mval);
   		let PatientRel = factory.newRelationship(ns, 'Patient', PatientIds[Mindex]);
      	newTreat.patient_obj = PatientRel;
        newTreat.Symptoms = Sympt[Mindex];
        newTreat.Diagnosis = Diag[Mindex];
        newTreat.DiagnosisDescr = DiagDesc[Mindex];
      	newTreat.AdditionalNotes = AddNotes[Mindex];
      	newTreat.status = Dstatus[Mindex];
      	Treat.push(newTreat);
    });
  	let TreatReg = await getAssetRegistry(ns+'.Treatment');
  	await TreatReg.addAll(Treat);
  
  	//To store values to Prescriptions
  	psids.forEach( (Mval, Mindex) => {
   		let factory = getFactory();
   		let newPresc = factory.newResource(ns, 'Prescription', Mval);
      	let TreatmentRel = factory.newRelationship(ns, 'Treatment', Ttids[Mindex])
   		let PatientRel = factory.newRelationship(ns, 'Patient', PatientIds[Mindex]);
      	newPresc.treatment_obj = TreatmentRel;
      	newPresc.patient_obj = PatientRel;
        newPresc.Prescriptions = Prescr[Mindex];
      	newPresc.PharmacyStatus = Phstatus[Mindex];
      	Prescriptions.push(newPresc);
    });
  	let PrescReg = await getAssetRegistry(ns+'.Prescription');
  	await PrescReg.addAll(Prescriptions);
}
