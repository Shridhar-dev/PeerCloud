import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Progress } from "../ui/progress"

export function CreditBalance({mu,mp,cp}) {
  // Sample data - in a real app, this would come from an API
  const credits = 850
  const maxCredits = 1000
  const percentage = (credits / maxCredits) * 100

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium">Routing Services</CardTitle>
      </CardHeader>
      <CardContent className="flex justify-between items-center">
        <div>
          <div className="text-2xl font-bold">{mu}MiB</div>
          <p className="text-xs text-muted-foreground">Mem Usage</p>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold">{mp.toPrecision(2)}%</div>
          <p className="text-xs text-muted-foreground">Mem Percentage</p>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold">{cp}%</div>
          <p className="text-xs text-muted-foreground">CPU Percentage</p>
        </div>
      </CardContent>
    </Card>
  )
}