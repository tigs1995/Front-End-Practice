function ColumnGenerator(obj) {
    return Object.keys(obj).map(key => ({ Header: headerReplacer[key] || key, accessor: key }));
}

const headerReplacer = {
    'registrationID': 'Registration ID',
    'registrationDate' : 'Registration Date',
    'vehicleRegistrationNo' : 'Vehicle Registration Number',
    'make' : 'Make',
    'model' : 'Model',
    'colour' : 'Colour',
    'forenames' : 'Forenames',
    'surname' : 'Surname',
    'streetName' : 'Street Name',
    'city' : 'City',
    'postcode' : 'Postcode',
    'dateOfBirth' :'Date of Birth',
    'driverLicenceID' : 'Driver License ID',
    'timestamp' : 'Timestamp',
    'latitude' :'Latitude',
    'longitude' : 'Longitude',
    'bankCardId' : 'Bankcard ID',
    'cardNumber' : 'Card Number',
    'sortCode' : 'Sort Code',
    'bankAccountId' : 'Bank Account ID',
    'accountNumber' : 'Account Number',
    'bank' : 'Bank',
    'citizenID' : 'Citizen ID'

}



export default ColumnGenerator;