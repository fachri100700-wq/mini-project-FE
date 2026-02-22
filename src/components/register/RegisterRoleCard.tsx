import type { IconType } from "react-icons";

type RoleCardProps = {
    icon: IconType;
    title: string;
    description: string;
    selected: boolean;
    onClick: () => void;
};

export default function RoleCard({
    icon: Icon,
    title,
    description,
    selected,
    onClick,
}: RoleCardProps) {
    return (
        <button
        type="button"
        onClick={onClick}
        className={`
            rounded-xl border p-4 text-center transition-all duration-200
            ${selected
            ? "border-primary bg-primary/10 shadow-md"
            : "border-base-300 hover:border-primary/50 hover:bg-base-200"}
        `}
        >
        <div className="flex items-center justify-center">
        <Icon className="text-3xl text-primary" />
        </div>
        <div className="mt-2 font-semibold">{title}</div>
        <p className="text-sm text-base-content/70">
            {description}
        </p>
        </button>
    )
}