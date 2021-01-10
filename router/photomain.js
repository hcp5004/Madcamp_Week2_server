module.exports = function(app, Photo) // when call module by require, this function is executed. 
{
    // GET ALL CONTACTS
    app.get('/api/photos', function(req,res){
        Photo.find(function(err, photos){
            console.log("getall");
            if(err) return res.status(500).send({error: 'database failure'});
            console.log(photos)
            res.json(photos);
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
    app.get('/api/photos/:user', function(req,res){
        Photo.find({user: req.params.user}, function(err, photos){
            if(err) return res.status(500).json({error: err});
            // if(contacts.length === 0) return res.status(404).json({error: 'contact not found'});
            res.json(photos);
        })
    });

    // GET CONTACT BY _ID
    app.get('/api/photos/photo_id/:photo_id', function(req, res){
        Photo.find({name: req.params.name},  function(err, photos){
            if(err) return res.status(500).json({error: err});
            if(photos.length === 0) return res.status(404).json({error: 'photo not found'});
            res.json(photos);
        })
    });

    // CREATE CONTACT
    app.post('/api/photos', function(req, res){
        console.log("create success")
        var photo = new Photo();
        photo.user = req.body.user;
        photo.image = req.body.image;
        
        photo.save(function(err){ //contact is saved on collction contacts
            if(err){
                console.error(err);
                res.json({result: 0});
                return;
            }
    
            res.json({result: 1, id: photo._id});
            console.log(photo._id)
            console.log(photo);
    
        });
    });

    // UPDATE THE CONTACT
    // app.put('/api/photos/:photo_id', function(req, res){
    //     Contact.findById(req.params.photo_id, function(err, contact){
    //         console.log(req.params.photo_id)
    //         if(err) return res.status(500).json({ error: 'database failure' });
    //         if(!contact) return res.status(404).json({ error: 'photo not found' });
    
    //         if(req.body.number) contact.number = req.body.number;
    
    //         contact.save(function(err){
    //             if(err) res.status(500).json({error: 'failed to update'});
    //             res.json({message: 'contact updated'});
    //         });
    
    //     });
    // });

    // DELETE PHOTO
    app.delete('/api/photos/:photo_id', function(req, res){
        Photo.remove({ _id: req.params.photo_id }, function(err, output){
            if(err) return res.status(500).json({ error: "database failure" });
    
            // if(!output.result.n) return res.status(404).json({ error: "book not found" });
            res.json({ message: "photo deleted" });
        })
    });
}