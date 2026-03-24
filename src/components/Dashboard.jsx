import { useSelector } from 'react-redux'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts'
import { selectTaskStats } from '../store/selectors'
import { PRIORITY_COLORS, PRIORITY_LABELS } from '../store/constants'
import { format } from 'date-fns'
import '../styles/Dashboard.css'

const PRIORITY_ORDER = ['low', 'medium', 'high', 'urgent']

export default function Dashboard() {
  const stats = useSelector(selectTaskStats)
  const tasks = useSelector((s) => s.tasks.tasks)

  const completionRate = stats.total > 0
    ? Math.round((stats.completed / stats.total) * 100)
    : 0

  const priorityData = PRIORITY_ORDER.map((p) => ({
    name: PRIORITY_LABELS[p] || p,
    value: stats.byPriority[p] || 0,
    color: PRIORITY_COLORS[p],
  })).filter((d) => d.value > 0)

  const categoryData = Object.entries(stats.byCategory).map(([name, value]) => ({
    name,
    value,
  })).sort((a, b) => b.value - a.value).slice(0, 8)

  const recentCompleted = tasks
    .filter((t) => t.completed && t.updatedAt)
    .sort((a, b) => b.updatedAt - a.updatedAt)
    .slice(0, 5)

  return (
    <div id="dashboard" className="dashboard" role="region" aria-label="Task statistics dashboard">
      <h2 className="dashboard-title">Task completion statistics</h2>

      <div className="stats-cards">
        <div className="stat-card">
          <span className="stat-value">{stats.total}</span>
          <span className="stat-label">Total tasks</span>
        </div>
        <div className="stat-card">
          <span className="stat-value">{stats.completed}</span>
          <span className="stat-label">Completed</span>
        </div>
        <div className="stat-card">
          <span className="stat-value">{stats.active}</span>
          <span className="stat-label">Active</span>
        </div>
        <div className="stat-card highlight">
          <span className="stat-value">{completionRate}%</span>
          <span className="stat-label">Completion rate</span>
        </div>
      </div>

      <div className="dashboard-grid">
        <section className="dashboard-chart" aria-label="Tasks by priority">
          <h3 className="chart-title">By priority</h3>
          {priorityData.length > 0 ? (
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie
                  data={priorityData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label={({ name, value }) => `${name}: ${value}`}
                >
                  {priorityData.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <p className="chart-empty">No priority data yet</p>
          )}
        </section>

        <section className="dashboard-chart" aria-label="Tasks by category">
          <h3 className="chart-title">By category</h3>
          {categoryData.length > 0 ? (
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={categoryData} layout="vertical" margin={{ left: 20, right: 20 }}>
                <XAxis type="number" />
                <YAxis type="category" dataKey="name" width={90} tick={{ fontSize: 12 }} />
                <Tooltip />
                <Bar dataKey="value" fill="var(--accent)" radius={[0, 4, 4, 0]} name="Tasks" />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <p className="chart-empty">No categories yet</p>
          )}
        </section>
      </div>

      <section className="recent-completed" aria-label="Recently completed tasks">
        <h3 className="chart-title">Recently completed</h3>
        {recentCompleted.length > 0 ? (
          <ul className="recent-list">
            {recentCompleted.map((t) => (
              <li key={t.id}>
                <span className="recent-title">{t.title}</span>
                <span className="recent-date">
                  {format(t.updatedAt, 'MMM d, HH:mm')}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="chart-empty"> No completed tasks yet</p>
        )}
      </section>
    </div>
  )
}
