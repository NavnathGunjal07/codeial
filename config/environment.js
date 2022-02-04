const development = {
    name: 'development',
    asset_path: './assets',
    session_cookie_key: 'blahsomething',
    db: 'codieal_devlopment',
    smtp:{
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: 'navnathgunjal627',// ethereal username
            pass: 'GunjalSonu@#$123'//etheral password
        }
    },
    google_client_id:'179718352298-7t8s49e4pljllrt0os38fcndntffnp8k.apps.googleusercontent.com', // e.g. asdfghjkkadhajsghjk.apps.googleusercontent.com
    google_client_secret: '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', // e.g. _ASDFA%KFJWIASDFASD#FAD-
    google_callbackURL: "http://localhost:8000/users/auth/google/callback",
    jwt_secret: 'codeial'
}

const production = {
    name: 'production',
    asset_path: process.env.asset_path,
    session_cookie_key: process.env.session_cookie_key,
    db: process.env.DB,
    smtp:{
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: 'navnathgunjal627',// ethereal username
            pass: 'GunjalSonu@#$123'//etheral password
        }
    },
    google_client_id:process.env.google_client_id, // e.g. asdfghjkkadhajsghjk.apps.googleusercontent.com
    google_client_secret: process.env.GOOGLE_CLIENT_SECRETE, // e.g. _ASDFA%KFJWIASDFASD#FAD-
    google_callbackURL: process.env.google_callbackURL,
    jwt_secret: process.env.jwt_secret
}


module.exports = eval(process.env.CODEIAL_DEVELOPMENT)==undefined? development : eval(process.env.CODEIAL_DEVELOPMENT);