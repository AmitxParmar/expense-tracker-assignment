import mongoose from "mongoose";

const AuditLogSchema = new mongoose.Schema({
    action: {
        type: String,
        required: true
    },
    details: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model('AuditLog', AuditLogSchema);
