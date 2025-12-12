import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useTheme } from "@/components/theme-provider"

export function ModeToggle() {
  const { setTheme } = useTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {/* CORREÇÃO PRINCIPAL: 
          1. Trocamos variant="outline" por "ghost" para ficar mais limpo na sidebar.
          2. Removemos 'text-white' e 'bg-zinc-800'. 
          3. Usamos 'text-muted-foreground' que vira cinza escuro no light e cinza claro no dark.
        */}
        <Button variant="ghost" size="icon" className="h-9 w-9 text-muted-foreground hover:text-foreground hover:bg-accent">
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Trocar tema</span>
        </Button>
      </DropdownMenuTrigger>
      
      {/* CORREÇÃO NO MENU:
        Removemos as classes de cor fixa (bg-zinc-900). 
        O componente DropdownMenuContent do Shadcn já puxa automaticamente 
        o fundo branco (no light) ou preto (no dark).
      */}
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")} className="cursor-pointer">
          Claro
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")} className="cursor-pointer">
          Escuro
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")} className="cursor-pointer">
          Sistema
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}