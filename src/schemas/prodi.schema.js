import z from "zod";

export const storeProdiSchema = z.object({
    kode: z.string().trim().min(2, "kode prodi minimal 2 karakter"),
    nama_prodi: z.string().trim().min(3, "kode prodi minimal 3 karakter"),
    fakultas_id: z.string().trim().min(24, "kode prodi minimal 24 karakter")
})

export const updateProdiSchema = z.object({
    kode: z.string().trim().min(2, "kode prodi minimal 2 karakter"),
    nama_prodi: z.string().trim().min(3, "kode prodi minimal 3 karakter"),
    fakultas_id: z.string().trim().min(24, "kode prodi minimal 24 karakter")
})