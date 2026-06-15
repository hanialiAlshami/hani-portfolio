import * as Icons from "lucide-react";
import { LucideProps } from "lucide-react";

const iconMap: Record<string, any> = {
  // Services
  laptop: Icons.Laptop,
  computer: Icons.Monitor,
  code: Icons.Code,
  api: Icons.Webhook,
  integration: Icons.Network,
  workflow: Icons.GitBranch,
  phone: Icons.Phone,
  smartphone: Icons.Smartphone,
  cart: Icons.ShoppingCart,
  'shopping-cart': Icons.ShoppingCart,
  ecommerce: Icons.ShoppingBag,
  database: Icons.Database,
  server: Icons.Server,
  globe: Icons.Globe,
  seo: Icons.Search,
  speed: Icons.Zap,
  settings: Icons.Settings,

  // Skills
  laravel: Icons.Hexagon,
  php: Icons.FileCode,
  mysql: Icons.Database,
  javascript: Icons.FileJson,
  typescript: Icons.FileCode2,
  react: Icons.Atom,
  next: Icons.Triangle,
  tailwind: Icons.Wind,
  wordpress: Icons.LayoutTemplate,
  woocommerce: Icons.ShoppingCart,
  github: Icons.Github,
  hosting: Icons.Cloud,
  performance: Icons.Zap,
};

export function IconRenderer({ iconName, className, ...props }: { iconName?: string | null, className?: string } & LucideProps) {
  if (!iconName) {
    return <Icons.Box className={className} {...props} />;
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
  
  // Try exact match in map
  let IconComponent = iconMap[normalized];
  
  // Try finding exact match in lucide-react by converting to PascalCase
  if (!IconComponent) {
    const pascalCased = normalized.split('-').map(part => part.charAt(0).toUpperCase() + part.slice(1)).join('');
    IconComponent = (Icons as any)[pascalCased];
  }

  // Fallback neutral icon
  if (!IconComponent) {
    IconComponent = Icons.Box; // neutral fallback
  }

  return <IconComponent className={className} {...props} />;
}
