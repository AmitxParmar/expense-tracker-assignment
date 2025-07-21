import AuditLog from "../models/AuditLog";

// Helper: log audit actions
export const logAudit = async ({
    action,
    details,
    user,
}: {
    action: string;
    details: string;
    user: string;
}) => {
    try {
        await AuditLog.create({
            action,
            details,
            user,
        });
    } catch (err) {
        // Optionally log error, but don't block main flow
        console.error("Audit log error:", err);
    }
};
