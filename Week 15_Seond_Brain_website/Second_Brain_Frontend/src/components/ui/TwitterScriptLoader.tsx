// TwitterScriptLoader.tsx
import { useEffect } from "react";

export function TwitterScriptLoader() {
    useEffect(() => {
        // Only load once
        if (!(window as any).twttr) {
            const script = document.createElement("script");
            script.src = "https://platform.twitter.com/widgets.js";
            script.async = true;
            document.body.appendChild(script);
        }
    }, []);

    return null;
}
