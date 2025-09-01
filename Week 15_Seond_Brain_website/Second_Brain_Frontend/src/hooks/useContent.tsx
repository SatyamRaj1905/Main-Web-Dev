// useContent.tsx

import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";
import axios from "axios";

export function useContent() {
    const [contents, setContents] = useState([]);

    function refresh() { // you can use async await instead of .then and .catch
        const response = axios
            .get(`${BACKEND_URL}/api/v1/content`, {
                headers: {
                    Authorization: localStorage.getItem("token"),
                },
            })
            .then((response) => {
                setContents(response.data.content);
            })
            .catch((err) => {
                console.error("Error fetching content", err);
            });
    }

    // Every 10 second it will fetch the data from backend, done to 
    useEffect(() => {
        refresh()
        let Interval = setInterval(() => {
            refresh()
        }, 10*1000)
        return () => { // implemented cleanup 
            clearInterval(Interval)
        }
    }, []);
return {contents, refresh};
}
