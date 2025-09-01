// CreateContentModel.tsx

import { useRef, useState } from "react";
import { CrossIcon } from "../../icons/CrossIcon";
import { Button } from "./Button";
import { BACKEND_URL } from "../../config";
import axios from "axios";

type CreateContentModelProps = {
    open: boolean;
    onClose: () => void;
};

type ContentType = "youtube" | "tweeter";

export function CreateContentModel({ open, onClose }: CreateContentModelProps) {
    const titleRef = useRef<HTMLInputElement>(null);
    const linkRef = useRef<HTMLInputElement>(null);
    const [type, setType] = useState<ContentType>("youtube"); // default youtube content is allowed

    async function addContent() {
        const title = titleRef.current?.value;
        const link = linkRef.current?.value;

        await axios.post(`${BACKEND_URL}/api/v1/content`, {
            link,
            title,
            type,
        });
    }

    return (
        <div>
            {open && ( // if open === true then only render the model
                <div
                    className="w-screen h-screen fixed bg-slate-500/60 top-0 left-0 z-50 flex justify-center items-center"
                    onClick={onClose} // ✅ click outside closes modal
                >
                    <div
                        className="bg-white p-4 rounded-md"
                        onClick={(e) => e.stopPropagation()} // ❌ prevent inside clicks from closing
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
                                    text="Tweeter"
                                    size="sm"
                                    variant={
                                        type === "tweeter"
                                            ? "Primary"
                                            : "Secondary"
                                    }
                                    onClick={() => setType("tweeter")}
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
