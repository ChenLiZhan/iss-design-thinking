var path = require('path');

module.exports = {
    environment: 'development',
    port: (process.env.PORT || 3000),

    admin: {
        username: 'USERNAME',
        password: 'PASSWORD'
    },

    spreadsheet: {
        key: ''
    },

    googleCreds: {
        "private_key_id": "",
        "private_key": "",
        "client_email": "",
        "client_id": "",
        "type": "service_account"
    }
};