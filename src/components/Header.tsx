import { ModeToggle } from "@/components/ModeToggle";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";

// 导航链接配置
const navLinks = [
  { to: "/" as const, hash: "features", label: "Features" },
  { to: "/pricing" as const, label: "Pricing" },
  { to: "/blog" as const, label: "Blog" },
];

const Header = () => {
  return (
    <header className="sticky top-0 z-50 border-b border-border/40 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-14 items-center justify-between">
          {/* 左侧：Logo 和标题 */}
          <div className="flex items-center gap-6">
            <Link to="/" className="flex items-center gap-2 transition-opacity hover:opacity-80">
              <img src="/tanstack-circle-logo.png" alt="Logo" width={40} height={40} />
              <span className="text-lg font-semibold">My SaaS App</span>
            </Link>

            {/* 中间：导航链接（桌面端显示） */}
            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.to}
                  {...(link.hash && { hash: link.hash })}
                  className="px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* 右侧：功能按钮 + 主题切换 */}
          <div className="flex items-center gap-2">
            {/* 登录按钮（可扩展其他功能） */}
            <Button variant="ghost" size="sm" className="hidden sm:inline-flex">
              Sign In
            </Button>
            <Button size="sm" className="hidden sm:inline-flex">
              Get Started
            </Button>

            {/* 主题切换 */}
            <ModeToggle />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;