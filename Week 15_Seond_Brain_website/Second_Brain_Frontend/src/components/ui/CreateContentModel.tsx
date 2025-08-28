import { CrossIcon } from "../../icons/CrossIcon";
import { Button } from "./Button";

// We want this to make CONTROLLED COMPONENT
export function CreateContentModel({ open, onClose }) {
    return (
        <div>
            {open && (
                <div className="w-screen h-screen fixed bg-slate-500/60 top-0 left-0 z-50 flex justify-center items-center">
                    <div className="bg-white p-4 rounded-md">
                        <div className="flex justify-end mb-8">
                            <div onClick={onClose}>
                                <CrossIcon size="md" />
                            </div>
                        </div>
                        <div>
                            <Input placeholder={"Title"} />
                            <Input placeholder={"Tags"} />
                            <Input placeholder={"Link"} />
                        </div>
                        <div className="mt-4 flex justify-center">
                            <Button
                                variant="Primary"
                                size="sm"
                                text="Submit"
                            ></Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export function Input({ onChange, placeholder }: { onChange: () => void }) {
    return (
        <div>
            <input
                placeholder={placeholder}
                type="text"
                className="px-4 py-2 border-2 border-slate-200 rounded m-1"
                onChange={onChange}
            />
        </div>
    );
}
