import type { Request, Response } from 'express';
import type { Event } from "../types/event.js";
import { prisma } from '../lib/db.js';


//1. menampilkan semua event 
export const getAllEvents = async (req: Request, res: Response) => {
    try{
        //ambil data event dari database 
        const allEvents = await prisma.event.findMany({
          include: {
            category: true,
            pembicara: true,
          },
            orderBy: {
                createdAt: "desc"
            }
        });
        //tampilkan semua data
        res.json(allEvents);
    } catch (error) {
        // jika terjadi error, kirim response error
        res.status(500).json({ message: "Terjadi kesalahan saat mengambil data event", error });
    }
};

//2. menyimpan data event baru 
export const createEvent = async (req: Request, res: Response) => {
    try{
        const { 
          name,
          categoryId,
          pembicaraId,
          location,
          dateEvent,
          description,
         } = req.body;

        // validasi jika ada data yang belum diisi 
        if (!name || !categoryId || !pembicaraId || !location || !dateEvent || !description) {
            return res.status(500).json({ message: "Semua field harus diisi" });
        }

        // jika data sudah valid, buat event baru
        const newEvent = await prisma.event.create({
            data: {
                name,
                categoryId: Number(categoryId),
                pembicaraId: Number(pembicaraId),
                location,
                dateEvent: new Date(dateEvent),
                description
            },
        });

        res.status(201).json({
          message: "Event berhasil ditambahkan",
          data: newEvent,
        });
    } catch (error) {
        // jika terjadi error, kirim response error
        res
            .status(500)
            .json({ message: "Terjadi kesalahan saat membuat event", error });
    }
};

//3. menampilkan data event berdasarkan id
export const getEventById = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    const event = await prisma.event.findUnique({
      where: {
        id,
      },
      include: {
        category: true,
        pembicara: true,
      },
    });

    if (!event) {
      return res.status(404).json({
        message: "Event tidak ditemukan",
      });
    }

    res.json(event);
  } catch (error) {
    res.status(500).json({
      message: "Terjadi kesalahan saat mengambil event",
      error,
    });
  }
};

//4. mengupdate data event berdasarkan id
export const updateEventById = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    const {
      name,
      categoryId,
      pembicaraId,
      location,
      dateEvent,
      description,
    } = req.body;

    const event = await prisma.event.findUnique({
      where: {
        id,
      },
    });

    if (!event) {
      return res.status(404).json({
        message: "Event tidak ditemukan",
      });
    }

    const updatedEvent = await prisma.event.update({
      where: {
        id,
      },
      data: {
        name,
        categoryId: Number(categoryId),
        pembicaraId: Number(pembicaraId),
        location,
        dateEvent: new Date(dateEvent),
        description,
      },
    });

    res.json({
      message: "Event berhasil diupdate",
      data: updatedEvent,
    });
  } catch (error) {
    res.status(500).json({
      message: "Terjadi kesalahan saat update event",
      error,
    });
}
};

//5. menghapus data event berdasarkan id
export const deleteEventById = async (
  req: Request,
  res: Response
) => {

  try {

    const id = Number(req.params.id);

    const event = await prisma.event.findUnique({
      where: {
        id,
      },
    });

    if (!event) {
      return res.status(404).json({
        message: "Event tidak ditemukan",
      });
    }

    await prisma.event.delete({
      where: {
        id,
      },
    });

    res.json({
      message: "Event berhasil dihapus",
    });

  } catch (error) {

    res.status(500).json({
      message: "Terjadi kesalahan saat menghapus event",
      error,
    });
  }
};