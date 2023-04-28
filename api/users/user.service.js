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
    }
}

