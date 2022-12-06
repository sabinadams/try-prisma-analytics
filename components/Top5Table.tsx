import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { useState } from "react"
import { GetTop5TemplateUsage } from '../services/event-service'

const columnHelper = createColumnHelper<{ count: number, template: string }>()

const columns = [
  columnHelper.display({
    id: 'rank',
    cell: info => <i>{info.row.index + 1}</i>,
    header: () => <span>Rank</span>
  }),
  columnHelper.accessor('template', {
    id: 'template',
    cell: info => <i>{info.getValue()}</i>,
    header: () => <span>Template</span>
  }),
  columnHelper.accessor('count', {
    id: 'count',
    cell: info => <i>{info.getValue()}</i>,
    header: () => <span>Uses</span>
  }),
]

export default function Top5Table({
  events
}: { events: Awaited<ReturnType<typeof GetTop5TemplateUsage>> }) {
  const [data, setData] = useState(() => [...events])

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })
  return <table className="tanstack w-full text-gray-500">
    <thead className="text-left bg-gray-500 text-white">
      {table.getHeaderGroups().map(headerGroup => (
        <tr key={headerGroup.id}>
          {headerGroup.headers.map(header => (
            <th key={header.id}>
              {header.isPlaceholder
                ? null
                : flexRender(
                  header.column.columnDef.header,
                  header.getContext()
                )}
            </th>
          ))}
        </tr>
      ))}
    </thead>
    <tbody>
      {table.getRowModel().rows.map(row => (
        <tr key={row.id}>
          {row.getVisibleCells().map(cell => (
            <td key={cell.id}>
              {flexRender(cell.column.columnDef.cell, cell.getContext())}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
    <tfoot>
      {table.getFooterGroups().map(footerGroup => (
        <tr key={footerGroup.id}>
          {footerGroup.headers.map(header => (
            <th key={header.id}>
              {header.isPlaceholder
                ? null
                : flexRender(
                  header.column.columnDef.footer,
                  header.getContext()
                )}
            </th>
          ))}
        </tr>
      ))}
    </tfoot>
  </table>
}