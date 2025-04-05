import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Progress } from "../ui/progress"

export function CreditBalance() {
  // Sample data - in a real app, this would come from an API
  const credits = 850
  const maxCredits = 1000
  const percentage = (credits / maxCredits) * 100

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium">Credit Balance</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{credits}</div>
        <p className="text-xs text-muted-foreground">Available credits</p>
        <div className="mt-3">
          <Progress value={percentage} className="h-2" />
          <p className="mt-1 text-xs text-muted-foreground">{percentage.toFixed(0)}% of maximum balance</p>
        </div>
      </CardContent>
    </Card>
  )
}