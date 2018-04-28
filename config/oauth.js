// config/auth.js

// expose our config directly to our application using module.exports
module.exports = {

    'facebook' : {
        'clientID'      : 'your-secret-clientID-here', // your App ID
        'clientSecret'  : 'your-client-secret-here', // your App Secret
        'callbackURL'   : 'http://localhost:8080/auth/facebook/callback'
    },

    'twitter' : {
        'consumerKey'       : 'your-consumer-key-here',
        'consumerSecret'    : 'your-client-secret-here',
        'callbackURL'       : 'http://localhost:8080/auth/twitter/callback'
    },

    'google' : {
        'clientID'      : '58366423117-ckvdj2iamvc6bgh6sbtib3m1h5485ncq.apps.googleusercontent.com',
        'clientSecret'  : 'gz7IrhDhjpaLg2L9ouPlyl53',
        'callbackURL'   : 'http://127.0.0.1:3000/auth/google/callback'
    }

};
