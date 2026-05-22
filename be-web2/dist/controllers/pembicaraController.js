let pembicara = [];
//1. menampilkan semua pembicara
export const getAllPembicara = (req, res) => {
    res.json(pembicara);
};
//2. menyimpan data pembicara baru 
export const createPembicara = (req, res) => {
    try {
        const { nama, role } = req.body;
        // validasi jika ada data yang belum diisi 
        if (!nama || !role) {
            return res.status(500).json({ message: "Nama dan Role harus diisi" });
        }
        // jika data sudah valid, buat event baru
        const newPembicara = {
            id: pembicara.length + 1,
            nama,
            role
        };
        // simpan event baru ke array pembicara
        pembicara.push(newPembicara);
        res.status(201).json(newPembicara);
    }
    catch (error) {
        // jika terjadi error, kirim response error
        res
            .status(500)
            .json({ message: "Terjadi kesalahan saat membuat pembicara", error });
    }
};
//3. menampilkan data pembicara berdasarkan id
export const getPembicaraById = (req, res) => {
    const id = Number(req.params.id);
    const data = pembicara.find((item) => item.id === id);
    if (!data) {
        return res.status(500).json({
            message: "Pembicara tidak ditemukan",
        });
    }
    res.json(data);
};
//4. mengupdate data pembicara berdasarkan id
export const updatePembicaraById = (req, res) => {
    const id = Number(req.params.id);
    const { nama, role } = req.body;
    const data = pembicara.find((item) => item.id === id);
    if (!data) {
        return res.status(500).json({
            message: "Pembicara tidak ditemukan",
        });
    }
    data.nama = nama;
    data.role = role;
    res.json({
        message: "Pembicara berhasil diupdate",
        data,
    });
};
//5. menghapus data pembicara berdasarkan id
export const deletePembicaraById = (req, res) => {
    const id = Number(req.params.id);
    const index = pembicara.findIndex((item) => item.id === id);
    if (index === -1) {
        return res.status(404).json({
            message: "Pembicara tidak ditemukan",
        });
    }
    pembicara.splice(index, 1);
    res.json({
        message: "Pembicara berhasil dihapus",
    });
};
//# sourceMappingURL=pembicaraController.js.map