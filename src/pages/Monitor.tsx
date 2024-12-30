import React from 'react';
import MonitorLogin from '../components/monitor/MonitorLogin';
import EntryDashboard from '../components/monitor/EntryDashboard';
import { useMonitorAuth } from '../hooks/useMonitorAuth';

const Monitor = () => {
  const { isAuthenticated } = useMonitorAuth();
  
  if (!isAuthenticated) {
    return <MonitorLogin />;
  }

  return <EntryDashboard />;
};

export default Monitor;