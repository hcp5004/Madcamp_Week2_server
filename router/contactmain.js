module.exports = function(app, Contact,db) // when call module by require, this function is executed. 
{
    // GET ALL CONTACTS
    app.get('/api/contacts', function(req,res){
        Contact.find(function(err, contacts){
            console.log("getall");
            if(err) return res.status(500).send({error: 'database failure'});
            console.log(contacts)
            res.json(contacts);
        })
    });

    // GET SINGLE CONTACT
    // app.get('/api/contacts/:contact_id', function(req, res){
    //     Contact.findOne({_id: req.params.contact_id},  function(err, contact){
    //         if(err) return res.status(500).json({error: err});
    //         if(contact.length === 0) return res.status(404).json({error: 'contact not found'});
    //         res.json(contact);
    //     })
    // });


    // GET CONTACT BY USER
    app.get('/api/contacts/:user', function(req,res){
        Contact.find({user: req.params.user}, function(err, contacts){
            if(err) return res.status(500).json({error: err});
            // if(contacts.length === 0) return res.status(404).json({error: 'contact not found'});
            res.json(contacts);
        })
    });

    // GET CONTACT BY NAME
    app.get('/api/contacts/name/:name', function(req, res){
        Contact.find({name: req.params.name},  function(err, contacts){
            if(err) return res.status(500).json({error: err});
            if(contacts.length === 0) return res.status(404).json({error: 'book not found'});
            res.json(contacts);
        })
    });

    // CREATE CONTACT
    app.post('/api/contacts', function(req, res){
        console.log("create success")
        var contact = new Contact();
        contact.user = req.body.user;
        contact.name = req.body.name;
        console.log(req.body.name)
        contact.number = req.body.number;
        
        contact.save(function(err){ //contact is saved on collction contacts
            if(err){
                console.error(err);
                res.json({result: 0});
                return;
            }
    
            res.json({result: 1, id: contact._id});
            console.log(contact._id)
            console.log(contact);
    
        });
    });

    // UPDATE THE CONTACT
    app.put('/api/contacts/:contact_id', function(req, res){
        Contact.findById(req.params.contact_id, function(err, contact){
            console.log(req.params.contact_id)
            if(err) return res.status(500).json({ error: 'database failure' });
            if(!contact) return res.status(404).json({ error: 'contact not found' });
    
            if(req.body.name) contact.name = req.body.name;
            if(req.body.number) contact.number = req.body.number;
    
            contact.save(function(err){
                if(err) res.status(500).json({error: 'failed to update'});
                res.json({message: 'contact updated'});
            });
    
        });
    });

    // DELETE CONTACT
    app.delete('/api/contacts/:contact_id', function(req, res){
        Contact.remove({ _id: req.params.contact_id }, function(err, output){
            if(err) return res.status(500).json({ error: "database failure" });
    
            // if(!output.result.n) return res.status(404).json({ error: "book not found" });
            res.json({ message: 'contact deleted' });
        })
    });
}