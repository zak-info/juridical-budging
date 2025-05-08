import mongoose, { Schema } from "mongoose";

const schama = new Schema(
    {
        
        status: {
            type: String
        },
        fullname: {
            type: String
        },
        email: {
            type: String
        },
        fonction: {
            type: String
        },
        type: {
            type: String
        },
        data: {
            type: Object,
        },

    },
    {
        timestamps: true,
    }
);
// schama.index({ tableId: 1, order: 1 }, { unique: true });
// schama.index({ phone: 1 }, { unique: true });
const Condidat = mongoose.models.Condidat || mongoose.model("Condidat", schama);

export default Condidat;