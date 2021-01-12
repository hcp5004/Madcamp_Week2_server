module.exports = function(app, Plan)
{
    /////////message////////////

    var admin = require("firebase-admin");

    var serviceAccount = require("/home/ubuntu/server/cs496week2-39d97-firebase-adminsdk-fnpd2-f5f476444d.json")
    // require("./cs496week2-39d97-firebase-adminsdk-fnpd2-f5f476444d.json");

    admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
    });

    //////////message/////////////

    var registrationToken = "fwrYk4HjRLqXAC3D-LzVD1:APA91bG6_hiNStShOrUJtJLC-LIs1UTmQZ0ofuAjySlNkSx33Z7FD7gs2uu4y-9bpTcv3kkfIXkdzyslj5PjsXA60Q9UNJiWiP4ZB36bocBAHEEnP78af_KxzbYHCQcMx3pC_ywdSt6d"



    // GET ALL PLAN ... SEND ALL PLAN LIST
    app.get('/api/plan', function(req,res){
        Plan.find(function(err, plans){
            if(err) return res.status(500).send({error: 'database failure'});
            res.json(plans);
        })
    });

    app.post('/api/plan', function(req, res){
        var plan = new Plan();
        plan.time = req.body.time;
        plan.place = req.body.place;
        plan.fullPeople = req.body.fullPeople;
        plan.name = req.body.name;
        plan.currentPeople = req.body.currentPeople;
        plan.liked = req.body.liked;
        plan.save(function(err){
            if(err){
                console.error(err);
                res.json({result: 0});
                return;
            }

            var payload = {
                notification: {
                    title: "날짜:" + plan.time +" 장소:" + plan.place,
                    body: plan.fullPeople + "명을 구합니다."
                }
            }
        
            admin.messaging().sendToDevice(registrationToken, payload)
                .then(function(response){
                    console.log("SUCCESSFUL MESSAGE", response);
                })
                .catch(function(error){
                    console.log("ERROR MESSAGE", error)
                });

            res.json({result: 1, _id: plan._id});
        });
    });
    // LIKED THE Plan
    app.put('/api/plan/:plan_id', function(req, res){
        Plan.findById(req.params.plan_id, function(err, plan){
            if(err) {
                return res.status(500).json({ error: 'database failure' });
            }
            if(!plan) {
                return res.status(404).json({ error: 'plan not found' });
            }

            if((req.body.like == true) && (plan.currentPeople < plan.fullPeople)){
                plan.liked.push({UID: req.body.UID})
                plan.currentPeople = plan.liked.length
                plan.save(function(err){
                    if(err) res.status(500).json({error: 'failed to update'}); 
                    console.log(plan.liked.length);
                    return res.json({message: 'plan updated', size: plan.liked.length});
                })
                
            } else if (req.body.like == false ){
                const idx = plan.liked.indexOf({UID: req.body.UID})
                plan.liked.splice(idx,1)
                plan.currentPeople = plan.liked.length
                plan.save(function(err){
                    if(err) res.status(500).json({error: 'failed to update'}); 
                    console.log(plan.liked.length);
                    return res.json({message: 'plan updated', size: plan.liked.length});
                })
                
            } else {
                return res.json({message: 'plan not updated', size: plan.liked.length})
            }

        });
    });
    // DELETE Plan
    app.delete('/api/plan/:plan_id', function(req, res){
        Plan.deleteOne({ _id: req.params.plan_id }, function(err, output){
            if(err) return res.status(500).json({ error: "database failure" });
            res.json({message: "deleted"});
        })
    });
}