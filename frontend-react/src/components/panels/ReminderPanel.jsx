import React, { useState } from 'react';

export default function ReminderPanel() {
  // Mock State for Reminders
  const [reminders, setReminders] = useState([
    { id: 1, title: "Take Evening Medication", assignee: "Priya Mehta", time: "08:00 PM", date: "Today", priority: "High", completed: false },
    { id: 2, title: "Pick up from Football Practice", assignee: "Dev (You)", time: "05:30 PM", date: "Tomorrow", priority: "Medium", completed: false },
    { id: 3, title: "Sync Smartwatch to Cloud", assignee: "Admin", time: "10:00 PM", date: "Weekly", priority: "Low", completed: true }
  ]);

  const [newTask, setNewTask] = useState({ title: "", assignee: "Dev (You)", priority: "Medium" });

  const handleAddReminder = (e) => {
    e.preventDefault();
    if (!newTask.title.trim()) return;
    
    const newReminder = {
      id: Date.now(),
      title: newTask.title,
      assignee: newTask.assignee,
      time: "Pending", // Mock time for now
      date: "Upcoming",
      priority: newTask.priority,
      completed: false
    };
    
    setReminders([newReminder, ...reminders]);
    setNewTask({ ...newTask, title: "" }); // Reset input
  };

  const toggleComplete = (id) => {
    setReminders(reminders.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const getPriorityColor = (priority, isCompleted) => {
    if (isCompleted) return "bg-slate-100 dark:bg-slate-800 text-slate-400 border-slate-200 dark:border-slate-700";
    if (priority === "High") return "bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-200 dark:border-rose-500/30";
    if (priority === "Medium") return "bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-500/30";
    return "bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-500/30";
  };

  return (
    <div className="animate-fade-in-up space-y-8 max-w-7xl mx-auto">
      
      {/* Premium Header Banner */}
      <div className="bg-gradient-to-r from-violet-600 to-fuchsia-600 rounded-[2rem] p-8 relative overflow-hidden shadow-lg shadow-violet-500/20 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full mix-blend-overlay filter blur-3xl translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
        <div className="relative z-10 flex items-center gap-6">
          <div className="w-16 h-16 rounded-full bg-white/20 border-2 border-white/50 flex items-center justify-center shrink-0 backdrop-blur-md">
            <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
          </div>
          <div>
            <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight">Family Reminders</h2>
            <p className="text-violet-100 font-medium mt-1">Shared tasks and critical alerts</p>
          </div>
        </div>
        <div className="relative z-10 bg-white/20 px-6 py-3 rounded-2xl backdrop-blur-md border border-white/20 text-center flex items-center gap-4">
          <div className="text-right">
            <p className="text-violet-100 text-xs font-bold uppercase tracking-wider mb-1">Active Tasks</p>
            <p className="text-xl font-black text-white">{reminders.filter(r => !r.completed).length} Pending</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Add Reminder Form */}
        <div className="lg:col-span-1">
          <div className="bg-white/80 dark:bg-slate-900/60 backdrop-blur-xl p-8 rounded-[2rem] border border-white/60 dark:border-slate-700/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-none sticky top-0">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-violet-100 dark:bg-violet-500/20 text-violet-600 dark:text-violet-400 flex items-center justify-center">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
              </div>
              <h3 className="text-xl font-bold text-slate-800 dark:text-white">New Reminder</h3>
            </div>

            <form onSubmit={handleAddReminder} className="space-y-5">
              <div>
                <label className="block text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">Task Description</label>
                <input 
                  type="text" 
                  value={newTask.title}
                  onChange={(e) => setNewTask({...newTask, title: e.target.value})}
                  placeholder="e.g., Call Grandma..." 
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-violet-500/30 text-slate-800 dark:text-white transition-all"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">Assign To</label>
                <select 
                  value={newTask.assignee}
                  onChange={(e) => setNewTask({...newTask, assignee: e.target.value})}
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-violet-500/30 text-slate-800 dark:text-white transition-all cursor-pointer"
                >
                  <option>Dev (You)</option>
                  <option>Priya Mehta</option>
                  <option>Rahul Verma</option>
                  <option>Entire Family</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">Priority Level</label>
                <div className="grid grid-cols-3 gap-2">
                  {['Low', 'Medium', 'High'].map(level => (
                    <button 
                      key={level}
                      type="button"
                      onClick={() => setNewTask({...newTask, priority: level})}
                      className={`py-2 rounded-lg text-xs font-bold transition-colors ${
                        newTask.priority === level 
                          ? 'bg-slate-800 text-white dark:bg-white dark:text-slate-900 shadow-md' 
                          : 'bg-slate-100 text-slate-500 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700'
                      }`}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>

              <button 
                type="submit"
                disabled={!newTask.title.trim()}
                className="w-full mt-4 py-3.5 bg-linear-to-r from-violet-500 to-fuchsia-600 hover:from-violet-600 hover:to-fuchsia-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
              >
                Create Reminder
              </button>
            </form>
          </div>
        </div>

        {/* Right Column: Timeline / List */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between px-2 mb-2">
            <h3 className="text-lg font-bold text-slate-800 dark:text-white">Upcoming Tasks</h3>
            <div className="flex gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500" title="High Priority"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500" title="Medium Priority"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-blue-500" title="Low Priority"></span>
            </div>
          </div>

          {reminders.map((task) => (
            <div 
              key={task.id} 
              className={`bg-white/80 dark:bg-slate-900/60 backdrop-blur-xl p-5 rounded-2xl border transition-all duration-300 flex items-start gap-4 group hover:shadow-md ${getPriorityColor(task.priority, task.completed)} ${task.completed ? 'opacity-60 grayscale-[50%]' : 'shadow-sm'}`}
            >
              {/* Checkbox */}
              <button 
                onClick={() => toggleComplete(task.id)}
                className={`mt-1 w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${
                  task.completed 
                    ? 'bg-slate-400 border-slate-400 dark:bg-slate-600 dark:border-slate-600 text-white' 
                    : 'border-current hover:bg-current hover:text-white dark:hover:text-slate-900'
                }`}
              >
                {task.completed && <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
              </button>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start mb-1">
                  <h4 className={`font-bold text-base truncate ${task.completed ? 'line-through text-slate-500 dark:text-slate-400' : 'text-slate-800 dark:text-white'}`}>
                    {task.title}
                  </h4>
                  <span className={`text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-md border border-current ${task.completed ? 'hidden' : 'block'}`}>
                    {task.priority}
                  </span>
                </div>
                
                <div className="flex items-center gap-4 mt-2">
                  <div className="flex items-center gap-1.5 text-xs font-medium opacity-80">
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                    {task.assignee}
                  </div>
                  <div className="w-1 h-1 rounded-full bg-current opacity-40"></div>
                  <div className="flex items-center gap-1.5 text-xs font-medium opacity-80">
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    {task.date} • {task.time}
                  </div>
                </div>
              </div>
            </div>
          ))}

          {reminders.length === 0 && (
            <div className="text-center py-12 bg-white/50 dark:bg-slate-900/30 rounded-2xl border border-dashed border-slate-200 dark:border-slate-700">
              <p className="text-slate-500 dark:text-slate-400 font-medium">No reminders right now. You're all caught up!</p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}