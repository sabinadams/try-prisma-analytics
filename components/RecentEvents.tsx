import { Event } from '@prisma/client'
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { useState } from "react"
import moment from 'moment'
const columnHelper = createColumnHelper<Event>()

const columns = [
  columnHelper.accessor('dateAdded', {
    id: 'dateAdded',
    cell: info => <i>{moment.utc(info.getValue()).format('YYYY/MM/DD')}</i>,
    header: () => <span>Date</span>
  }),
  columnHelper.accessor('template', {
    id: 'template',
    cell: info => <i>{info.getValue()}</i>,
    header: () => <span>Template</span>
  }),
  columnHelper.accessor('pkgMgr', {
    id: 'pkgMgr',
    cell: info => <i>{info.getValue()}</i>,
    header: () => <span>Package Manager</span>
  }),
  columnHelper.accessor('install', {
    id: 'install',
    cell: info => <i>{info.getValue() ? 'Yes' : 'No'}</i>,
    header: () => <span>Auto Install?</span>
  }),
]

export default function RecentEvents({
  events
}: { events: Event[] }) {
  const [data, setData] = useState(() => [...events])

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })
  return <table className="tanstack text-gray-500 ">
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