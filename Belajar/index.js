const express = require('express');
const app = express();
const port = 5000;

app.use(express.json());

app.post('/siswa', (req, res) => {
    const nis = req.body.nis;
    const nama = req.body.nama;

    const data = {  status:"sukses",
                    data:{"nis" : nis, "nama" : nama}};
    res.send(data);
})

app.get('/', (req,res) => {
    res.send(`Hello World`)
})

app.put('/', (req,res) => {
    res.send(`Put Data`)
})

app.get('/siswa', (req, res) => {
    res.json(siswa)
});

app.get('/get-siswa-by-nis', (req, res) => {
    const nis = req.query.nis;
    
    res.send(`siswa dengan nis : ${nis} ditemukan`)
});

app.get('/nilai-persemester', (req, res) =>{
    const nis = req.query.nis;
    const semester = req.query.semester;

    res.send(`nilai siswa nis : ${nim} semester ${semester}`)
})
app.get('/siswa/:nis', (req, res ) => {
    const nis = req.params.nis;

    res.send(`Siswa dengan nis : ${nis} ditemukan`)
});

app.get('/nilai/:nis/:semester', (req, res) => {
    const nis = req.params.nim;
    const semester = req.params.semester;

    res.send(`nilai siswa nis : ${nis} semester ${semester} ditemukan`)
});

app.post('/', (req,res) => {
    res.send(`Post Data`)
})

app.delete('/', (req,res) => {
    res.send(`Hapus Data`)
})

app.get('/:id', (req,res) => {
    const id = req.params.id
    res.send(`Get-Home id - ${id}`)
})

app.listen(port,() => {
    console.log(`server berjalan pada port ${port}`);
})
