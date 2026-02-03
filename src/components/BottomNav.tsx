import React from 'react';
import { Laptop, Phone, Users, Wrench } from 'lucide-react';
import './BottomNav.css';

export type MobileTab = 'projects' | 'calls' | 'collaborations' | 'tools';

interface BottomNavProps {
  activeTab: MobileTab;
  onTabChange: (tab: MobileTab) => void;
}

const BottomNav: React.FC<BottomNavProps> = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'projects' as MobileTab, label: 'Projects', icon: Laptop },
    { id: 'calls' as MobileTab, label: 'Calls', icon: Phone },
    { id: 'collaborations' as MobileTab, label: 'Collaborations', icon: Users },
    { id: 'tools' as MobileTab, label: 'Tools', icon: Wrench },
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
          >
            <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
            <span className="bottom-nav-label">{tab.label}</span>
          </button>
        );
      })}
    </nav>
  );
};

export default BottomNav;
