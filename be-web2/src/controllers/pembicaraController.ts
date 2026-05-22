import type { Request, Response } from 'express';
import type { Pembicara } from "../types/pembicara.js";
import { prisma } from '../lib/db.js';


//1. menampilkan semua pembicara
export const getAllPembicara = async (req: Request, res: Response) => {
   try {
    const allPembicara = await prisma.pembicara.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    res.json(allPembicara);
   }catch (error) {
    res.status(500).json({
        message: "Terjadi kesalahan saat mengambil data pembicara",
        error,
    });
   }
};

//2. menyimpan data pembicara baru 
export const createPembicara = async(req: Request, res: Response) => {
    try{
        const { name, role } = req.body;

        // validasi jika ada data yang belum diisi 
        if (!name || !role ) {
            return res.status(500).json({ 
                message: "Semua field harus diisi" 
            });
        }

        // jika data sudah valid, buat event baru
        const newPembicara= await prisma.pembicara.create({
            data: {
                name,
                role,
            },
        });

        res.status(201).json({
            message: "Pembicara berhasil ditambahkan",
            data: newPembicara,
        });
    } catch (error) {
        // jika terjadi error, kirim response error
        res
            .status(500)
            .json({ message: "Terjadi kesalahan saat membuat pembicara", error });
    }
};

//3. menampilkan data pembicara berdasarkan id
export const getPembicaraById = async (req: Request, res: Response) => {
    try{
        const id = Number(req.params.id);

        const pembicara = await prisma.pembicara.findUnique({
            where: {
                id,
            },
        });

    if (!pembicara) {
        return res.status(500).json({
            message: "Pembicara tidak ditemukan",
        });
    }

    res.json(pembicara);
} catch (error) {
    res.status(500).json({
        message: "Terjadi kesalahan saat mengambil pembicara",
        error,
    });
}
};

//4. mengupdate data pembicara berdasarkan id
export const updatePembicaraById = async (req: Request, res: Response) => {
    try {
       const id = Number(req.params.id);

       const { name, role } = req.body;

        const pembicara = await prisma.pembicara.findUnique({
            where: {
                id,
            },
        });

    if (!pembicara) {
        return res.status(500).json({
            message: "Pembicara tidak ditemukan",
        });
    }

    const updatedPembicara = await prisma.pembicara.update({
        where: {
            id,
        },
        data:{
        name,
        role,
        },
    });

    res.json({
        message: "Pembicara berhasil diupdate",
        data: updatedPembicara,
    });
}catch(error) {
    res.status(500).json({
        message: "Terjadi kesalahan saat update pembicara",
        error,
    });
}
};

//5. menghapus data pembicara berdasarkan id
export const deletePembicaraById = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);

        const pembicara = await prisma.pembicara.findUnique({
            where: {
                id,
            },
        });
    

    if (!pembicara) {
        return res.status(404).json({
            message: "Pembicara tidak ditemukan",
        });
    }

    await prisma.pembicara.delete({
        where: {
            id,
        },
    });

    res.json({
        message: "Pembicara berhasil dihapus",
    });
} catch (error) {
    res.status(500).json({
        message: "Terjadi kesalahan saat menghapus pembicara",
        error,
    });
}
};