import React, { useState, useEffect } from 'react';

// Mock data structure - replace with real API calls later
const MOCK_SCHEDULES = [
  {
    id: '1',
    date: '2024-01-15',
    day: 'saturday',
    service: 'Fasting Service',
    time: '9 AM',
    team: 'Video Team',
    assignments: {
      'Operation Director': 'John Doe',
      'Operation Assistant': 'Jane Smith',
      'Switcher 1': 'Mike Johnson',
      'Switcher 2': 'Sarah Wilson',
      'C1': 'Tom Brown',
      'C2': 'Lisa Davis',
      'C3': 'David Miller',
      'C4': 'Emma Garcia',
      'C5': 'James Rodriguez',
      'C6': 'Maria Martinez',
      'Live Comment': 'Alex Thompson',
      'Media Maintenance': 'Chris Lee'
    }
  },
  {
    id: '2',
    date: '2024-01-15',
    day: 'saturday',
    service: 'The Arrow Service',
    time: '2 PM',
    team: 'Photo Team',
    assignments: {
      'Lead': 'Sarah Wilson',
      'Assist': 'Mike Johnson'
    }
  },
  {
    id: '3',
    date: '2024-01-16',
    day: 'sunday',
    service: 'Main Service',
    time: '9 AM',
    team: 'VJ Team',
    assignments: {
      'Lead': 'David Miller',
      'Assist': 'Emma Garcia',
      'Trainee': 'James Rodriguez'
    }
  }
];

export default function AllSchedule() {
  const [schedules, setSchedules] = useState(MOCK_SCHEDULES);
  const [filterDate, setFilterDate] = useState('');
  const [filterDay, setFilterDay] = useState('');
  const [filterService, setFilterService] = useState('');
  const [filterTeam, setFilterTeam] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});

  // Filter schedules based on selected filters
  const filteredSchedules = schedules.filter(schedule => {
    if (filterDate && schedule.date !== filterDate) return false;
    if (filterDay && schedule.day !== filterDay) return false;
    if (filterService && schedule.service !== filterService) return false;
    if (filterTeam && schedule.team !== filterTeam) return false;
    return true;
  });

  // Get unique values for filter dropdowns
  const uniqueDates = [...new Set(schedules.map(s => s.date))].sort();
  const uniqueServices = [...new Set(schedules.map(s => s.service))];
  const uniqueTeams = [...new Set(schedules.map(s => s.team))];

  const handleEdit = (schedule) => {
    setEditingId(schedule.id);
    setEditForm({ ...schedule });
  };

  const handleSave = (id) => {
    setSchedules(prev => prev.map(s => s.id === id ? editForm : s));
    setEditingId(null);
    setEditForm({});
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditForm({});
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this schedule?')) {
      setSchedules(prev => prev.filter(s => s.id !== id));
    }
  };

  const handleInputChange = (field, value) => {
    setEditForm(prev => ({ ...prev, [field]: value }));
  };

  const handleAssignmentChange = (role, value) => {
    setEditForm(prev => ({
      ...prev,
      assignments: {
        ...prev.assignments,
        [role]: value
      }
    }));
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString(undefined, {
      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
    });
  };

  const getDayLabel = (day) => day === 'saturday' ? 'Saturday' : 'Sunday';

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold text-center text-white drop-shadow">All Schedules</h1>

      {/* Filters */}
      <div className="bg-white/95 border border-[#0B4D8C]/20 rounded-2xl p-5 shadow-lg">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
            <select
              value={filterDate}
              onChange={(e) => setFilterDate(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0B4D8C]/40"
            >
              <option value="">All Dates</option>
              {uniqueDates.map(date => (
                <option key={date} value={date}>{formatDate(date)}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Day</label>
            <select
              value={filterDay}
              onChange={(e) => setFilterDay(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0B4D8C]/40"
            >
              <option value="">All Days</option>
              <option value="saturday">Saturday</option>
              <option value="sunday">Sunday</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Service</label>
            <select
              value={filterService}
              onChange={(e) => setFilterService(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0B4D8C]/40"
            >
              <option value="">All Services</option>
              {uniqueServices.map(service => (
                <option key={service} value={service}>{service}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Team</label>
            <select
              value={filterTeam}
              onChange={(e) => setFilterTeam(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0B4D8C]/40"
            >
              <option value="">All Teams</option>
              {uniqueTeams.map(team => (
                <option key={team} value={team}>{team}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Schedule Cards */}
      <div className="space-y-6">
        {filteredSchedules.length === 0 ? (
          <div className="text-center text-white/80 py-8">
            No schedules found matching the selected filters.
          </div>
        ) : (
          filteredSchedules.map(schedule => (
            <div key={schedule.id} className="bg-white/95 border border-[#0B4D8C]/20 rounded-2xl shadow-lg overflow-hidden">
              {editingId === schedule.id ? (
                /* Edit Mode */
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                      <input
                        type="date"
                        value={editForm.date}
                        onChange={(e) => handleInputChange('date', e.target.value)}
                        className="w-full bg-gray-50 border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0B4D8C]/40"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Day</label>
                      <select
                        value={editForm.day}
                        onChange={(e) => handleInputChange('day', e.target.value)}
                        className="w-full bg-gray-50 border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0B4D8C]/40"
                      >
                        <option value="saturday">Saturday</option>
                        <option value="sunday">Sunday</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Service</label>
                      <input
                        type="text"
                        value={editForm.service}
                        onChange={(e) => handleInputChange('service', e.target.value)}
                        className="w-full bg-gray-50 border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0B4D8C]/40"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Time</label>
                      <input
                        type="text"
                        value={editForm.time}
                        onChange={(e) => handleInputChange('time', e.target.value)}
                        className="w-full bg-gray-50 border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0B4D8C]/40"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Team</label>
                      <select
                        value={editForm.team}
                        onChange={(e) => handleInputChange('team', e.target.value)}
                        className="w-full bg-gray-50 border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0B4D8C]/40"
                      >
                        <option value="Video Team">Video Team</option>
                        <option value="Photo Team">Photo Team</option>
                        <option value="VJ Team">VJ Team</option>
                        <option value="Lighting Team">Lighting Team</option>
                      </select>
                    </div>
                  </div>

                  {/* Role assignments */}
                  <div className="mb-6">
                    <h4 className="font-medium text-gray-700 mb-3">Role Assignments</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {Object.keys(editForm.assignments || {}).map(role => (
                        <div key={role} className="flex items-center gap-3">
                          <label className="w-32 text-sm text-gray-600">{role}</label>
                          <input
                            type="text"
                            value={editForm.assignments[role] || ''}
                            onChange={(e) => handleAssignmentChange(role, e.target.value)}
                            className="flex-1 bg-gray-50 border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0B4D8C]/40"
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-end gap-3">
                    <button
                      onClick={handleCancel}
                      className="px-4 py-2 rounded-md bg-gray-100 hover:bg-gray-200 text-gray-800"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => handleSave(schedule.id)}
                      className="px-4 py-2 rounded-md bg-[#0B4D8C] text-white hover:bg-[#0A3E75]"
                    >
                      Save Changes
                    </button>
                  </div>
                </div>
              ) : (
                /* View Mode */
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-[#0B192C] mb-1">
                        {schedule.service} • {schedule.time}
                      </h3>
                      <p className="text-[#0B4D8C] font-medium">
                        {formatDate(schedule.date)} • {getDayLabel(schedule.day)} • {schedule.team}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(schedule)}
                        className="px-3 py-1 rounded-md bg-[#1693F2] text-white hover:bg-[#0B7CD3] text-sm"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(schedule.id)}
                        className="px-3 py-1 rounded-md bg-red-500 text-white hover:bg-red-600 text-sm"
                      >
                        Delete
                      </button>
                    </div>
                  </div>

                  {/* Role assignments display */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Object.entries(schedule.assignments).map(([role, name]) => (
                      <div key={role} className="flex justify-between items-center py-2 border-b border-gray-100">
                        <span className="text-gray-700 font-medium">{role}</span>
                        <span className="text-[#0B4D8C]">{name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
} 