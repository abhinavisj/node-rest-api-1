const pool = require('../../config/database');

module.exports = {
    create: (data, callback) => {
        console.log(data, "Data")
        pool.query(
            `insert into registration(firstName, lastName, gender, email, password, number) 
                values(?,?,?,?,?,?)`,
                [
                    // data.id,
                    data.firstName,
                    data.lastName,
                    data.gender,
                    data.email,
                    data.password,
                    data.number,
                ],
                (error, results, fields) => {
                    if(error) {
                        return callback(error)
                    }
                    return callback(null, results)
                }
        );
    },

    getUsers: callback => {
        pool.query(
            `select id,firstName, lastName, gender, email, password, number from registration`,
            [],
            (error, results, fields) => {
                if(error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        )
    },

    getUserByUserId: (id, callback) => {
        pool.query(
            `select id,firstName, lastName, gender, email, password, number from registration where id = ? `,
            [id],
            (error, results, fields) => {
                if(error) {
                    return callback(error);
                }
                return callback(null, results[0]);
            }
        )
    },

    updateUser: (data, callback) => {
        pool.query(
            `update registration set firstName=?, lastName=?, gender=?, email=?, password=?, number=? where id = ? `,
            [
                    data.firstName,
                    data.lastName,
                    data.gender,
                    data.email,
                    data.password,
                    data.number,
                    data.id
            ],
            (error, results, fields) => {
                console.log(error)
                if(error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        )
    },

    deleteUser: (data, callback) => {
        pool.query(
            `delete registration where id = ? `,
            [data.id],
            (error, results, fields) => {
                if(error) {
                    return callback(error);
                }
                return callback(null, results[0]);
            }
        )
    }
}

