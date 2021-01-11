module.exports = function(app, Plan)
{
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
                    return res.json({message: 'plan updated', size: plan.liked.length});
                })
                
            } else if (req.body.like == false ){
                const idx = plan.liked.indexOf({UID: req.body.UID})
                plan.liked.splice(idx,1)
                plan.currentPeople = plan.liked.length
                plan.save(function(err){
                    if(err) res.status(500).json({error: 'failed to update'}); 
                    return res.json({message: 'plan updated', size: plan.liked.length});
                })
                
            } else {
                return res.json({message: 'plan not updated', size: plan.liked.length})
            }

        });
    });
    // DELETE Plan
    app.delete('/api/plan/:plan_id', function(req, res){
        Plan.remove({ _id: req.params.plan_id }, function(err, output){
            if(err) return res.status(500).json({ error: "database failure" });
            res.json({message: "deleted"});
        })
    });
}