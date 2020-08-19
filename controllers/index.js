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


let respuesta = {};
let consultas = 0;

const values = () => {
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
            axios.get(`https://free.currconv.com/api/v7/convert?q=USD_VEF&compact=ultra&apiKey=a3687349f946c7609a2f019889396a08`, bs => {
                console.log('axios 3');
                console.log('bs', bs.data.USD_VEF);
                respuesta['Bs'] = bs.data.USD_VEF;
                return respuesta;;
            }).catch(err => {
                console.log('Error en axios 3');
                respuesta['Bs'] = 100.000;
                respuesta['PTC'] = 60;
                return respuesta;
            });
            
        }).catch(err => {
            console.log('Error en axios 2');
            respuesta['BTC'] = 0;
            respuesta['ETC'] = 0;
            respuesta['DASH'] = 0;
            respuesta['Bs'] = 100.000;
            respuesta['PTC'] = 60;
            respuesta['err'] = 'Lo sentimos, no se pudo completar la busqueda';
            return respuesta;
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
        return respuesta;
    });
}


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
                respuesta['Bs'] = bs.data.USD_VEF;
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
            res.render('index',{respuesta});
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
        res.render('index',{respuesta});
    });
}

const conver = (req, res) => {
    console.log('In cover');
    const aux = req.body.valor;
    const val = isNaN(aux)?1:parseInt(aux);
    console.log('conver', val, 'aux', aux);
    consultas ++;
    respuesta = {}
    respuesta['val'] = val;
    axios.get(apicc).then(eur => {
        console.log('axios 1');
        respuesta['count'] = consultas;
        respuesta['EUR'] = eur.data.rates['EUR'];
        axios.get(url_cl+apiKey).then(crypto => {
            console.log('axios 2');
            respuesta['BTC'] = crypto.data.rates['BTC'] * val;
            respuesta['ETC'] = crypto.data.rates['ETC'] * val;
            respuesta['DASH'] = crypto.data.rates['DASH'] * val;
            //res.json(respuesta);
            axios.get(`https://free.currconv.com/api/v7/convert?q=USD_VEF&compact=ultra&apiKey=a3687349f946c7609a2f019889396a08`, bs => {
                console.log('axios 3');
                console.log('bs', bs);
                respuesta['Bs'] = bs.data.USD_VEF * val;
                res.render('index',{respuesta});
            }).catch(err => {
                console.log('Error en axios 3');
                respuesta['Bs'] = 100.000 * val;
                respuesta['PTC'] = 60 * val;
                res.render('conver',{respuesta});
            });
            
        }).catch(err => {
            console.log('Error en axios 2');
            respuesta['BTC'] = 0;
            respuesta['ETC'] = 0;
            respuesta['DASH'] = 0;
            respuesta['Bs'] = 100.000 * val;
            respuesta['PTC'] = 60 * val;
            respuesta['err'] = 'Lo sentimos, no se pudo completar la busqueda';
            res.render('conver',{respuesta});
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
        res.render('conver',{respuesta});
    });
}


module.exports = {
    list_of_currency, conver
}
