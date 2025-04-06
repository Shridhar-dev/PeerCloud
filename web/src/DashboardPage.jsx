import React, { useEffect, useState } from 'react'
import { DashboardHeader } from "./components/dashboard/dashboard-header"
import { DashboardShell } from "./components/dashboard/dashboard-shell"
import { Overview } from "./components/dashboard/overview"
import { RecentActivity } from "./components/dashboard/recent-activity"
import { ResourceStats } from "./components/dashboard/resource-stats"
import { CreditBalance } from "./components/dashboard/credit-balance"
import Wrapper from './components/Wrapper'

export const DashboardPage = ({user}) => {
  const [containers, setContainers] = useState([]);
  const [misc, setMisc] = useState([]);
  const [micSummary, setMicSummary] = useState({ totalCpu: 0, totalMemUsage: 0, totalMemPerc: 0 });

  const getAnalysis = async () => {
    try {
      const api = localStorage.getItem('terminal-url');
      const response = await fetch(`${api}/usage`, {
        headers: {
          'ngrok-skip-browser-warning': 'true',
        },
      });
      const data = await response.json();

      // Filter data into containers and mic
      const containerItems = data.filter(item => item.name.toLowerCase().includes('container'));
      const micItems = data.filter(item => !item.name.toLowerCase().includes('container'));

      setContainers(containerItems);
      setMisc(micItems);

      // Calculate summary for mic items
      const totalCpu = micItems.reduce((sum, item) => sum + parseFloat(item.cpuPerc.replace('%', '')), 0);
      const totalMemUsage = micItems.reduce((sum, item) => sum + parseFloat(item.memUsage.replace('MiB', '')), 0);
      const totalMemPerc = micItems.reduce((sum, item) => sum + parseFloat(item.memPerc.replace('GiB', '')), 0);

      setMicSummary({ totalCpu, totalMemUsage, totalMemPerc });

      console.log('Containers:', containerItems);
      console.log('Mic:', micItems);
      console.log('Mic Summary:', { totalCpu, totalMemUsage, totalMemPerc });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    getAnalysis();
  }, []);

  return (
    // <div>{user.identities.username.id}</div>
    <Wrapper>

    <DashboardShell>
      <DashboardHeader heading="Dashboard" text="Monitor your compute sharing activity and credit balance." />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <CreditBalance mu={micSummary.totalMemUsage} mp={micSummary.totalMemPerc} cp={micSummary.totalCpu}/>
        {
          containers.map((container, index) => (
            <ResourceStats
              key={index}
              title={container.name}
              value={container.memUsage}
              description={`CPU: ${container.cpuPerc} | Memory: ${container.memPerc}`}
              trend={+15}
            />
          ))
        }
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Overview className="col-span-4" />
        <RecentActivity className="col-span-3" />
      </div>
    </DashboardShell>
    </Wrapper>
  )
}
