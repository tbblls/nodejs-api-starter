var Employer  = require('../controllers/employer');
var Employee  = require('../controllers/employee');
var Device  = require('../controllers/device');

module.exports = function(express, app){

    var router = express.Router();

    function securePages(req, res, next){
        Device.validate(req.query.accesscode)
        .then(function(data){
          if(data){
            next();
          }
          else {
            res.send("You do not have permission to use this API");
          }
        })
        .catch(function(e){
          res.send(e);
        });

    }

    // Secure all routes
    router.use(securePages);

    /* Example routes ********************************************
    *************************************************************/

        router.route('/employers')
        .get(Employer.getAll)
        .post(Employer.add);

        router.route('/employers/:id')
        .get(Employer.get)
        .put(Employer.update)
        .post(Employer.update)
        .delete(Employer.delete);

        router.route('/employees')
        .get(Employee.getAll)
        .post(Employee.add);

        router.route('/employees/:id')
        .get(Employee.get);

    /* End Example routes ***************************************/


    app.use('/', router);
}
