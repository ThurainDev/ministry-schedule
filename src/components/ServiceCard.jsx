import React, { useState } from 'react';

export default function ServiceCard({ serviceName, timeLabel }) {
  const [selectedTeam, setSelectedTeam] = useState(null);
  const teams = ['Video Team', 'Photo Team', 'VJ Team', 'Lighting Team'];

  const effectiveTeam = selectedTeam ?? 'Video Team';
  const displayTitle = selectedTeam
    ? `${serviceName} ${selectedTeam} Schedule`
    : `${serviceName}`;

  const rolesByTeam = {
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

  const roles = rolesByTeam[effectiveTeam];

  return (
    <div className="rounded-2xl bg-white/95 border border-[#0B4D8C]/20 shadow-lg p-6 backdrop-blur-sm">
      <div className="flex flex-wrap gap-3 mb-5">
        {teams.map((team) => {
          const isActive = selectedTeam === team;
          return (
            <span
              key={team}
              role="button"
              tabIndex={0}
              onClick={() => setSelectedTeam(isActive ? null : team)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') setSelectedTeam(isActive ? null : team);
              }}
              aria-pressed={isActive}
              className={
                `inline-block cursor-pointer select-none text-sm px-4 py-1 rounded-full border transition-colors ` +
                (isActive
                  ? 'bg-[#0B4D8C] text-white border-[#0B4D8C] shadow'
                  : 'bg-[#1693F2]/15 text-[#0B192C] border-[#1693F2]/30 hover:bg-[#1693F2]/25')
              }
            >
              {team}
            </span>
          );
        })}
      </div>

      <div className="rounded-xl p-6 bg-[#0B4D8C]/5 border border-[#0B4D8C]/20">
        <div className="text-center font-semibold text-[#0B192C] mb-2 text-lg">
          {displayTitle}
        </div>
        <div className="text-center font-medium text-[#0B4D8C] mb-6">
          {timeLabel}
        </div>
        <div className="grid grid-cols-2 gap-4 text-sm text-gray-800">
          <div className="space-y-2">
            {roles.map((role) => (
              <div key={role}>{role}</div>
            ))}
          </div>
          <div className="space-y-2 text-[#0B4D8C]">
            {roles.map((role, idx) => (
              <div key={idx}>Their Name</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}