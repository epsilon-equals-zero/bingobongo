export interface LoadingSpinnerProps {
    size?: number;
    theme?: "dark" | "light";
}
export function LoadingSpinner({ size = 32, theme = "light" }: LoadingSpinnerProps) {
    return (
        <div className={theme === "dark" ? "text-green-600" : "text-green-400"}>
            <svg x="0px" y="0px" viewBox="0 0 100 100" width={size} height={size}>
                <circle fill="transparent" strokeWidth="8px" stroke="#1f1f1f" opacity="0.1" cx="50" cy="50" r="44" />
                <circle
                    fill="transparent"
                    strokeWidth="8px"
                    stroke="currentColor"
                    strokeDashoffset="276.460"
                    strokeDasharray="80 276.460"
                    cx="50"
                    cy="50"
                    r="44"
                >
                    <animateTransform
                        attributeName="transform"
                        attributeType="XML"
                        type="rotate"
                        dur="1s"
                        repeatCount="indefinite"
                        from="0 50 50"
                        to="360 50 50"
                    />
                </circle>
            </svg>
        </div>
    );
}
