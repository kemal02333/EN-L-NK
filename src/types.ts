export interface Student {
  id: string;
  name: string;
  avatar: string;
  status: 'active' | 'passive';
  lastSeen: string;
  currentTask?: string;
  class: string;
  isLocked?: boolean;
  visitedSites?: { url: string; time: string; icon: string }[];
}

export interface Task {
  id: string;
  title: string;
  class: string;
  category: string;
  progress: number;
  submissions: number;
  status: 'critical' | 'normal' | 'completed';
  dueDate: string;
}

export interface Activity {
  id: string;
  time: string;
  title: string;
  subtitle: string;
  type: 'login' | 'location' | 'device';
}

export interface Permission {
  id: string;
  title: string;
  desc: string;
  enabled: boolean;
  color: string;
  icon: string;
}

export interface Notification {
  id: string;
  title: string;
  time: string;
  read: boolean;
}
