import mysql = require('mysql');

export default class MySQL {

    private static _instance: MySQL;

    connection: mysql.Connection;
    connected: boolean = false;

    constructor() {
        this.connection = mysql.createConnection({
            host: 'localhost',
            user: 'node_user',
            password: 'node_user',
            database: 'test'
        });

        this.connect();
    }

    public static get instance() {
        if (!this._instance) {
            this._instance = new this();
        }
        return this._instance;
    }

    public static executeQuery(query: string, callback: Function) {
        this.instance.connection.query(query, (err, result: Object[], fields) => {
            if (err) {
                console.log('Error on query');
                console.log(err.message);

                callback(err);
                return;
            }

            if (result.length === 0) {
                callback('No data');
            }
            else {
                callback(null, result);
            }
        });
    }

    private connect() {
        this.connection.connect((err: mysql.MysqlError) => {
            if (err) {
                console.log(err.message);
                return;
            }

            this.connected = true;
            console.log('DB connected!');
        });
    }

}