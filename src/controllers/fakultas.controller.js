import fakultasModel from "../model/fakultas.model.js"
import { storeFakultasSchema } from "../schemas/fakultas.schema.js"
import { apiResponse, apiResponseValidation } from "../utils/response.js"

class FakultasController {
    static async index(req, res) {
        const {search, sortBy = "createdAt", sort, page = 1, limit = 10} = req.query

        const currentPage = Math.max(1, parseInt(page, 10) || 1)
        const perPage = Math.max(1, parseInt(limit, 10) || 10)
        const skip = (currentPage - 1) * perPage

        const allowedSortFields = ["name", "createdAt", "updatedAt"]
        const sortField = allowedSortFields.includes(sortBy) ? sortBy : "createdAt"

        const filter = {}
        const sortOption = {
            [sortField]: sort === "desc" ? -1 : 1,
            _id: 1
        }

        if (search) {
            filter.name = {
                $regex: search,
                $options: "i"
            }
        }

        const [listFakultas, totalData] = await Promise.all ([
            fakultasModel.find(filter)
                .select({
                    _id: 1,
                    name: 1
                })
                .sort(sortOption) 
                .skip(skip) 
                .limit(perPage),

            fakultasModel.countDocuments(filter),
        ])

        const totalPages = Math.ceil(totalData/perPage)

        return apiResponse({
            res,
            status: 200,
            message: "List Fakultas",
            data: {
                items: listFakultas,
                pagination: {
                    totalData,
                    totalPages,
                    currentPage,
                    perPage,
                    hasNextPage: currentPage < totalPages,
                    hasPrevPage: currentPage > 1
                }
            }
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