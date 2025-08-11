import React, { useMemo, useState } from 'react';

const TEAMS = ['Video Team', 'Photo Team', 'VJ Team', 'Lighting Team'];

const ROLES_BY_TEAM = {
  'Video Team': [
    'Operation Director',
    'Operation Assistant',
    'Switcher 1',
    'Switcher 2',
    'C1',
    'C2',
    'C3',
    'C4',
    'C5',
    'C6',
    'Live Comment',
    'Media Maintenance',
  ],
  'Photo Team': ['Lead', 'Assist'],
  'VJ Team': ['Lead', 'Assist', 'Trainee'],
  'Lighting Team': ['Lead', 'Assist', 'Trainee'],
};

const SERVICES_BY_DAY = {
  saturday: [
    { name: 'Fasting Service', times: ['9 AM'] },
    { name: 'The Arrow Service', times: ['2 PM'] },
  ],
  sunday: [
    { name: 'Main Service', times: ['9 AM', '12 PM', '3 PM'] },
    { name: 'Children Service', times: ['9 AM'] },
  ],
};

export default function LeaderDashboard() {
  const [day, setDay] = useState('saturday');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().slice(0, 10));
  const services = SERVICES_BY_DAY[day];
  const [serviceName, setServiceName] = useState(services[0].name);
  const timeOptions = useMemo(
    () => services.find((s) => s.name === serviceName)?.times ?? [],
    [services, serviceName]
  );
  const [time, setTime] = useState(timeOptions[0] ?? '9 AM');
  const [team, setTeam] = useState('Video Team');

  // key: `${selectedDate}|${day}|${serviceName}|${time}|${team}` -> { role: string }
  const [scheduleData, setScheduleData] = useState({});

  const roles = ROLES_BY_TEAM[team];
  const scheduleKey = `${selectedDate}|${day}|${serviceName}|${time}|${team}`;

  // Format selected date for display
  const formattedDate = new Date(selectedDate).toLocaleDateString(undefined, {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  });

  // Ensure structure exists for current selection
  const currentAssignments = scheduleData[scheduleKey] ?? roles.reduce((acc, role) => {
    acc[role] = '';
    return acc;
  }, {});

  const setRoleValue = (role, value) => {
    setScheduleData((prev) => ({
      ...prev,
      [scheduleKey]: {
        ...(prev[scheduleKey] ?? {}),
        [role]: value,
      },
    }));
  };

  const handleChangeDay = (nextDay) => {
    setDay(nextDay);
    const nextServices = SERVICES_BY_DAY[nextDay];
    setServiceName(nextServices[0].name);
    setTime(nextServices[0].times[0]);
  };

  const handleChangeService = (name) => {
    setServiceName(name);
    const svc = services.find((s) => s.name === name);
    setTime(svc?.times?.[0] ?? '');
  };

  const handleSave = () => {
    // For now, just log and alert. Wire to API later.
    const payload = {
      date: selectedDate,
      day,
      service: serviceName,
      time,
      team,
      assignments: scheduleData[scheduleKey] ?? {},
    };
    console.log('Saving schedule:', payload);
    alert('Schedule saved (mock). Check console for payload.');
  };

  const handleClear = () => {
    setScheduleData((prev) => ({ ...prev, [scheduleKey]: roles.reduce((acc, r) => ({ ...acc, [r]: '' }), {}) }));
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold text-center text-white drop-shadow">Leader Schedule Editor</h1>

      {/* Calendar Section */}
      <div className="bg-white/95 border border-[#0B4D8C]/20 rounded-2xl p-5 shadow-lg">
        <div className="text-center mb-4">
          <div className="text-[#0B4D8C] font-medium mb-2">Selected Date</div>
          <div className="text-lg font-semibold text-[#0B192C]">{formattedDate}</div>
        </div>
        <div className="flex justify-center">
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="bg-gray-50 border border-gray-200 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0B4D8C]/40"
          />
        </div>
      </div>

      {/* Controls */}
      <div className="bg-white/95 border border-[#0B4D8C]/20 rounded-2xl p-5 shadow-lg">
        {/* Day toggle */}
        <div className="flex flex-wrap items-center gap-3 justify-center mb-4">
          {(['saturday', 'sunday']).map((d) => (
            <button
              key={d}
              onClick={() => handleChangeDay(d)}
              className={`px-4 py-2 rounded-full shadow text-sm md:text-base whitespace-nowrap ${
                day === d ? 'bg-white text-gray-900' : 'bg-white/80 text-gray-800 hover:bg-white'
              }`}
            >
              {d === 'saturday' ? 'Saturday' : 'Sunday'}
            </button>
          ))}
        </div>

        {/* Service selector */}
        <div className="flex flex-wrap gap-3 justify-center mb-4">
          {services.map((svc) => (
            <button
              key={svc.name}
              onClick={() => handleChangeService(svc.name)}
              className={`px-4 py-2 rounded-full border text-sm md:text-base transition ${
                serviceName === svc.name
                  ? 'bg-[#0B4D8C] text-white border-[#0B4D8C] shadow'
                  : 'bg-[#1693F2]/15 text-[#0B192C] border-[#1693F2]/30 hover:bg-[#1693F2]/25'
              }`}
            >
              {svc.name}
            </button>
          ))}
        </div>

        {/* Time selector */}
        <div className="flex flex-wrap gap-2 justify-center mb-4">
          {timeOptions.map((t) => (
            <button
              key={t}
              onClick={() => setTime(t)}
              className={`px-3 py-1 rounded-full border text-sm transition ${
                time === t
                  ? 'bg-[#0B4D8C] text-white border-[#0B4D8C] shadow'
                  : 'bg-[#0B4D8C]/10 text-[#0B4D8C] border-[#0B4D8C]/30 hover:bg-[#0B4D8C]/20'
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Team selector */}
        <div className="flex flex-wrap gap-3 justify-center">
          {TEAMS.map((t) => (
            <button
              key={t}
              onClick={() => setTeam(t)}
              className={`px-4 py-1 rounded-full border text-sm transition ${
                team === t
                  ? 'bg-[#0B4D8C] text-white border-[#0B4D8C] shadow'
                  : 'bg-[#1693F2]/15 text-[#0B192C] border-[#1693F2]/30 hover:bg-[#1693F2]/25'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Editor Card */}
      <div className="rounded-2xl bg-white/95 border border-[#0B4D8C]/20 shadow-lg p-6">
        <div className="text-center font-semibold text-[#0B192C] mb-1 text-lg">
          {serviceName} • {time} • {team}
        </div>
        <div className="text-center text-[#0B4D8C] mb-6">Enter names for each role</div>

        <div className="grid sm:grid-cols-2 gap-6">
          {roles.map((role) => (
            <div key={role} className="flex items-center gap-3">
              <label className="w-40 text-sm text-gray-700">{role}</label>
              <input
                type="text"
                value={currentAssignments[role] ?? ''}
                onChange={(e) => setRoleValue(role, e.target.value)}
                placeholder="Their Name"
                className="flex-1 bg-gray-50 border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0B4D8C]/40"
              />
            </div>
          ))}
        </div>

        <div className="mt-6 flex flex-wrap gap-3 justify-end">
          <button onClick={handleClear} className="px-4 py-2 rounded-md bg-gray-100 hover:bg-gray-200 text-gray-800">Clear</button>
          <button onClick={handleSave} className="px-4 py-2 rounded-md bg-[#0B4D8C] text-white hover:bg-[#0A3E75]">Save</button>
        </div>
      </div>
    </div>
  );
}
