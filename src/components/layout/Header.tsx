import { Button } from "@/components/ui/button";
import { Menu, X, Rocket } from "lucide-react"; // Ícones
import { useState } from "react";

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    // Header com efeito de vidro (backdrop-blur) e fixo no topo
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-zinc-950/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        
        {/* Logo */}
        <div className="flex items-center gap-2 font-bold text-white text-xl cursor-pointer">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-white">
            <Rocket size={18} />
          </div>
          <span>SuaEmpresa</span>
        </div>

        {/* Navegação Desktop (Escondida no Mobile) */}
        <nav className="hidden md:flex items-center gap-8">
          <a href="#" className="text-sm font-medium text-zinc-400 hover:text-white transition-colors">Soluções</a>
          <a href="#" className="text-sm font-medium text-zinc-400 hover:text-white transition-colors">Cases</a>
          <a href="#" className="text-sm font-medium text-zinc-400 hover:text-white transition-colors">Preços</a>
          <a href="#" className="text-sm font-medium text-zinc-400 hover:text-white transition-colors">Sobre</a>
        </nav>

        {/* Botões de Ação */}
        <div className="hidden md:flex items-center gap-4">
          <Button variant="ghost" className="text-zinc-300 hover:text-white hover:bg-white/10">
            Login
          </Button>
          <Button className="bg-white text-black hover:bg-zinc-200">
            Começar Agora
          </Button>
        </div>

        {/* Botão Menu Mobile (Só aparece em telas pequenas) */}
        <button 
          className="md:hidden text-zinc-300"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Menu Mobile Dropdown (Simples) */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-b border-white/10 bg-zinc-950 px-6 py-4 space-y-4">
          <a href="#" className="block text-sm font-medium text-zinc-400 hover:text-white">Soluções</a>
          <a href="#" className="block text-sm font-medium text-zinc-400 hover:text-white">Cases</a>
          <a href="#" className="block text-sm font-medium text-zinc-400 hover:text-white">Preços</a>
          <div className="pt-4 flex flex-col gap-2">
             <Button variant="outline" className="w-full justify-center">Login</Button>
             <Button className="w-full bg-white text-black hover:bg-zinc-200">Começar Agora</Button>
          </div>
        </div>
      )}
    </header>
  );
}