import { Progress } from "@/components/ui/progress"

export const ProbabilityLine = ({
    value,
    label,
}: {
    value: number
    label: string
}) => {
    const percent = Math.round(value * 100)

    return (
        <div className="flex items-center gap-2 text-xs">
            <Progress value={percent} />
            {value.toFixed(2)}
            <span className="w-16 text-right">{label}</span>
        </div>
    )
}
