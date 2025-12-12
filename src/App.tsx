import { Button } from "@/components/ui/button";

export default function App() {
  return (
    <div className="min-h-screen bg-background font-sans antialiased">
      <main className="flex flex-col items-center justify-center h-screen gap-4">
        <h1 className="text-4xl font-bold tracking-tighter">
          Setup Pronto.
        </h1>
        <p className="text-muted-foreground">O Shadcn está funcionando.</p>
        {/* Testando o componente Button que acabamos de instalar */}
        <Button size="lg">Botão Shadcn</Button>
      </main>
    </div>
  );
}