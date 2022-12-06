import { useState } from 'react'
import { GetServerSideProps } from 'next'
import { PieChart } from 'react-minimal-pie-chart';
import RecentEvents from '../components/RecentEvents';
import Top5Table from '../components/Top5Table'
import { GetPkgMgrUsage, GetAutoInstallUsage, GetTop5TemplateUsage, GetRecentEvents } from '../services/event-service'
import Header from '../components/Header'

import { useRouter } from 'next/router';

/*
  - Top (x) templates with their names and columns
  - List of all events
  - % of users who NPM install
  - Pie graph of package managers
*/

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  let events;

  switch (query.view) {
    case 'pkgmgr':
      events = await GetPkgMgrUsage()
      break;
    case 'autoinstall':
      events = await GetAutoInstallUsage()
      break;
    case 'toptemplates':
      events = await GetTop5TemplateUsage()
      break;
    case 'data':
      events = await GetRecentEvents()
      break;
    default:
      events = await GetPkgMgrUsage()
  }

  return {
    props: { events, view: query.view || 'pkgmgr' }
  }
}

type View = 'pkgmgr' | 'autoinstall' | 'toptemplates' | 'data'
type Props = {
  events: any,
  view: View
}

export default function Home({
  events,
  view
}: Props) {
  const router = useRouter();
  const [currView, setView] = useState(view || 'data')
  const refreshData = (newView: View) => {
    setView(newView)
    router.replace(router.asPath.split('?')[0] + `?view=${newView}`);
  }

  return <div className="flex flex-col h-full overflow-x-hidden">
    <Header />
    <div className="p-4 flex-1">
      <select value={currView} onChange={(e) => refreshData(e.target.value as View)} className="w-full p-2 bg-gray-200 rounded-xl border-2 border-gray-500 text-gray-500">
        <option value="pkgmgr">Package Manager Trends</option>
        <option value="autoinstall">% of users who auto NPM install</option>
        <option value="toptemplates">Top 5 templates</option>
        <option value="data">100 most recent events</option>
      </select>

      <div className="w-full h-full overflow-x-scroll grid place-items-center">
        {
          view === 'pkgmgr' && <PieChart
            className='w-80 h-80 m-auto'
            label={({ dataEntry }) => dataEntry.title}
            data={events}
            labelStyle={{
              fontSize: 5
            }}
            animate={true}
          />
        }
        {
          view === 'autoinstall' && <div className="px-8 text-center">
            <h2 className="font-extrabold text-gray-500 text-8xl">{events.percentage}%</h2>
            <p className="text-sm italic text-gray-400">of the {events.total} usages automatically installed node_modules</p>
          </div>
        }
        {
          view === 'data' && <RecentEvents events={events} />
        }
        {
          view === 'toptemplates' && <Top5Table events={events} />
        }
      </div>
    </div>
  </div >
}
