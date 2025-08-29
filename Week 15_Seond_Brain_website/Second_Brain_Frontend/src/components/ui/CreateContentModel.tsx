// CreateContentModel.tsx

import { CrossIcon } from "../../icons/CrossIcon";
import { Button } from "./Button";

type CreateContentModelProps = {
    open : boolean
    onClose : () => void
}

// We want this to make CONTROLLED COMPONENT
export function CreateContentModel({ open , onClose} : CreateContentModelProps) {
    return (
        <div>
            {open && (
                <div className="w-screen h-screen fixed bg-slate-500/60 top-0 left-0 z-50 flex justify-center items-center">
                    <div className="bg-white p-4 rounded-md">
                        <div className="flex justify-end mb-8">
                            <div className="cursor-pointer" onClick={onClose}>
                                <CrossIcon size="md" />
                            </div>
                        </div>
                        <div>
                            <Input onChange={() => {}} placeholder={"Title"} />
                            <Input onChange={() => {}} placeholder={"Tags"} />
                            <Input onChange={() => {}} placeholder={"Link"} />
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

type InputProps = {
    onChange : () => void
    placeholder : string
}

export function Input({ onChange, placeholder }: InputProps) {
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
