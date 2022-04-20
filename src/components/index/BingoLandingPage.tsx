import getConfig from "next/config";

const { publicRuntimeConfig: config } = getConfig();

export function BingoLandingPage() {
    return (
        <div>
            <div>
                <p className="text-red-500">{config?.title}</p>
                <input />
                <button>Join</button>
                <hr />
                <button>or create a new Game</button>
            </div>
        </div>
    );
}
