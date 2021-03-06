const express = require('express');
const users = express.Router();
const client = require('../connection');

users.get('/users', async (req, res) => {
    if(client.isConnected()){
        const db = client.db('examjc');
        const printUsers = await db.collection('users').find().toArray();
        res.send(printUsers);
    }else{
        res.send({
            status: 'warning',
            message: 'gagal memuat data',
        })
    }
})

users.post('/register', async (req, res) => {
    if(client.isConnected()) {
        const { name, email, phone, address } = req.body;
        const db = client.db('examjc');
        const result = await db.collection('users').insertOne({
            name: name,
            email: email,
            phone: phone,
            address: address
        });
        if (result.insertedCount == 1) {
            res.send(req.body)
        } else {
            res.send({
                status: 'warning',
                message: 'gagal mengirim data',
            })
        }
    }else{
        res.send({
            status: 'error',
            message: 'koneksi database gagal'
        })   
    }
})

users.post('/filter', async (req, res) => {
    if(client.isConnected()) {
        // console.log(req.body);
        const { type, keyword } = req.body;
        const db = client.db('examjc');
        const printFilter = await db.collection('users').find({
            [type]: keyword
        }).toArray();
        //console.log(printFilter);
        if (printFilter) {
            res.send(printFilter);
        } else {
            res.send({
                status: 'warning',
                message: 'gagal mengirim data',
            })
        }
    }else{
        res.send({
            status: 'error',
            message: 'koneksi database gagal'
        })   
    }
})

module.exports = users;