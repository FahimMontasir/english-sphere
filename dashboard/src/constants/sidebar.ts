import { IconName } from '@/components/common/Icon';

export type TabType = { link: string; name: string; iconName: IconName };

export const routesConf: TabType[] = [
  { link: '/dashboard', name: 'Home', iconName: 'home' },
  { link: '/dashboard/users', name: 'Users', iconName: 'user' },
  { link: '/dashboard/materials', name: 'Materials', iconName: 'materials' },
];
