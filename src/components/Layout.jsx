import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setSidebarOpen } from '../store/slices/uiSlice'
import Header from './Header'
import Sidebar from './Sidebar'
import MainContent from './MainContent'
import '../styles/Layout.css'

export default function Layout() {
  const sidebarOpen = useSelector((s) => s.ui.sidebarOpen)
  const dispatch = useDispatch()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <>
      <a href="#main" className="skip-link">
        Skip to main content
      </a>
      <Header
        onMenuClick={() => setMobileMenuOpen((o) => !o)}
        onSidebarToggle={() => dispatch(setSidebarOpen())}
        sidebarOpen={sidebarOpen}
      />
      <div className="layout">
        <aside
          className={`sidebar-wrap ${sidebarOpen ? 'open' : ''} ${mobileMenuOpen ? 'mobile-open' : ''}`}
          aria-label="Navigation and filters"
        >
          <Sidebar onNavigate={() => setMobileMenuOpen(false)} />
        </aside>
        <main id="main" className="main" role="main">
          <MainContent />
        </main>
      </div>
      {mobileMenuOpen && (
        <button
          type="button"
          className="overlay"
          aria-label="Close menu"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
    </>
  )
}
