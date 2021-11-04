const bcrypt = require('bcryptjs');
const e = require('cors');

const users = [];

module.exports = {
    login: (req, res) => {
      console.log('Logging In User')
      console.log(req.body)
      const { username, password } = req.body
      let userfound = false;
      for (let i = 0; i < users.length; i++) {
        if (users[i].username === username){
          userfound = true;
          bcrypt.compare(password,users[i].password).then(result => {
            if(result){
              console.log(result);
              res.status(200).send(users[i]);
            }
        }).catch(err => console.log(err));
      }
      if(userfound == false){
        res.status(400).send("User not found.");
      }
    }
  },
    register: (req, res) => {
        console.log('Registering User')
        let salt = bcrypt.genSaltSync(10);
        let hash = bcrypt.hashSync(req.body.password,salt);
        let user = req.body;
        user.password = hash;
        users.push(user);
        console.log(users);
        res.status(200).send(user);
    }
}