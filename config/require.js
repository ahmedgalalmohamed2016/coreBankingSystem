exports.require = {
    "merchants_create": {
        firstName: true,
        lastName: true,
        address: true,
        userName: true,
        email: false,
        mobileNumber: true,
        gender: true,
        country: true,
        city: true,
        legalName: true,
        currency: true,
        commonName: true,
        userId: false,
        mappingId: true,
        categories: false,
        contactPerson: false,
        homapageDesc: false,
        bio: false,
    },
    "merchants_list": {
        pageNum: true,
    },
    "merchants_transaction_settled": {
        pageNum: true,
        merchantId:true
    },
    "merchants_transaction_archived": {
        pageNum: true,
        merchantId:true
    },
    "cards_add": {
        userId: true,
        cardNum: true,
        expireMonth: true,
        expireYear: true,
        holderName: true,
        csv: true,
    },
    "cards_list": {
        userId: true,
        pageNum: true,
    },
    "transactions_create": {
        fromId: true,
        toId: true,
        cardId: true,
        amount: true,
        currency: true,
        status: true,
        sourceType: true,
        sourceId: true,
        sourceData: true,
        comment: false,
        paymentMethod: true,
        code: true,
        isArchived: true,
        settled: true
    }
}
