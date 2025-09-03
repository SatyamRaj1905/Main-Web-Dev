import "../../App.css";
import { Button } from "../ui/Button";
import { PlusIcon } from "../../icons/PlusIcon";
import { ShareIcon } from "../../icons/ShareIcon";
import { Card } from "../ui/Card";
import { CreateContentModel } from "../ui/CreateContentModel";
import { ConfirmDeleteModal } from "../ui/ConfirmDeleteModel";
import { useEffect, useState } from "react";
import { Sidebar } from "../ui/Sidebar";
import { useContent } from "../../hooks/useContent";
import { BACKEND_URL } from "../../config";
import axios from "axios";

export function Dashboard() {
    const [modelOpen, setModelOpen] = useState(false);
    const [deleteId, setDeleteId] = useState<string | null>(null);

    const { contents, refresh } = useContent();

    // Refresh content whenever the modal closes
    useEffect(() => {
        refresh();
    }, [modelOpen]);

    // Called when user clicks delete button on Card
    const handleDelete = (id: string) => {
        setDeleteId(id); // open confirmation modal
    };

    // Called when user confirms delete in modal
    const confirmDelete = async () => {
        if (!deleteId) return;
        await axios.delete(`${BACKEND_URL}/api/v1/content`, {
            headers: { Authorization: localStorage.getItem("token") },
            data: { contentId: deleteId },
        });
        setDeleteId(null); // close modal
        refresh(); // refresh content
    };

    return (
        <div>
            <Sidebar />
            <div className="p-4 ml-64 min-h-screen bg-slate-100">
                <CreateContentModel
                    open={modelOpen}
                    onClose={() => setModelOpen(false)}
                />

                <div className="flex justify-end gap-2">
                    <Button
                        startIcon={<PlusIcon size="sm" />}
                        variant="Primary"
                        size="sm"
                        onClick={() => setModelOpen(true)}
                        text={"Add Content"}
                    />
                    <Button
                        startIcon={<ShareIcon size="sm" />}
                        variant="Secondary"
                        size="sm"
                        text={"Share Brain"}
                        onClick={async () => {
                            const response = await axios.post(
                                `${BACKEND_URL}/api/v1/brain/share`,
                                { share: true },
                                {
                                    headers: {
                                        Authorization:
                                            localStorage.getItem("token"),
                                    },
                                }
                            );
                            const shareUrl = `http://localhost:5173/share/${response.data.hash}`;
                            alert(shareUrl);
                        }}
                    />
                </div>

                <div className="flex gap-1 flex-wrap">
                    {contents.map(({ _id, type, link, title }) => (
                        <Card
                            key={_id}
                            id={_id}
                            type={type}
                            link={link}
                            title={title}
                            onDelete={handleDelete}
                        />
                    ))}
                </div>

                {/* Delete Confirmation Modal */}
                <ConfirmDeleteModal
                    isOpen={!!deleteId}
                    onCancel={() => setDeleteId(null)}
                    onConfirm={confirmDelete}
                />
            </div>
        </div>
    );
}
