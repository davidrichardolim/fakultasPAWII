import mongoose from "mongoose"
import fakultasModel from "../model/fakultas.model.js"
import { storeProdiSchema } from "../schemas/prodi.schema.js"
import { apiResponse, apiResponseValidation } from "../utils/response.js"
import ProdiModel from "../model/prodi.model.js"

class ProdiController {
    static async index(req, res) {
        const listProdi = await ProdiModel.find().populate("fakultas")

        return apiResponse({
            res,
            status : 200,
            message: "List Prodi",
            data: listProdi
        })
    }

    static async show(req, res) { }

    static async store(req, res) {
        const result = storeProdiSchema.safeParse(req.body)

        if (!result.success) {
            return apiResponseValidation({
                res,
                errors : result.error
            })
        }

        const {kode, nama_prodi, fakultas_id} = result.data

        const isExists = await fakultasModel.exists({
            _id : new mongoose.Types.ObjectId(fakultas_id)
        })

        if (!isExists) {
            return apiResponse({
                res,
                status: 404,
                message: "fakultas tidak ada"
            })
        }

        const newProdi = await ProdiModel.create({
            kode,
            nama_prodi,
            fakultas : fakultas_id
        })

        return apiResponse({
            res,
            status: 201,
            message: "Prodi berhasil dibuat",
            data: newProdi
        })
    }

    static async update(req, res) { }

    static async delete(req, res) { }
}

export default ProdiController