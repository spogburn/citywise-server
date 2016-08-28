// Update with your config settings.
'use strict';
module.exports = {

    development: {
        client: 'pg',
        connection: process.env.DATABASE_URL || 'postgresql://localhost/city_wise'
    },

    production: {
        client: 'pg',
        connection: process.env.DATABASE_URL || 'postgresql://localhost/city_wise'
    }

};
