// useContent.tsx

import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";
import axios from "axios";

export interface Content {
    _id: string;
    title: string;
    link: string;
    type: "twitter" | "youtube";
}

export function useContent() {
    const [contents, setContents] = useState<Content[]>([]);

    function refresh() {
        axios
            .get<{ content: Content[] }>(`${BACKEND_URL}/api/v1/content`, {
                headers: {
                    Authorization: localStorage.getItem("token") || "",
                },
            })
            .then((response) => {
                setContents(response.data.content);
            })
            .catch((err) => {
                console.error("Error fetching content", err);
            });
    }

    useEffect(() => {
        refresh();
        let interval = setInterval(() => {
            refresh();
        }, 10 * 1000);

        return () => clearInterval(interval);
    }, []);

    return { contents, refresh };
}
