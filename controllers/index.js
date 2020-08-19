const axios = require('axios');

//free.currconv.com
const key = '2ec512a068746b8930bb';
let origin = 'USD',target = 'VEF';
let url_fc = `https://free.currconv.com/api/v7/convert?q=${origin}_${target}&compact=ultra&apiKey=${key}`;

//api.exchangeratesapi.io
const apicc = 'https://api.exchangeratesapi.io/latest?base=USD';

//api.coinlayer.com
const apiKey = 'a3687349f946c7609a2f019889396a08';
const url_cl = 'http://api.coinlayer.com/api/live?access_key=';

const items = [
    {id: 1, name: 'Product 1'},
    {id: 2, name: 'Product 2'},
    {id: 3, name: 'Product 3'}
];
let respuesta = {};
let consultas = 0;

const list_of_currency = (req, res) => {
    console.log('list of currency');
    consultas ++;
    respuesta = {};
    axios.get(apicc).then(eur => {
        console.log('axios 1');
        respuesta['count'] = consultas;
        respuesta['EUR'] = eur.data.rates['EUR'];
        axios.get(url_cl+apiKey).then(crypto => {
            console.log('axios 2');
            respuesta['BTC'] = crypto.data.rates['BTC'];
            respuesta['ETC'] = crypto.data.rates['ETC'];
            respuesta['DASH'] = crypto.data.rates['DASH'];
            //res.json(respuesta);
            axios.get(`https://free.currconv.com/api/v7/convert?q=USD_VEF&compact=ultra&apiKey=a3687349f946c7609a2f019889396a08`, bs => {
                console.log('axios 3');
                console.log('bs', bs);
                respuesta['Bs'] = 100.000;
                res.render('index',{respuesta});
            }).catch(err => {
                console.log('Error en axios 3');
                respuesta['Bs'] = 100.000;
                respuesta['PTC'] = 60;
                res.render('index',{respuesta});
            });
            
        }).catch(err => {
            console.log('Error en axios 2');
            respuesta['BTC'] = 0;
            respuesta['ETC'] = 0;
            respuesta['DASH'] = 0;
            respuesta['Bs'] = 100.000;
            respuesta['PTC'] = 60;
            respuesta['err'] = 'Lo sentimos, no se pudo completar la busqueda';
            res.render('index',respuesta);
        });
    }).catch(err => {
        console.log('Error en axios 1');
        respuesta = {
            count: consultas,
            EUR: 0,
            BTC: 0,
            ETC: 0,
            DASH: 0,
            Bs: 0,
            PTC: 0,
            err: 'Lo sentimos, ahora no podemos responderte.'
        }
        res.render('coins',{respuesta});
    });
}

module.exports = {
    list_of_currency
}
