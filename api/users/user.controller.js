const { create, getUsers, getUserByUserId, updateUser, deleteUser } = require('./user.service');

const { genSaltSync, hashSync } = require("bcrypt")

module.exports = {
    createUser: (req, res) => {
        const body = req.body;
        const salt = genSaltSync(10);
        body.password = hashSync(body.password, salt);
        create(body, (err, results) => {
            console.log(body, "Body")
            if(err) {
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error"
                });
            }
            return res.status(200).json({
                success: 1,
                data: results.insertId
            })
        })
    },

    getUserByUserId : (req, res) => {
        const id = req.param.id;
        getUserByUserId(id, (err, results) => {
            if(err) {
                console.log(err);
                return;
            }
            if (!results) {
                return res.json({
                    success: 0,
                    message: "Record not Found"
                });
            }
            return res.json({
                success: 1,
                data:results
            })
        })
    },

    getUsers: (req, res) => {
        getUsers( (err, results) => {
            if(err) {
                console.log(err);
                return;
            }
            return res.json({
                success: 1,
                data:results
            })
        })
    },

    updateUser: (req, res) => {
        const body = req.body;
        const salt = genSaltSync(10);
        body.password = hashSync(body.password, salt);
        updateUser(body, (err, results) => {
            if(err) {
                console.log(err);
                return
            }
            if(!results) {
                return res.json({
                    success: 0,
                    message: "Failed to update user"
                })
            }
            return res.json({
                success: 1,
                message: "Update successfully"
            })
        })
    },

    deleteUser: (req, res) => {
        const data = req.body;
        deleteUser(data, (err, results) => {
            if(err) {
                console.log(err);
                return;
            }
            if(!results) {
                return res.json({
                    success: 0,
                    message : "Record not found"
                })
            }
            return res.json({
                success: 1,
                message: "User deleted successfully."
            })
        })
    }
}