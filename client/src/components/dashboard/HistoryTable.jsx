import { Badge } from '../ui/badge'
import { Card, CardContent } from '../ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { formatDate } from '../../utils/dashboardStats'
import { findResultLevel } from '../../utils/findResultLevel'

function HistoryTable({ historyRows, resultLevels }) {
  if (historyRows.length === 0) return null

  return (
    <Card className="mb-4">
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Дата</TableHead>
              <TableHead>Тема</TableHead>
              <TableHead>Балл</TableHead>
              <TableHead>Уровень</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {historyRows.map((result) => {
              const level = findResultLevel(resultLevels, result.score)
              return (
                <TableRow key={result.id}>
                  <TableCell>{formatDate(result.createdAt)}</TableCell>
                  <TableCell>{result.themeTitle}</TableCell>
                  <TableCell>{result.score}</TableCell>
                  <TableCell>
                    {level ? (
                      <Badge variant="secondary">
                        {level.emoji ?? ''} {level.title}
                      </Badge>
                    ) : (
                      '—'
                    )}
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

export default HistoryTable
