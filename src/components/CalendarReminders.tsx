import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { Reminder } from '../types';

interface CalendarRemindersProps {
  reminders: Reminder[];
  onAddReminder: (title: string, date: string) => void;
  onCompleteReminder: (id: string) => void;
  onUncompleteReminder: (id: string) => void;
}

export const CalendarReminders: React.FC<CalendarRemindersProps> = ({ reminders, onAddReminder, onCompleteReminder, onUncompleteReminder }) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [showAdd, setShowAdd] = useState(false);
  const [newTitle, setNewTitle] = useState('');

  const isoDate = selectedDate ? selectedDate.toISOString().split('T')[0] : '';
  const remindersForDay = reminders.filter(r => r.date === isoDate);

  const handleAdd = () => {
    if (newTitle.trim() && isoDate) {
      onAddReminder(newTitle, isoDate);
      setNewTitle('');
      setShowAdd(false);
    }
  };

  // Highlight days with reminders
  const tileClassName = ({ date, view }: { date: Date; view: string }) => {
    if (view === 'month') {
      const d = date.toISOString().split('T')[0];
      if (reminders.some(r => r.date === d)) {
        return 'bg-blue-200 rounded-full';
      }
    }
    return null;
  };

  return (
    <div className="p-4 bg-white/10 rounded-xl shadow-lg max-w-md mx-auto">
      <Calendar
        onChange={(date) => setSelectedDate(date as Date)}
        value={selectedDate}
        tileClassName={tileClassName}
      />
      <div className="mt-4">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-lg font-bold text-white">Reminders for {isoDate}</h2>
          <button onClick={() => setShowAdd(v => !v)} className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600">Add</button>
        </div>
        {showAdd && (
          <div className="flex gap-2 mb-2">
            <input
              type="text"
              value={newTitle}
              onChange={e => setNewTitle(e.target.value)}
              placeholder="Reminder title"
              className="flex-1 px-2 py-1 rounded border border-gray-300"
            />
            <button onClick={handleAdd} className="px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600">Save</button>
          </div>
        )}
        <ul className="space-y-2">
          {remindersForDay.length === 0 && <li className="text-gray-400">No reminders for this day.</li>}
          {remindersForDay.map(reminder => (
            <li key={reminder.id} className={`flex items-center gap-2 p-2 rounded ${reminder.completed ? 'bg-green-100 text-green-700 line-through' : 'bg-yellow-100 text-yellow-700'}`}>
              <span className="flex-1">{reminder.title}</span>
              {reminder.completed ? (
                <button onClick={() => onUncompleteReminder(reminder.id)} className="text-xs px-2 py-1 bg-gray-300 rounded">Undo</button>
              ) : (
                <button onClick={() => onCompleteReminder(reminder.id)} className="text-xs px-2 py-1 bg-green-400 text-white rounded">Complete</button>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}; 