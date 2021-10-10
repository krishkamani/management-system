const axios = require('axios');

exports.homeRoutes = (req, res)=>{
    axios.get("http://localhost:3000/api/users")
        .then(data=>{
            res.render('index',{users: data.data});
        })
        .catch(err=>{
            res.status(500).send({message:err.message});
        });
}

exports.addUserRoutes = (req, res) =>{
    res.render('add-user', {pageErrors: 2});
}

exports.updateUserRoutes = (req, res)=>{
    axios.get("http://localhost:3000/api/users",{params:{id:req.query.id}})
        .then(data=>{
            res.render('update-user',{user: data.data});
        })
        .catch(err=>{
            res.status(500).send({message:err.message});
        });
}