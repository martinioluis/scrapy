const { Router } = require('express');
const connection = require('../conf');

const router = Router();

// GET all items
router.get('/', (req, res, next) => {
    connection.query('select title, subTitle, url, distance, adress, postalCode, city, price from item', (error, results) => {
        if(error) {
            res.sendStatus(500);
        } else {
            res.json(results);
        }
    });
});

// GET column names
router.get('/names', (req, res, next) => {
    connection.query("select column_name from information_schema.columns where table_name like 'item'", (error, results) => {
        if(error) {
            res.sendStatus(500);
        } else {
            res.json(results);
        }
    });
});

module.exports = router;
