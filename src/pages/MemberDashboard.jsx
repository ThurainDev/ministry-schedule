import React, { useState } from 'react'
import ServiceCard from '../components/ServiceCard'

export default function MemberDashboard() {
  const [day, setDay] = useState('saturday');

  // Show today's date
  const formattedDate = new Date().toLocaleDateString(undefined, {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  });

  const saturday = {
    left: [{ name: 'Fasting Service', time: 'Time - 9 AM' }],
    right: [{ name: 'The Arrow Service', time: 'Time - 2 PM' }],
  };

  const sunday = {
    left: [
      { name: 'Main Service', time: ['Time - 9 AM', 'Time - 12 PM', 'Time - 3 PM'] },
    ],
    right: [
      { name: 'Children Service', time: 'Time - 9 AM' }
    ],
  };

  const services = day === 'sunday' ? sunday : saturday;

  const baseBtn = 'px-4 py-2 md:px-6 md:py-2 rounded-full shadow font-medium transition text-sm md:text-base whitespace-nowrap';

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-semibold text-center text-white drop-shadow mb-1">Media Team Schedule</h1>

      <div className="flex justify-center gap-3 md:gap-4">
        <button
          onClick={() => setDay('saturday')}
          className={`${baseBtn} ${
            day === 'saturday' ? 'bg-white text-gray-900' : 'bg-white/80 text-gray-800 hover:bg-white'
          }`}
        >
          Saturday Schedule
        </button>
        <button
          onClick={() => setDay('sunday')}
          className={`${baseBtn} ${
            day === 'sunday' ? 'bg-white text-gray-900' : 'bg-white/80 text-gray-800 hover:bg-white'
          }`}
        >
          Sunday Schedule
        </button>
      </div>

      {/* Date under buttons */}
      <div className="text-center text-white/90">{formattedDate}</div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left column services */}
        <div className="space-y-6">
          {services.left.map((svc, idx) => (
            <ServiceCard key={`L-${idx}`} serviceName={svc.name} timeLabel={svc.time} />
          ))}
        </div>

        {/* Right column services */}
        <div className="space-y-6">
          {services.right.map((svc, idx) => (
            <ServiceCard key={`R-${idx}`} serviceName={svc.name} timeLabel={svc.time} />
          ))}
        </div>
      </div>
    </div>
  )
}
