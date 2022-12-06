import prisma from '../lib/prisma'
import { BaseDataEntry } from 'react-minimal-pie-chart/types/commonTypes'

export async function GetPkgMgrUsage(): Promise<BaseDataEntry[]> {
  const data = await prisma.event.groupBy({
    by: ['pkgMgr'],
    _count: {
      _all: true
    }
  })

  const total = data.reduce((acc, curr) => curr._count._all + acc, 0)

  return data.map(record => ({
    title: `${record.pkgMgr} (${Math.round(record._count._all / total * 100)}%) (${record._count._all})`,
    value: record._count._all,
    color: `hsl(${Math.floor(Math.random() * 360)}, 100%, 80%)`,
  }))
}

export async function GetAutoInstallUsage(): Promise<{ total: number, percentage: number }> {
  const totalCount = await prisma.event.count()
  const yesCount = await prisma.event.count({
    where: { install: true }
  })

  return {
    total: totalCount,
    percentage: Math.round(yesCount / totalCount * 100)
  }
}

export async function GetTop5TemplateUsage() {
  const data = await prisma.event.groupBy({
    by: ['template'],
    _count: {
      template: true
    },
    orderBy: {
      _count: {
        id: 'desc'
      }
    },
    take: 5,

  })

  return data.map(row => ({
    template: row.template,
    count: row._count.template
  }))
}

export async function GetRecentEvents() {
  const data = await prisma.event.findMany({
    orderBy: {
      dateAdded: 'desc'
    },
    take: 100
  })

  return data.map(row => ({
    ...row,
    dateAdded: row.dateAdded.toDateString()
  }))
}