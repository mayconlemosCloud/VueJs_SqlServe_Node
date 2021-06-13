
const jwt = require('jsonwebtoken');
const SECRET = 'abcde123456'

module.exports = {
    

    async getToken(req){
        console.log("token: ", req.headers.authorization)
        const token = req.headers.authorization;
    }

  
}

