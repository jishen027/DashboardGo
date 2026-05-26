export type ServiceStatus =
  | 'correct'
  | 'completed'
  | 'wrong'
  | 'error'
  | 'skipped'
  | 'inProgress'
  | 'expired';

export type LayoutDensity = 'compact' | 'medium' | 'comfortable';

export type ActiveTab = 'dashboard' | 'config';

export interface UserInfo {
  sub: string;
  name?: string;
  email?: string;
  picture?: string;
}

export type ToastType = 'success' | 'danger' | 'warning' | 'stone';

export interface ToastMessage {
  message: string;
  type: ToastType;
}

export interface ServiceItem {
  id: string;
  name: string;
  url: string;
  icon: string;
  description: string;
  port: number;
  status: ServiceStatus;
  latency: string;
  tags: string[];
}

export interface ServiceSection {
  id: string;
  name: string;
  description: string;
  isOpen: boolean;
  items: ServiceItem[];
}

export interface DashyConfig {
  serverName: string;
  serverIp: string;
  uptime: string;
  layoutDensity: LayoutDensity;
  sections: ServiceSection[];
}

export interface StatusCounts {
  online: number;
  offline: number;
  paused: number;
  total: number;
}

export interface NewHostForm {
  name: string;
  sectionId: string;
  url: string;
  icon: string;
  description: string;
  port: string;
  tags: string;
}
