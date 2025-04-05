import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { ArrowDown, ArrowUp, Minus } from "lucide-react"


export function ResourceStats({ title, value, description, trend, className }) {
  return (
    <Card className={className}>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">{description}</p>
        {trend !== 0 && (
          <div className="mt-2 flex items-center text-xs">
            {trend > 0 ? (
              <>
                <ArrowUp className="mr-1 h-3 w-3 text-emerald-500" />
                <span className="text-emerald-500">{trend}% from last week</span>
              </>
            ) : (
              <>
                <ArrowDown className="mr-1 h-3 w-3 text-rose-500" />
                <span className="text-rose-500">{Math.abs(trend)}% from last week</span>
              </>
            )}
          </div>
        )}
        {trend === 0 && (
          <div className="mt-2 flex items-center text-xs">
            <Minus className="mr-1 h-3 w-3 text-muted-foreground" />
            <span className="text-muted-foreground">No change from last week</span>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

