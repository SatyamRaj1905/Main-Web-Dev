// Card.tsx

import { DeleteIcon } from "../../icons/DeleteIcon";
import { ShareIcon } from "../../icons/ShareIcon";
import { TweeterIcon } from "../../icons/TweeterIcon";
import { YoutubeIcon } from "../../icons/YoutubeIcon";

interface CardProps {
    id: string;
    title: string;
    link: string;
    type: "twitter" | "youtube";
    onDelete: (id: string) => void;
}

export function Card({ id, title, link, type, onDelete }: CardProps) {
    return (
        <div className="scale-90 origin-top-left">
            <div className="bg-white p-2 border-1 border-slate-300 rounded-md fit-content shadow-md max-w-72 min-w-30 min-h-48 h-fit mt-8">
                <div className="flex justify-between">
                    <div className="flex items-center gap-2.5">
                        <div className="pr-0.5 text-slate-500">
                            {type === "youtube" ? (
                                <YoutubeIcon size="sm" />
                            ) : (
                                <TweeterIcon size="sm" />
                            )}
                        </div>
                        <div className="text-sm font-medium">{title}</div>
                    </div>
                    <div className="flex items-center gap-2.5 pr-2 text-slate-500">
                        <a
                            href={link}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <ShareIcon size="sm" />
                        </a>
                        <button onClick={() => onDelete(id)}>
                            <DeleteIcon size="sm" />
                        </button>
                    </div>
                </div>

                <div className="pt-4">
                    {type === "youtube" && (
                        <iframe
                            className="w-full"
                            src={link
                                .replace("watch", "embed")
                                .replace("?v=", "/")}
                            title="YouTube video player"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            referrerPolicy="strict-origin-when-cross-origin"
                            allowFullScreen
                        ></iframe>
                    )}
                    {type === "twitter" && (
                        <blockquote className="twitter-tweet w-full scale-90 origin-top-left">
                            <a href={link.replace("x.com", "twitter.com")}></a>
                        </blockquote>
                    )}
                </div>
            </div>
        </div>
    );
}
