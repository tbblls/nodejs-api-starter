var bodyParser       = require('body-parser');
var Employer  = require('../controllers/employer');
var Employee  = require('../controllers/employee');
var urlencodedParser = bodyParser.urlencoded({ extended: true });
var jsonParser = bodyParser.json();

module.exports = function(express, app){

    var router = express.Router();

    function securePages(req, res, next){
        // Need to secure properly
        if(true){
            next();
        }else{
            res.redirect('/');
        }
    }

    /* Example routes ********************************************
    *************************************************************/



        router.route('/employers',securePages, urlencodedParser)
        .get(Employer.getAll)
        .post(Employer.add);

        router.route('/employers/:id',securePages, urlencodedParser)
        .get(Employer.get)
        .put(Employer.update)
        .post(Employer.update)
        .delete(Employer.delete);

        router.route('/employees',securePages, urlencodedParser)
        .get(Employee.getAll)
        .post(Employee.add);

        router.route('/employees/:id',securePages, urlencodedParser)
        .get(Employee.get);

    /* End Example routes ***************************************/


    app.use('/', router);
}
