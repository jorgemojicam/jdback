const database = require('../services/database.js');
const oracledb = require('oracledb');
const baseQuery = `select * from F55PREJ0`;

async function find(context) {
    let query = baseQuery;
    const binds = {};
    if (context.id) {
        binds.employee_id = context.id;
        query += ` where PJHBMCUS = :employee_id`;
    }
    const result = await database.simpleExecute(query, binds);
    return result.rows;
}

module.exports.find = find;

const createSql =
    `insert into F55PREJ0 (
        PJBHPRICE,
        PJHBMCUS,
        PJUNT3,
        PJUPMJ,
        PJUSER,
        PJXTR1
  ) values (
    :PJBHPRICE,
    :PJHBMCUS,
    :PJUNT3,
    :PJUPMJ,
    :PJUSER,
    :PJXTR1   
  )`;

async function create(emp) {
    const employee = Object.assign({}, emp);
    const result = await database.simpleExecute(createSql, employee);
    return employee;
}

module.exports.create = create;