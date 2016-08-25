// Update with your config settings.
'use strict';
module.exports = {

    development: {
        client: 'pg',
        connection: process.env.DATABASE_URL || 'postgresql://localhost/say_something'
    },

    production: {
        client: 'pg',
        connection: process.env.DATABASE_URL || 'postgresql://localhost/say_something'
    }

};
