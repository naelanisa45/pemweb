import type { Request, Response } from "express";
import type {Category} from "../types/category.js";
import { prisma } from '../lib/db.js';

//1. menampilkan data category
export const getAllCategories = async (req: Request, res: Response) => {
    try {
        const allCategories = await prisma.category.findMany({
        orderBy: {
                createdAt: "desc"
            }
        });
        //tampilkan semua data
        res.json(allCategories);
    } catch (error) {
        // jika terjadi error, kirim response error
        res.status(500).json({ message: "Terjadi kesalahan saat mengambil data category", error });
    }
        
    };

//2. menyimpan data category baru
export const createCategory = async (req: Request, res: Response) => {
    try {
        const { name } = req.body;

        if (!name) {
            return res.status(400).json({
                message: "Nama category harus diisi",
            });
        }

        const newCategory = await prisma.category.create({
            data: {
                name,
            },
        });

        res.status(201).json({
            message: "Category berhasil ditambahkan",
            data: newCategory,
        });
    } catch (error) {
        res.status(500).json({
            message: "Terjadi kesalahan saat membuat category",
            error,
        });
    }
};  

//3. menampilkan data category  berdasarkan id
export const getCategoryById= async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);

        const category = await prisma.category.findUnique({
            where: {
                id,
            },
        });

        if (!category) {
            return res.status(404).json({
                message: "Category tidak ditemukan",
            });
        }

        res.json(category);
    } catch (error) {
        res.status(500).json({
            message: "Terjadi kesalahan saat mengambil category",
            error,
        });
    }
};

//4. mengupdate data category  berdasarkan id
export const updateCategoryById= async (req: Request, res: Response) => {
    try {
    const id = Number(req.params.id);

    const { name } = req.body;

    const category = await prisma.category.findUnique({
        where: {
            id,
        },
    });

     if (!category) {
        return res.status(404).json({
            message: "Category tidak ditemukan",
        });
    }

    const updatedCategory = await prisma.category.update({
        where: {
            id,
        },
        data: {
            name,
        },
    });

    res.json({
        message: "Category berhasil diupdate",
        data: updatedCategory,
    });
}catch (error) {
    res.status(500).json({
        message: "Terjadi kesalahan saat update category",
        error,
    });
}
};

//5. menghapus data category  berdasarkan id
export const deleteCategoryById= async (req: Request, res: Response) => {
    try {
    const id = Number(req.params.id);

    const category = await prisma.category.findUnique({
        where: {
            id,
        },
    });

    if (!category) {
        return res.status(404).json({
        message: "Category tidak ditemukan",
    });
    }

    await prisma.category.delete({
        where: {
            id,
        },
    });

    res.json({
        message: "Category berhasil dihapus",
    });
} catch (error) {
    res.status(500).json({
        message: "Terjadi kesalahan saat menghapus category",
        error,
    });
}
};