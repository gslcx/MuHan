import { Project, WorkspaceItem, Experience } from './types';

export const PROJECTS: Project[] = [
  {
    id: '1',
    title: "EcoSmart Dashboard",
    description: "为大型制造企业设计的环境监测仪表板，实时可视化碳排放和能源使用情况。基于 React 和 D3.js。",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop",
    tags: ["React", "TypeScript", "D3.js", "Tailwind"]
  },
  {
    id: '2',
    title: "Nexus Finance App",
    description: "下一代去中心化金融应用的移动端网页版，提供流畅的资产管理和交易体验。整合了 Web3.js。",
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1200&auto=format&fit=crop",
    tags: ["Next.js", "Web3", "Framer Motion"]
  },
  {
    id: '3',
    title: "Aura Creative Suite",
    description: "专为设计师打造的云端协作工具，支持多人实时编辑和版本控制。使用了 CRDT 算法和 WebSocket。",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=1200&auto=format&fit=crop",
    tags: ["Vue", "Node.js", "WebSocket", "PostgreSQL"]
  }
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
