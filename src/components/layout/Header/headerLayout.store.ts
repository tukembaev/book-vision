import { create } from 'zustand';

export interface HeaderTab {
  label: string;
  value: string;
}

export interface HeaderLayoutState {
  showCenterTabs: boolean;
  centerTabs: HeaderTab[];
  activeTab: string;

  setCenterTabs: (tabs: HeaderTab[], defaultActive?: string) => void;
  setActiveTab: (value: string) => void;
  hideCenterTabs: () => void;
}

export const useHeaderLayoutStore = create<HeaderLayoutState>((set) => ({
  showCenterTabs: false,
  centerTabs: [],
  activeTab: '',

  setCenterTabs: (tabs, defaultActive) =>
    set({
      showCenterTabs: true,
      centerTabs: tabs,
      activeTab: defaultActive ?? tabs[0]?.value ?? '',
    }),

  setActiveTab: (value) => set({ activeTab: value }),

  hideCenterTabs: () =>
    set({
      showCenterTabs: false,
      centerTabs: [],
      activeTab: '',
    }),
}));
