const mysql = require("mysql2");
const dbConfig = require("../config/config");
// constructor
const Bean = function (bean) {
    this.id = bean.id;
    this.supplier_id = bean.supplier_id;
    this.type = bean.type;
    this.product_name = bean.product_name;
    this.price = bean.price;
    this.description = bean.description;
    this.quantity = bean.quantity;
};
// connecting on each request so the server will start without a db connection, plus
//   a simple mechanism enabling the app to recover from a momentary missing db connection
Bean.dbConnect = () => {
    const connection = mysql.createConnection({
        host: dbConfig.APP_DB_HOST,
        user: dbConfig.APP_DB_USER,
        password: dbConfig.APP_DB_PASSWORD,
        database: dbConfig.APP_DB_NAME
    });
    connection.connect(error => {
        if (error) {
            console.log("Error connecting to Db")
            throw error;
        }
        console.log("Successfully connected to the database.");
    });
    return connection;
}

Bean.create = (newBean, result) => {
    const dbConn = Bean.dbConnect();
    dbConn.query("INSERT INTO beans SET ?", newBean, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        console.log("created bean: ", {id: res.insertId, ...newBean});
        result(null, {id: res.insertId, ...newBean});
    });
};

Bean.getAll = result => {
    const dbConn = Bean.dbConnect();
    dbConn.query("SELECT * FROM beans", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        console.log("beans: ", res);
        result(null, res);
    });
};

Bean.findById = (beanId, result) => {
    const dbConn = Bean.dbConnect();
    dbConn.query(`SELECT * FROM beans WHERE id = ${beanId}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        if (res.length) {
            console.log("found bean: ", res[0]);
            result(null, res[0]);
            return;
        }
        result({kind: "not_found"}, null);
    });
};

Bean.updateById = (id, bean, result) => {
    const dbConn = Bean.dbConnect();
    dbConn.query(
        "UPDATE beans SET supplier_id = ?, type = ?, product_name = ?, price = ?, description = ?, quantity = ? WHERE id = ?",
        [bean.supplier_id, bean.type, bean.product_name, bean.price, bean.description, bean.quantity, id],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }
            if (res.affectedRows === 0) {
                result({kind: "not_found"}, null);
                return;
            }
            console.log("updated bean: ", {id: id, ...bean});
            result(null, {id: id, ...bean});
        }
    );
};

Bean.delete = (id, result) => {
    const dbConn = Bean.dbConnect();
    dbConn.query("DELETE FROM beans WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        if (res.affectedRows === 0) {
            result({kind: "not_found"}, null);
            return;
        }
        console.log("deleted bean with id: ", id);
        result(null, res);
    });
};

Bean.removeAll = result => {
    const dbConn = Bean.dbConnect();
    dbConn.query("DELETE FROM beans", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        console.log(`deleted ${res.affectedRows} beans`);
        result(null, res);
    });
};

module.exports = Bean;