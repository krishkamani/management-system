const Userdb = require('../model/model');

//create and save new user
exports.create_user = (req,res)=>{
    if(!req.body){
        res.status(400).send({message:"Content can not be empty"});
        return;
    }

    const user = new Userdb({
        name : req.body.name,
        email : req.body.email,
        gender : req.body.gender,
        status : req.body.status
    })

    user.save(user)
        .then(data=>{
            res.redirect('/add-user');
        })
        .catch(err=>{
            res.status(500).send({
                message:err.message || "Some error occured while creating a user"
            });
        });
}

//retrieve and return all user/ return specific user

exports.find_user = (req, res)=>{

    if(req.query.id){
        const id = req.query.id;
        Userdb.findById(id)
            .then(user=>{
                res.send(user);
            }).catch(err=>{
                res.status(500).send({
                    message:err.message || "Some error occured while retriving a user with id "+id
                });
            });
    }
    else{
        Userdb.find()
          .then(user=>{
            res.send(user);
        }).catch(err=>{
            res.status(500).send({
                message:err.message || "Some error occured while retriving a user"
            });
        });
    }
    
}

//update user
exports.update_user = (req, res)=>{
    if(!req.body){
        res.status(400).send({message:"Content can not be empty"});
        return;
    }

    const id = req.params.id;
    Userdb.findByIdAndUpdate(id, req.body, {useFindAndModify: false})
        .then(data=>{
            if(!data){
                res.status(404).send({message:`Can not update user ${id}.`});
            }
            else{
                res.send(data);
            }
        })
        .catch(err=>{
            res.status(500).send({message:err.message});
            
        })
}

//delete user
exports.delete_user = (req, res)=>{
    const id = req.params.id;
    Userdb.findByIdAndDelete(id)
        .then(data=>{
            if(!data){
                res.status(404).send({message:`Can not delete user ${id}.`});
            }
            else{
                res.send({message:"User was deleted successfully"});
            }
        })
        .catch(err=>{
            res.status(500).send({message:err.message});
        })
}