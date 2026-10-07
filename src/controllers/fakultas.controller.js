import fakultasModel from "../model/fakultas.model.js"
import { storeFakultasSchema } from "../schemas/fakultas.schema.js"
import { apiResponse, apiResponseValidation } from "../utils/response.js"

class FakultasController {
    static async index(req, res) {
        const listFakultas = await fakultasModel.find()
        return apiResponse({
            res,
            status: 200,
            message: "List Fakultas",
            data: listFakultas,
        })
    }

    static async show(req, res) {
        const fakultasId = req.params.id

        const fakultas = await fakultasModel.findById(fakultasId)

        return apiResponse({
            res,
            status: 200,
            message: "Detail Fakultas",
            data: fakultas
        })
    }
    static async store(req, res) {
        const result = storeFakultasSchema.safeParse(req.body)

        if (!result.success) {
            return apiResponseValidation({
                res,
                errors: result.error
            })
        }

        const { name } = result.data

        const fakultas = await fakultasModel.create({
            name: name
        })

        return apiResponse({
            res,
            status: 200,
            message: 'Fakultas berhasil dibuat',
            data: fakultas
        })
    }
    static async update(req, res) {

        const result = storeFakultasSchema.safeParse(req.body)

        if (!result.success) {
            return apiResponseValidation({
                res,
                errors: result.error
            })
        }

        const fakultasId = req.params.id

        const { name } = result.data
        
        const exists = await fakultasModel.exists({ _id: fakultasId })

        if (!exists) {
            return apiResponse({ res, status: 404, message: 'Fakultas tidak ditemukan' })
        }
        const updateFakultas = await fakultasModel.findOneAndUpdate(
            { _id: fakultasId },
            { name },
            { new: true }
        )
        return apiResponse({ res, status: 200, data: updateFakultas })
    }
    static async delete(req, res) {
        const fakultasId = req.params.id
        const exists = await fakultasModel.exists({ _id: fakultasId })
        if (!exists) {
            return apiResponse({ res, status: 404, message: 'Fakultas tidak ditemukan' })
        }
        await fakultasModel.findOneAndDelete({ _id: fakultasId })
        return apiResponse({ res, status: 200, message: 'Fakultas berhasil dihapus', data: null })
    }
}

export default FakultasController