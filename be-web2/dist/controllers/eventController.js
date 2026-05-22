import { prisma } from "../lib/db.js";
let events = [];
//1. menampilkan semua event 
export const getAllEvents = async (req, res) => {
    try {
        //ambil dari database
        const allEvents = await prisma.event.findMany({
            orderBy: {
                createdAt: "dest",
            },
        });
        //tampilkan semua data
        res.json(allEvents);
    }
    catch (error) {
        //jika gagal
        res.status(500).json({
            message: "Gagal mengambil data event",
            error,
        });
    }
};
//2. menyimpan data event baru 
export const createEvent = async (req, res) => {
    try {
        const { name, categoryId, location, dateEvent, description } = req.body;
        // validasi jika ada data yang belum diisi 
        if (!name || !categoryId || !location || !dateEvent || !description) {
            return res.status(500).json({ message: "Nama, tanggal, dan lokasi harus diisi" });
        }
        // jika data sudah valid, buat event baru
        const newEvent = await prisma.event.create({
            data: {
                name,
                categoryId,
                location,
                dateEvent: new Date(dateEvent),
                description
            },
        });
        res.status(201).json(newEvent);
    }
    catch (error) {
        // jika terjadi error, kirim response error
        res
            .status(500)
            .json({ message: "Terjadi kesalahan saat membuat event", error });
    }
};
//3. menampilkan data event berdasarkan id
export const getEventById = (req, res) => {
    const id = Number(req.params.id);
    const data = events.find((item) => item.id === id);
    if (!data) {
        return res.status(500).json({
            message: "Event tidak ditemukan",
        });
    }
    res.json(data);
};
//4. mengupdate data event berdasarkan id
export const updateEventById = (req, res) => {
    const id = Number(req.params.id);
    const { nama, tanggal, lokasi } = req.body;
    const data = events.find((item) => item.id === id);
    if (!data) {
        return res.status(500).json({
            message: "Event tidak ditemukan",
        });
    }
    data.nama = nama;
    data.tanggal = new Date(tanggal);
    data.lokasi = lokasi;
    res.json({
        message: "Event berhasil diupdate",
        data,
    });
};
//5. menghapus data event berdasarkan id
export const deleteEventById = (req, res) => {
    const id = Number(req.params.id);
    const index = events.findIndex((item) => item.id === id);
    if (index === -1) {
        return res.status(500).json({
            message: "Event tidak ditemukan",
        });
    }
    events.splice(index, 1);
    res.json({
        message: "Event berhasil dihapus",
    });
};
//# sourceMappingURL=eventController.js.map