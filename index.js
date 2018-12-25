const Block = require("./block");
const Blockchain = require("./blockchain");
const responseCreator = require("./responseCreator");
const validator = require("./validator");
const express = require("express");

// Replace with database
const accounts = require('./accounts');

const app = new express();

const PORT = 8080;
const HOSTNAME = "0.0.0.0";

let blockChain = new Blockchain();

app.get('/chain', (req, res) => {
    responseCreator(true, blockChain, (data) => {
        res.send(data);
    });
});

authenticate = (credentials, callback) => {
    const user = accounts[credentials.account];
    // Expect the user not to be found
    let data = false;
    if (user) {
        if (user.password === credentials.password) {
            // User exists, password is correct
            data = user;
        } else {
            // User exists, password is incorrect
            data = true;
        }
    }
    callback(data);
}

app.get('/valid', (req, res) => {
    const chainValid = {
        valid: blockChain.checkValid().toString(),
        latest: blockChain.latestBlock()
    }
    responseCreator(true, chainValid, (data) => {
        res.send(data);
    });
})

app.post('/add', (req, res) => {
    // Get the data passed as query params
    const data = req.query;

    // We need data, account and password
    const requirements = [
        "data",
        "account",
        "password"
    ];

    // Run the validator first
    validator(data, requirements, (bool) => {
        if (bool) {

            // If we pass the validator, authenticate the user
            authenticate({ account: data.account, password: data.password }, (user) => {

                // If user is not false
                if (user) {
                    if (typeof user === "object") {

                        // If user is a object, create a proper response
                        addDataBlock({ user: user.id, data: data.data }, (data) => {
                            res.send("successfully done");
                        });
                    } else {

                        // If user is true, password seems incorrect
                        responseCreator(false, "Password incorrect", (data) => {
                            res.send(data);
                        });
                    }
                } else {

                    // User does not exist
                    responseCreator(false, "User not found", (data) => {
                        res.send(data);
                    })
                }
            })
        } else {

            // Not all the required fields are filled in
            responseCreator(false, "Not all requirement fullfiled", (data) => {
                res.send(data);
            });
        }
    });
});

addDataBlock = (data, callback) => {
    const dt = new Date();
    let timestamp = dt.toString();
    blockChain.addBlock(new Block(timestamp, data));
    callback(true);
}

app.listen(PORT, HOSTNAME, null, () => {
    console.log(`Listening on ${HOSTNAME}:${PORT}`);
});


// console.log("Is blockchain valid?" + blockChain.checkValid().toString());