let categories = [];
//1. menampilkan data category
export const getAllCategories = (req, res) => {
    res.json(categories);
};
//2. menyimpan data category baru
export const createCategory = (req, res) => {
    try {
        const { nama } = req.body;
        if (!nama) {
            return res.status(500).json({
                message: "Nama category harus diisi",
            });
        }
        const newCategory = {
            id: categories.length + 1,
            nama,
        };
        categories.push(newCategory);
        res.status(201).json({
            message: "Category berhasil ditambahkan",
            data: newCategory,
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Terjadi kesalahan saat membuat category",
            error,
        });
    }
};
//3. menampilkan data category  berdasarkan id
export const getCategoryById = (req, res) => {
    const id = Number(req.params.id);
    const data = categories.find((item) => item.id === id);
    if (!data) {
        return res.status(404).json({
            message: "Category tidak ditemukan",
        });
    }
    res.json(data);
};
//4. mengupdate data category  berdasarkan id
export const updateCategoryById = (req, res) => {
    const id = Number(req.params.id);
    const { nama } = req.body;
    const data = categories.find((item) => item.id === id);
    if (!data) {
        return res.status(404).json({
            message: "Category tidak ditemukan",
        });
    }
    data.nama = nama;
    res.json({
        message: "Category berhasil diupdate",
        data,
    });
};
//5. menghapus data category  berdasarkan id
export const deleteCategoryById = (req, res) => {
    const id = Number(req.params.id);
    const index = categories.findIndex((item) => item.id === id);
    if (index === -1) {
        return res.status(404).json({
            message: "Category tidak ditemukan",
        });
    }
    categories.splice(index, 1);
    res.json({
        message: "Category berhasil dihapus",
    });
};
//# sourceMappingURL=categoryController.js.map