import mongoose from "mongoose";

const Schema = new mongoose.Schema(
    {
        kode: {
            type: String,
            required: true,
            unique: true
        },
        nama_prodi: {
            type: String,
            required: true,
            unique: true
        },
        fakultas:  {
            type : mongoose.Schema.ObjectId,
            ref : "fakultas",
            required : true
        }
    },
    {
        timestamps : true
    }
)

const ProdiModel = mongoose.model("prodi", Schema)
export default ProdiModel