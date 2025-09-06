// Dashboard.tsx

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
import { useNavigate } from "react-router-dom";

export function Dashboard() {
    const [modelOpen, setModelOpen] = useState(false);
    const [deleteId, setDeleteId] = useState<string | null>(null);
    const [filter, setFilter] = useState<"all" | "youtube" | "twitter">("all");
    const [logOut, setLogout] = useState(false);

    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/signin");
    };

    const { contents, refresh } = useContent();

    useEffect(() => {
        refresh();
    }, [modelOpen]);

    const handleDelete = (id: string) => setDeleteId(id);

    const confirmDelete = async () => {
        if (!deleteId) return;
        await axios.delete(`${BACKEND_URL}/api/v1/content`, {
            headers: { Authorization: localStorage.getItem("token") },
            data: { contentId: deleteId },
        });
        setDeleteId(null);
        refresh();
    };

    const filteredContents =
        filter === "all" ? contents : contents.filter((c) => c.type === filter);

    return (
        <div>
            <Sidebar
                currentFilter={filter}
                setFilter={setFilter}
                onLogoutClick={() => setLogout(true)}
            />
            <div className="p-4 ml-64 min-h-screen bg-slate-100">
                <CreateContentModel
                    open={modelOpen}
                    onClose={() => setModelOpen(false)}
                    refresh={refresh}
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
                    {filteredContents.map(({ _id, type, link, title }) => (
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

                <ConfirmDeleteModal
                    isOpen={!!deleteId}
                    onCancel={() => setDeleteId(null)}
                    onConfirm={confirmDelete}
                    text="Are you sure you want to delete this content as this action can't be undone"
                    heading="Delete Content"
                />
                <ConfirmDeleteModal
                    isOpen={logOut}
                    onCancel={() => setLogout(false)}
                    onConfirm={handleLogout}
                    text="Are you sure you want to leave?"
                    heading="Logout"
                    confirmLabel="Exit"
                />
            </div>
        </div>
    );
}
