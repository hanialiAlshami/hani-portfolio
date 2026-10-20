"use client";

import * as React from "react";
import {
  Laptop,
  Monitor,
  Code,
  Code2,
  Webhook,
  Network,
  GitBranch,
  Phone,
  Smartphone,
  ShoppingCart,
  ShoppingBag,
  Database,
  Server,
  Globe,
  Search,
  Zap,
  Settings,
  Hexagon,
  FileCode,
  FileJson,
  FileCode2,
  Atom,
  Triangle,
  Wind,
  LayoutTemplate,
  Layout,
  Cpu,
  Github,
  Cloud,
  Box,
  HelpCircle,
  Shield,
  Users,
  CheckCircle2,
  Layers,
  Terminal,
  Compass,
  Briefcase,
  Sparkles,
  Award,
  BookOpen,
  Mail,
  Send,
  LucideProps,
  LucideIcon
} from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  // Services & General
  laptop: Laptop,
  computer: Monitor,
  monitor: Monitor,
  code: Code,
  code2: Code2,
  api: Webhook,
  webhook: Webhook,
  integration: Network,
  network: Network,
  workflow: GitBranch,
  gitbranch: GitBranch,
  'git-branch': GitBranch,
  phone: Phone,
  smartphone: Smartphone,
  cart: ShoppingCart,
  'shopping-cart': ShoppingCart,
  shoppingcart: ShoppingCart,
  ecommerce: ShoppingBag,
  shoppingbag: ShoppingBag,
  'shopping-bag': ShoppingBag,
  database: Database,
  server: Server,
  globe: Globe,
  seo: Search,
  search: Search,
  speed: Zap,
  zap: Zap,
  settings: Settings,
  shield: Shield,
  users: Users,
  checkcircle2: CheckCircle2,
  'check-circle-2': CheckCircle2,
  layers: Layers,
  terminal: Terminal,
  compass: Compass,
  briefcase: Briefcase,
  sparkles: Sparkles,
  award: Award,
  bookopen: BookOpen,
  'book-open': BookOpen,
  mail: Mail,
  send: Send,
  layout: Layout,
  cpu: Cpu,

  // Skills
  laravel: Hexagon,
  hexagon: Hexagon,
  php: FileCode,
  filecode: FileCode,
  'file-code': FileCode,
  mysql: Database,
  javascript: FileJson,
  filejson: FileJson,
  'file-json': FileJson,
  typescript: FileCode2,
  filecode2: FileCode2,
  'file-code-2': FileCode2,
  react: Atom,
  atom: Atom,
  next: Triangle,
  triangle: Triangle,
  tailwind: Wind,
  wind: Wind,
  wordpress: LayoutTemplate,
  layouttemplate: LayoutTemplate,
  'layout-template': LayoutTemplate,
  woocommerce: ShoppingCart,
  github: Github,
  hosting: Cloud,
  cloud: Cloud,
  performance: Zap,
  box: Box,
  helpcircle: HelpCircle,
  'help-circle': HelpCircle,
};

export function IconRenderer({ iconName, className, ...props }: { iconName?: string | null, className?: string } & LucideProps) {
  if (!iconName) {
    return <Box className={className} {...props} />;
  }

  // Handle URL icons (Supabase or other external)
  if (iconName.startsWith('http://') || iconName.startsWith('https://') || iconName.startsWith('/')) {
    return (
      /* eslint-disable-next-line @next/next/no-img-element */
      <img 
        src={iconName} 
        alt="Service or Skill Icon" 
        className={`object-contain drop-shadow-md ${className || ''}`}
        style={{ width: "32px", height: "32px" }}
      />
    );
  }

  const normalized = iconName.trim().toLowerCase().replace(/_/g, '-');
  const normalizedNoHyphen = normalized.replace(/-/g, '');
  
  // Try exact match or unhyphenated match in map
  const IconComponent = iconMap[normalized] || iconMap[normalizedNoHyphen] || Box;

  return <IconComponent className={className} {...props} />;
}
