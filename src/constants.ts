import { Project, WorkspaceItem, Experience } from './types';

export const PROJECTS: Project[] = [
  {
    id: '1',
    title: 'Vibe 视频广告',
    description: '一个基于 AI 的视频生成平台，使用 Gemini 和 Veo 模型创建令人惊叹的 8 秒视频广告。',
    tags: ['React', 'Gemini API', 'Veo', 'Tailwind'],
    image: 'https://picsum.photos/seed/vibe/800/600',
  },
  {
    id: '2',
    title: '生物皮肤科学',
    description: '一个基于研究的护肤平台，专注于微生物组和谐与自然平衡恢复。',
    tags: ['Next.js', 'Framer Motion', 'UI/UX'],
    image: 'https://picsum.photos/seed/bio/800/600',
  },
  {
    id: '3',
    title: 'Frello CRM',
    description: '通过这个精简的 CRM 仪表板，轻松管理您的团队和业务运营。',
    tags: ['TypeScript', 'Node.js', 'PostgreSQL'],
    image: 'https://picsum.photos/seed/crm/800/600',
  },
];

export const WORKSPACE: WorkspaceItem[] = [
  {
    id: 'w1',
    category: '硬件',
    name: 'MacBook Pro M3 Max',
    description: '我进行所有开发和设计工作的主力机。',
  },
  {
    id: 'w2',
    category: '外设',
    name: 'Keychron Q1 Pro',
    description: '定制机械键盘，配备 Gateron Oil King 轴体。',
  },
  {
    id: 'w3',
    category: '软件',
    name: 'VS Code + Tokyo Night',
    description: '终极编码环境，拥有干净的深色美学。',
  },
  {
    id: 'w4',
    category: '软件',
    name: 'Figma',
    description: '所有设计创意在编码前诞生的地方。',
  },
];

export const EXPERIENCES: Experience[] = [
  {
    id: 'e1',
    period: '2023年1月 - 至今',
    role: '高级产品设计师',
    company: 'TechFlow Inc.',
    description: '领导核心产品的设计系统和用户体验设计。',
  },
  {
    id: 'e2',
    period: '2021年1月 - 2022年12月',
    role: '移动产品设计师',
    company: 'AppVenture',
    description: '为初创公司设计屡获殊荣的移动应用程序。',
  },
];
