// CreataContentModel.tsx

import { useRef, useState } from "react";
import { CrossIcon } from "../../icons/CrossIcon";
import { Button } from "./Button";
import { BACKEND_URL } from "../../config";
import axios from "axios";

type CreateContentModelProps = {
    open: boolean;
    onClose: () => void;
    refresh: () => void; // added
};

type ContentType = "youtube" | "twitter";
    
export function CreateContentModel({
    open,
    onClose,
    refresh,
}: CreateContentModelProps) {
    const titleRef = useRef<HTMLInputElement>(null);
    const linkRef = useRef<HTMLInputElement>(null);
    const [type, setType] = useState<ContentType>("youtube"); // default youtube

    async function addContent() {
        const title = titleRef.current?.value;
        const link = linkRef.current?.value;

        if (!title || !link) return alert("Please fill all fields");
        const token = localStorage.getItem("token");
        if (!token) return alert("You must be logged in to add content");

        await axios.post(
            `${BACKEND_URL}/api/v1/content`,
            {
                link,
                title,
                type,
            },
            {
                headers: { Authorization: token },
            }
        );

        onClose(); // close modal
        refresh(); // refresh dashboard content
    }

    return (
        <div>
            {open && (
                <div
                    className="w-screen h-screen fixed bg-slate-500/60 top-0 left-0 z-50 flex justify-center items-center"
                    onClick={onClose}
                >
                    <div
                        className="bg-white p-4 rounded-md"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex justify-end mb-8">
                            <div className="cursor-pointer" onClick={onClose}>
                                <CrossIcon size="md" />
                            </div>
                        </div>
                        <div>
                            <Input reference={titleRef} placeholder="Title" />
                            <Input reference={linkRef} placeholder="Link" />
                        </div>
                        <div>
                            <h1 className="mt-2">Type of content</h1>
                            <div className="flex gap-2 p-4 justify-center items-center">
                                <Button
                                    text="Youtube"
                                    size="sm"
                                    variant={
                                        type === "youtube"
                                            ? "Primary"
                                            : "Secondary"
                                    }
                                    onClick={() => setType("youtube")}
                                />
                                <Button
                                    text="Twitter"
                                    size="sm"
                                    variant={
                                        type === "twitter"
                                            ? "Primary"
                                            : "Secondary"
                                    }
                                    onClick={() => setType("twitter")}
                                />
                            </div>
                        </div>
                        <div className="mt-4 flex justify-center">
                            <Button
                                onClick={addContent}
                                variant="Primary"
                                size="sm"
                                text="Submit"
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

type InputProps = {
    reference: React.RefObject<HTMLInputElement | null>;
    placeholder: string;
};

export function Input({ reference, placeholder }: InputProps) {
    return (
        <div>
            <input
                placeholder={placeholder}
                ref={reference}
                type="text"
                className="px-4 py-2 border-2 border-slate-200 rounded m-1 w-[420px] 
                focus:outline-none focus:border-purple-600 focus:border-3 
                transition-colors duration-200"
            />
        </div>
    );
}
