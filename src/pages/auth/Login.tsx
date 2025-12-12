import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Rocket } from "lucide-react";

export function Login() {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-zinc-950 px-4">
      <Card className="w-full max-w-md border-zinc-800 bg-zinc-900/50 text-white">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-600 text-white">
              <Rocket size={24} />
            </div>
          </div>
          <CardTitle className="text-2xl">Acesse o ChurnInsight</CardTitle>
          <CardDescription className="text-zinc-400">
            Entre com suas credenciais para gerenciar a retenção.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email Corporativo</Label>
            <Input id="email" placeholder="seu@empresa.com" className="bg-zinc-950 border-zinc-800 focus-visible:ring-indigo-500" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Senha</Label>
            <Input id="password" type="password" className="bg-zinc-950 border-zinc-800 focus-visible:ring-indigo-500" />
          </div>
          <Button className="w-full bg-indigo-600 hover:bg-indigo-700">
            Entrar no Dashboard
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}