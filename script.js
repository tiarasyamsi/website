// import express from "express";
// import mysql from "mysql";
// import cors from "cors";

// const app = express()

// const db = mysql.createConnection({
//     host:"localhost",
//     port: "7000",
//     user:"root",
//     password:"1234",
//     // database:"crud",
// });

// app.use(express.json())
// app.use(cors())

var requestOptions = {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json'
  },
};

let mahasiswaList = [
  {
    nama: "Tiara",
    nim: 219441025,
    prodi: "TRO",
    judul1: "SISTEM1",
    judul2: "SISTEM2",
    judul3: "SISTEM3"
  }
];
fetch('http://192.168.43.20:8800/pemilihanTA', requestOptions)
  .then(response => response.json())
  .then(result => { 
    console.log(result);
    // mahasiswaList.push(result);
  })
  .catch(error => {
    console.error('Error:', error);
  });

// Data mahasiswa


// Mendapatkan referensi elemen-elemen HTML
  const form = document.querySelector('.needs-validation');
  const namaInput = document.getElementById('nama');
  const nimInput = document.getElementById('nim');
  const prodiInput = document.getElementById('prodi');
  const judul1Input = document.getElementById('judul1');
  const judul2Input = document.getElementById('judul2');
  const judul3Input = document.getElementById('judul3');
  const tableBody = document.querySelector('#pemilihanList tbody');
  
  // Fungsi untuk memperbarui tampilan tabel
  function updateTable() {
    // Menghapus semua baris pada tabel
    tableBody.innerHTML = '';
  
    // Mengisi tabel dengan data mahasiswa
    mahasiswaList.forEach((mahasiswa, index) => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <th scope="row">${index + 1}</th>
        <td>${mahasiswa.nama}</td>
        <td>${mahasiswa.nim}</td>
        <td>${mahasiswa.prodi}</td>
        <td>${mahasiswa.judul1}</td>
        <td>${mahasiswa.judul2}</td>
        <td>${mahasiswa.judul3}</td>
        <td>
          <a href="#" class="btn btn-warning btn-sm edit">Edit</a>
          <a></a>
          <a href="#" class="btn btn-danger btn-sm delete">Delete</a>
        </td>
      `;
  
      tableBody.appendChild(row);
    });
  }
  
  // Fungsi untuk menambahkan data mahasiswa
  function addMahasiswa() {
    // Membaca nilai input
    const nama = namaInput.value;
    const nim = nimInput.value;
    const prodi = prodiInput.value;
    const judul1 = judul1Input.value;
    const judul2 = judul2Input.value;
    const judul3 = judul3Input.value;
  
    // Membuat objek mahasiswa baru
    const mahasiswa = {
      nama,
      nim,
      prodi,
      judul1,
      judul2,
      judul3
    };
  
    // Menambahkan objek mahasiswa ke dalam array
    mahasiswaList.push(mahasiswa);
  
    // Memperbarui tampilan tabel
    updateTable();
  
    // Mereset nilai input
    form.reset();
  }
  
  // Fungsi untuk menghapus data mahasiswa
  function deleteMahasiswa(index) {
    // Menghapus mahasiswa dari array berdasarkan index
    mahasiswaList.splice(index, 1);
    alert("Apakah data ini akan di hapus?");
  
    // Memperbarui tampilan tabel
    updateTable();
  }
  
  // Fungsi untuk mengubah data mahasiswa
  function editMahasiswa(index) {
    // Mendapatkan data mahasiswa berdasarkan index
    const mahasiswa = mahasiswaList[index];
  
    // Mengisi nilai input dengan data mahasiswa yang akan diubah
    namaInput.value = mahasiswa.nama;
    nimInput.value = mahasiswa.nim;
    prodiInput.value = mahasiswa.prodi;
    judul1Input.value = mahasiswa.judul1;
    judul2Input.value = mahasiswa.judul2;
    judul3Input.value = mahasiswa.judul3;
  
    // Menghapus data mahasiswa yang akan diubah dari array
    mahasiswaList.splice(index, 1);
  
    // Memperbarui tampilan tabel
    updateTable();
  }
  
  // Menambahkan event listener pada form submit
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    if (form.checkValidity()) {
      addMahasiswa();
    }
    form.classList.add('was-validated');
  });
  
  // Menambahkan event listener pada tombol delete
  tableBody.addEventListener('click', function(e) {
    if (e.target.classList.contains('delete')) {
      const rowIndex = e.target.closest('tr').rowIndex - 1;
      deleteMahasiswa(rowIndex);
    }
  });
  
  // Menambahkan event listener pada tombol edit
  tableBody.addEventListener('click', function(e) {
    if (e.target.classList.contains('edit')) {
      const rowIndex = e.target.closest('tr').rowIndex - 1;
      editMahasiswa(rowIndex);
    }
  });
  
  // Memperbarui tampilan tabel saat halaman dimuat
  updateTable();
  


  
