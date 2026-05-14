import type { ReactNode } from 'react';
import Navbar from './Navbar';
import Header from './Header';
import RightPanel from './RightPanel';

interface LayoutProps {
  children: ReactNode;
  title: string;
  breadcrumb?: string;
  showRightPanel?: boolean;
}

export default function Layout({ children, title, breadcrumb, showRightPanel = true }: LayoutProps) {
  return (
    <div className="min-h-[100dvh] bg-[#F8FAFC]">
      {/* Sidebar */}
      <Navbar />

      {/* Top Header */}
      <Header title={title} breadcrumb={breadcrumb} />

      {/* Main Content Area */}
      <main
        className="pt-14 min-h-[100dvh] overflow-y-auto"
        style={{
          marginLeft: 260,
          marginRight: showRightPanel ? 320 : 0,
        }}
      >
        <div className="p-6">
          {children}
        </div>
      </main>

      {/* Right Panel */}
      {showRightPanel && <RightPanel />}
    </div>
  );
}
