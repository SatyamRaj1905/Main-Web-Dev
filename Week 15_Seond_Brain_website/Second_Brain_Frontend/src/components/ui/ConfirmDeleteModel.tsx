// ConfirmDeleteModel.tsx

import { motion } from "framer-motion";

interface ConfirmDeleteModalProps {
    isOpen: boolean;
    onConfirm: () => void;
    onCancel: () => void;
    text?:string
    heading?:string
    confirmLabel?:string 
}

export function ConfirmDeleteModal({
    isOpen,
    onConfirm,
    onCancel,
    text,
    heading,
    confirmLabel
}: ConfirmDeleteModalProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm z-[9999]">
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white p-6 rounded-2xl shadow-xl w-80"
            >
                <h2 className="text-lg font-semibold text-gray-800">
                    {heading}
                </h2>
                <p className="text-sm text-gray-600 mt-2">
                   {text}
                </p>

                <div className="flex justify-end gap-3 mt-6">
                    <button
                        onClick={onCancel}
                        className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600"
                    >
                        {confirmLabel}
                    </button>
                </div>
            </motion.div>
        </div>
    );
}
