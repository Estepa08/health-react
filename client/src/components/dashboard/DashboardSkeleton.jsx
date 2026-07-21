import { Card, CardContent } from '../ui/card'
import { Skeleton } from '../ui/skeleton'

function DashboardSkeleton() {
  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <Card className="h-full" key={index}>
            <CardContent className="flex flex-col gap-2">
              <Skeleton className="size-12 rounded-xl" />
              <Skeleton className="h-6 w-[60%]" />
              <Skeleton className="h-3.5 w-[80%]" />
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
        {Array.from({ length: 2 }).map((_, index) => (
          <Card className="h-full" key={index}>
            <CardContent className="flex flex-col">
              <Skeleton className="h-4 w-[40%] mb-3" />
              <Skeleton className="theme-chart-area" />
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="mb-4">
        <CardContent className="flex flex-col gap-3">
          {Array.from({ length: 4 }).map((_, index) => (
            <Skeleton key={index} className="h-5 w-full" />
          ))}
        </CardContent>
      </Card>
    </>
  )
}

export default DashboardSkeleton
