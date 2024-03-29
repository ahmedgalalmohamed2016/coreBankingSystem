exports.validationRgex = {
    firstName: /^[_ a-zA-Z]{3,36}$/,
    lastName: /^[_ a-zA-Z]{3,36}$/,
    userName: /^[_ a-zA-Z]{3,36}$/,
    password: /^[_ a-zA-Z]{3,36}$/,
    address: /^.{3,300}$/,
    email: /^[_a-zA-Z0-9-]+(\.[_a-zA-Z0-9-]+)*@[a-zA-Z0-9-]*\.([a-zA-Z]{2,4})$/,
    mobileNumber: /^[0-9]{7,15}/,
    gender: /^(male|female)$/,
    country: /^[_ a-zA-Z]{3,300}$/,
    city: /^[_ a-zA-Z]{3,300}$/,
    legalName: /^[_ a-zA-Z]{3,36}$/,
    currency: /^[_a-zA-Z]{3}/,
    commonName: /^[_ a-zA-Z]{3,36}$/,
    mappingId: /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/,
    userId: /^[0-9a-fA-F]{24}$/,
    merchantId: /^[0-9a-fA-F]{24}$/,
    categories: /^.{3,300}$/,
    contactPerson: /^[_ a-zA-Z]{3,300}$/,
    homapageDesc: /^[_ a-zA-Z]{3,300}$/,
    bio: /^[_ a-zA-Z]{3,300}$/,
    pageNum: /^[0-9]{1,50}$/,
    creationDate: /^\d{4}[/_:,-]\d{1,2}[/_:,-]\d{1,2}$/,
    date: /^\d{1,2}\/\d{1,2}\/\d{4}$/,
    expireMonth: /^[0-9]{1,2}$/,
    expireYear: /^[0-9]{4}$/,
    holderName: /^[a-zA-Z- ]{2,300}$/,
    cardNum: /^[0-9]{13,19}$/,
    csv: /^[0-9]{3,4}$/,

    fromId: /^[0-9a-fA-F]{24}$/,
    toId: /^[0-9a-fA-F]{24}$/,
    cardId: /^[0-9a-fA-F]{24}$/,
    amount: /^[0-9]{0,5}$|^[0-9]{0,5}[.][0-9]{0,2}$/,
    currency: /^[_a-zA-Z]{3}/,
    status: /^(approved|declined|settled|refunded)$/,
    sourceType: /^.{2,300}$/,
    sourceId: /^[0-9a-fA-F]{24}$/,
    sourceData: /^.{2,300}$/,
    comment: /^.{2,300}$/,
    paymentMethod: /^[a-zA-Z- ]{2,300}$/,
    code: /^.{2,10}$/,
    isArchived: /^(true|false)$/,
    settled: /^(true|false)$/
}