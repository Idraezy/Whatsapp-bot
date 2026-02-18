import React from 'react';
import { Laptop, Phone, Users, ShieldCheck } from 'lucide-react';
import './BottomNav.css';

export type MobileTab = 'projects' | 'calls' | 'collaborations' | 'tools';

interface BottomNavProps {
  activeTab: MobileTab;
  onTabChange: (tab: MobileTab) => void;
  projectCount?: number;
  contactCount?: number;
  collabCount?: number;
  toolCount?: number;
}

const BottomNav: React.FC<BottomNavProps> = ({ 
  activeTab, 
  onTabChange,
  projectCount = 0,
  contactCount = 0,
  collabCount = 0,
  toolCount = 0
}) => {
  const tabs = [
    { id: 'projects' as MobileTab, label: 'Projects', icon: Laptop, count: projectCount },
    { id: 'calls' as MobileTab, label: 'Calls', icon: Phone, count: contactCount },
    { id: 'collaborations' as MobileTab, label: 'Collaborations', icon: Users, count: collabCount },
    { id: 'tools' as MobileTab, label: 'Tools', icon: ShieldCheck, count: toolCount },
  ];

  return (
    <nav className="bottom-nav">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;
        
        return (
          <button
            key={tab.id}
            className={`bottom-nav-item ${isActive ? 'active' : ''}`}
            onClick={() => onTabChange(tab.id)}
            aria-label={tab.label}
          >
            <div className="bottom-nav-icon-wrapper">
              <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
              {tab.count > 0 && (
                <span className="bottom-nav-badge">{tab.count}</span>
              )}
            </div>
            <span className="bottom-nav-label">{tab.label}</span>
          </button>
        );
      })}
    </nav>
  );
};

export default BottomNav;