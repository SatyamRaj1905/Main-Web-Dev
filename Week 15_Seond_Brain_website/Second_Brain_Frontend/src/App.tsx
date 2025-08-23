import "./App.css";
import { Button } from "./components/ui/Button";
import { PlusIcon } from "./icons/PlusIcon";
import { ShareIcon } from "./icons/ShareIcon";

function App() {
    return (
        <>
            <Button
                startIcon={<PlusIcon size="md" />}
                variant="Primary"
                size="sm"
                onClick={() => {}}
                text={"Add Content"}
            />
            <Button
                startIcon={
                    <div className="pr-0.5">
                        <ShareIcon size="md" />
                    </div>
                }
                variant="Secondary"
                size="sm"
                onClick={() => {}}
                text={"Share Brain"}
            />
        </>
    );
}

export default App;
