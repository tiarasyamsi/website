import express from "express";
import mysql from "mysql";
import cors from "cors";
import "../backend/gestalt-pattern-matcher.js";
import tesAkurasi from "../backend/gestalt-pattern-matcher.js";

const app = express()

const db = mysql.createConnection({
    host:"localhost",
    port: "7000",
    user:"root",
    password:"1234",
    // database:"crud",
});

app.use(express.json())
app.use(cors())

const firstString = "station berbasis internet of things (iot) pada automatic bottle filling machine";
const firstString1 = "station berbasis internet of things (iot) pada automatic bottle filling machine";



function Cek(input, dataset){
    const arrHasil = [];
    

    for(let i = 0;i<dataset.length;i++){
        let hasil = tesAkurasi(input,dataset[i].abstrak)
        let hasil1 = tesAkurasi(input, dataset[i].judul)
        arrHasil.push({id:i+1,hasilAbstrak:hasil,hasilJudul:hasil1})
    }


    let avg = 0;
    for(let i = 0;i<arrHasil.length;i++){
        avg += arrHasil[i]
    }
    let avg1 = avg/arrHasil.length;
    console.log("Hasil Uji: "+ arrHasil);

    return arrHasil

}

app.get("/", (req, res) => {
    res.json("hello this is the backend");
});

app.get("/abstrak", (req, res) => {
    const q = "SELECT * FROM crud.judul"
    db.query(q, (err, data) => {
        if(err) return res.json(err)
        else{
        return res.json("Nilai Plagiarisme:"+JSON.stringify(Cek(firstString,data)))
        return res.json("Nilai Plagiarisme:"+JSON.stringify(Cek(firstString1,data)))
        }
    });
    
});
  
app.post("/judul", (req, res) => {
    // var judul = req.body.judul;
    // var abstrak = req.body.abstrak;

    const inputHasil = "INSERT INTO crud.hasil_plagiarisme (`nama`, `nim`, `judul`, `abstrak`, `hasil`) VALUES (?)"
    const values = [
        req.body.nama,
        req.body.nim,
        req.body.judul,
        req.body.abstrak,
        req.body.hasil
    ];
    // const values = req.data

    db.query(inputHasil, [values], (err, data) => {
        if(err) return res.json(err)
        return res.json("Data has been created successfully");
    });
})

//input data pengajuan TA
app.post("/pengajuanTA", (req, res) => {
   
    const pengajuanTA = "INSERT INTO crud.pengajuanTA (`nama`, `nim`, `prodi`, `judul`, `pembimbing1`, `pembimbing2`) VALUES (?)"
    const values = [
        req.body.nama,
        req.body.nim,
        req.body.prodi,
        req.body.judul,
        req.body.pembimbing1,
        req.body.pembimbing2
    ];
    // const values = req.data

    db.query(pengajuanTA, [values], (err, data) => {
        if(err) return res.status(500)
        return res.send("Data has been created successfully");
    });
})

//input data proposal awal
app.post("/proposal_awal", (req, res) => {
   
    const proposal_awal = "INSERT INTO crud.proposal_awal (`nama`, `nim`, `prodi`, `judul`, `proposal_awal`) VALUES (?)"
    const values = [
        req.body.nama,
        req.body.nim,
        req.body.prodi,
        req.body.judul,
        req.body.proposal_awal
    ];
    // const values = req.data

    db.query(proposal_awal, [values], (err, data) => {
        if(err) return res.status(500)
        return res.send("Data has been created successfully");
    });
})

//input data proposal final
app.post("/proposal_final", (req, res) => {
   
    const proposal_final = "INSERT INTO crud.proposal_final (`nama`, `nim`, `prodi`, `judul`, `proposal_final`) VALUES (?)"
    const values = [
        req.body.nama,
        req.body.nim,
        req.body.prodi,
        req.body.judul,
        req.body.proposal_final
    ];
    // const values = req.data

    db.query(proposal_final, [values], (err, data) => {
        if(err) return res.status(500)
        return res.send("Data has been created successfully");
    });
})

//input data laporan progress
app.post("/laporan_progress", (req, res) => {
   
    const laporan_progress = "INSERT INTO crud.laporan_progress (`nama`, `nim`, `prodi`, `judul`, `laporan_progress`) VALUES (?)"
    const values = [
        req.body.nama,
        req.body.nim,
        req.body.prodi,
        req.body.judul,
        req.body.laporan_progress
    ];
    // const values = req.data

    db.query(laporan_progress, [values], (err, data) => {
        if(err) return res.status(500)
        return res.send("Data has been created successfully");
    });
})

//input data seminar
app.post("/seminar", (req, res) => {
   
    const seminar = "INSERT INTO crud.seminar (`nama`, `nim`, `prodi`, `judul`, `file`) VALUES (?)"
    const values = [
        req.body.nama,
        req.body.nim,
        req.body.prodi,
        req.body.judul,
        req.body.file
    ];
    // const values = req.data

    db.query(seminar, [values], (err, data) => {
        if(err) return res.status(500)
        return res.send("Data has been created successfully");
    });
})


//input data sidang
app.post("/sidang", (req, res) => {
   
    const sidang = "INSERT INTO crud.sidang (`nama1`, `nim1`, `prodi1`, `judul1`, `file1`) VALUES (?)"
    const values = [
        req.body.nama1,
        req.body.nim1,
        req.body.prodi1,
        req.body.judul1,
        req.body.file1
    ];
    // const values = req.data

    db.query(sidang, [values], (err, data1) => {
        if(err) return res.status(500)
        return res.send("Data has been created successfully");
    });
})

//menampilkan data pemilihan judul TA
app.get("/pemilihanTA", (req, res) => {
    const q = "SELECT * FROM crud.pemilihan"
    db.query(q, (err, data) => {
        if(err) return res.json(err)
        return res.json(data)
    });
});

//input data pemilihan judul TA
app.post("/pemilihanTA", (req, res) => {
   
    const pemilihan = "INSERT INTO crud.pemilihan (`nama`, `nim`, `prodi`, `judul1`, `judul2`, `judul3`) VALUES (?)"
    const values = [
        req.body.nama,
        req.body.nim,
        req.body.prodi,
        req.body.judul1,
        req.body.judul2,
        req.body.judul3
    ];
    // const values = req.data

    db.query(pemilihan, [values], (err, data) => {
        if(err) return res.status(500)
        return res.send("Data has been created successfully");
    });
})

//delete data pemilihan TA
app.delete("/pemilihanTA/:no", (req, res)=> {
    const pemilihanId = req.params.no;
    const q = "DELETE FROM crud.pemilihan WHERE no = ?"

    db.query(q, [pemilihanId], (err, data) => {
        if(err) return res.json(err)
        return res.json("Book has been deleted successfully");
    });
});

app.put("/pemilihanTA/:no", (req, res)=> {
    const pemilihanId = req.params.no;
    const q = "UPDATE crud.pemilihan SET `nama` = ?, `nim` = ?, `prodi` = ?, `judul1` = ?, `judul2` = ?, `judul3` = ? WHERE no = ?";

    const values= [
        req.body.nama,
        req.body.nim,
        req.body.prodi,
        req.body.judul1,
        req.body.judul2,
        req.body.judul3
    ];

    db.query(q, [...values, pemilihanId], (err, data) => {
        if(err) return res.json(err)
        return res.json("Book has been updated successfully");
    });
});

// app.post("/test", (req, res) => {
//   const q = "SELECT judul, abstrak FROM crud.judul";
//   db.query(q, (err, data) => {
//     if (err) return res.json(err);
    
//     const result = Cek(firstString, data);
//     let sum = 0;
//     for (let i = 0; i < result.length; i++) {
//       sum += (result[i].hasilAbstrak + result[i].hasilJudul);
//     }
//     const avg = sum / (2 * result.length);
    
//     console.log("Rata-rata: " + avg);
//     return res.json("Rata-rata: " + avg);
//   });
// });



app.get("/books", (req, res) => {
    const q = "SELECT * FROM crud.books"
    db.query(q, (err, data) => {
        if(err) return res.json(err)
        return res.json(data)
    });
});

app.post("/books", (req, res) => {
    const q = "INSERT INTO crud.books (`title`, `desc`, `price`, `cover`) VALUES (?)"
    const values = [
        req.body.title,
        req.body.desc,
        req.body.price,
        req.body.cover,
    ];
    // const values = req.data

    db.query(q, [values], (err, data) => {
        if(err) return res.json(err)
        return res.json("Book has been created successfully");
    });
});

app.delete("/books/:id", (req, res)=> {
    const bookId = req.params.id;
    const q = "DELETE FROM crud.books WHERE id = ?"

    db.query(q, [bookId], (err, data) => {
        if(err) return res.json(err)
        return res.json("Book has been deleted successfully");
    });
});

app.put("/books/:id", (req, res)=> {
    const bookId = req.params.id;
    const q = "UPDATE crud.books SET `title` = ?, `desc` = ?, `price` = ?, `cover` = ? WHERE id = ?";

    const values= [
        req.body.title,
        req.body.desc,
        req.body.price,
        req.body.cover,
    ];

    db.query(q, [...values, bookId], (err, data) => {
        if(err) return res.json(err)
        return res.json("Book has been updated successfully");
    });
});

const port = 8800;
app.listen(port, () => {
    console.log("connected to backend!, at PORT: "+port); 
});

export default mysql;