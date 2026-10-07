import mongoose from "mongoose";

const fakultasSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
        unique: true
    },
},
    {
        timestamps: true,
    },
)

const fakultasModel = mongoose.model('fakultas',fakultasSchema)
export default fakultasModel