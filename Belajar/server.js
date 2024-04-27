const express = require('express');
const mysql = require("mysql2");
const app = express();
const port = 5000;

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database:'belajar2'
});

connection.connect(error => {
    if (error) throw error;
    console.log("Successfully connected to the database.");
});

app.get('/home', (req,res) => {
    res.send(`Get-Home`)
})

app.post('/', (req,res) => {
    const siswaBaru = req.body;

    connection.query("INSERT INTO siswa2 SET ?", siswaBaru,(err) => {
        if (err) {
            console.log("error:", err);
            res.status(500).send({
                message : err.message || "Terjadi kesalahan saat insert data"
            });
        }
        else
            res.send(siswaBaru)
    });
})

app.get('/', (req,res) => {
    const qstring = "SELECT * FROM siswa2";
    connection.query(qstring, (err,data)  => {
        if (err) {
            console.log("error:", err.message);
            res.status(500).send({
                message : err.message || "Terjadi kesalahan saat get data"
            });
        }
        else res.send(data)
    });
})

app.get('/:nis', (req,res) => {
    const qstring = "SELECT * FROM siswa2";
    connection.query(qstring, (err,data)  => {
        if (err) {
            console.log("error:", err);
            res.status(500).send({
                message : err.message || "Terjadi kesalahan saat get data"
            });
        }
        else res.send(data)
    });
})

app.put('/:nis', (req,res) => {
    const nis = req.params.nis;
    const swa = req.body;
    const qstring = `UPDATE siswa2 
                     SET nis = '${swa.nis}', nama = '${swa.nama}',  angkatan= '${swa.angkatan}', sekolah = '${swa.sekolah}'`;
    connection.query(qstring, (err,data)  => {
        if (err) {
            res.status(500).send({
                message : "Error updating siswa with NIS" + nis
            });
        }
        else if (data.affectedRows ==0){
            res.status(404).send({
                message: `NOT found siswa with NIS $ {nis}.`
            });
        }
        else {
            console.log("update siswa:", {nis:nis, ...swa});
            res.send({nis: nis, ...swa});
        }
    });
})

app.delete('/:nis', (req,res) => {
    const nis = req.params.nis;
    const qstring = `DELETE siswa2 WHERE nis = '${nis} `
    connection.query(qstring, (err,data)  => {
        if (err) {
            res.status(500).send({
                message : "Error deleting siswa with NIS" + nis
            });
        }
        else if (data.affectedRows ==0){
            res.status(404).send({
                message: `NOT found siswa with NIS $ {nis}.`
            });
        }
        else res.send(`siswa dengan nis = ${nis} telah terhapus`);
    });
})

app.listen(port,() => {
    console.log(`server berjalan pada port ${port}`);
})