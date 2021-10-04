const employees = require('../dbapi/employees.js');

async function get(req, res, next) {
  try {
    const context = {};
    context.id = parseInt(req.params.id, 10);
    console.log("---", context.id)
    const rows = await employees.find(context);

    if (req.params.id) {
      if (rows.length === 1) {
        res.status(200).json(rows[0]);
      } else {
        res.status(404).end();
      }
    } else {
      res.status(200).json(rows);
    }
  } catch (err) {
    next(err);
  }
}
module.exports.get = get;

async function post(req, res, next) {
  try {
    console.log("post->", req.body)
    let employee = getObjectFromRec(req);    
    employee = await employees.create(employee);

    res.status(201).json(employee);
  } catch (err) {
    next(err);
  }
}
module.exports.post = post;


function getObjectFromRec(req) {
  const object = {
    PJBHPRICE: req.body.PJBHPRICE,
    PJHBMCUS: req.body.PJHBMCUS,
    PJUNT3: req.body.PJUNT3,
    PJUPMJ: req.body.PJUPMJ,
    PJUSER: req.body.PJUSER,
    PJXTR1: req.body.PJXTR1
  };

  return object;
}

