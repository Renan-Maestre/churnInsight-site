import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bell, Palette, Mail } from "lucide-react";
import { ModeToggle } from "@/components/mode-toggle"; 

export function Settings() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-10">
      {/* Cabeçalho */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Configurações</h1>
        <p className="text-muted-foreground">
          Gerencie suas preferências de conta e alertas do sistema.
        </p>
      </div>

      <Separator className="my-6" />

      {/* Abas de Navegação */}
      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 lg:w-[400px]">
          <TabsTrigger value="profile">Perfil</TabsTrigger>
          <TabsTrigger value="notifications">Alertas</TabsTrigger>
          <TabsTrigger value="appearance">Aparência</TabsTrigger>
        </TabsList>

        {/* --- ABA PERFIL --- */}
        <TabsContent value="profile" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Informações Pessoais</CardTitle>
              <CardDescription>Atualize seus dados de identificação no sistema.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-6">
                <Avatar className="h-20 w-20 cursor-pointer hover:opacity-80 transition-opacity">
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <Button variant="outline" size="sm">Alterar Foto</Button>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome Completo</Label>
                  <Input id="name" defaultValue="Renan Maestre" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Corporativo</Label>
                  <Input id="email" defaultValue="renan@churninsight.com" />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="bio">Cargo / Função</Label>
                <Input id="bio" defaultValue="CTO & Founder" />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Salvar Alterações</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* --- ABA NOTIFICAÇÕES  --- */}
        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Bell className="h-5 w-5 text-indigo-500" />
                <CardTitle>Alertas de Risco</CardTitle>
              </div>
              <CardDescription>Defina quando você quer ser avisado sobre mudanças na base.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              
              {/* Item de Configuração */}
              <div className="flex items-center justify-between space-x-2">
                <Label htmlFor="churn-alert" className="flex flex-col space-y-1">
                  <span>Alto Risco de Churn detectado</span>
                  <span className="font-normal text-muted-foreground text-xs">
                    Notificar quando um cliente entrar na zona crítica (80%).
                  </span>
                </Label>
                <Switch id="churn-alert" defaultChecked />
              </div>
              
              <Separator />

              <div className="flex items-center justify-between space-x-2">
                <Label htmlFor="daily-digest" className="flex flex-col space-y-1">
                  <span>Resumo Diário (Daily Digest)</span>
                  <span className="font-normal text-muted-foreground text-xs">
                    Receba um email toda manhã com o status da base.
                  </span>
                </Label>
                <Switch id="daily-digest" defaultChecked />
              </div>

              <Separator />

              <div className="flex items-center justify-between space-x-2">
                <Label htmlFor="marketing" className="flex flex-col space-y-1">
                  <span>Novas Oportunidades (Upsell)</span>
                  <span className="font-normal text-muted-foreground text-xs">
                    Notificar quando um cliente tiver alta saúde e potencial de compra.
                  </span>
                </Label>
                <Switch id="marketing" />
              </div>

            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Mail className="h-5 w-5 text-zinc-500" />
                <CardTitle>Canais de Notificação</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="grid gap-4 md:grid-cols-2">
               <div className="space-y-2">
                  <Label>Email Principal</Label>
                  <Select defaultValue="renan@churninsight.com">
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o email" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="renan@churninsight.com">renan@churninsight.com</SelectItem>
                      <SelectItem value="financeiro@churninsight.com">financeiro@churninsight.com</SelectItem>
                    </SelectContent>
                  </Select>
               </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* --- ABA APARÊNCIA --- */}
        <TabsContent value="appearance" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Palette className="h-5 w-5 text-pink-500" />
                <CardTitle>Tema do Sistema</CardTitle>
              </div>
              <CardDescription>Escolha a aparência que for mais confortável para seus olhos.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <Label className="text-base">Modo Escuro / Claro</Label>
                  <p className="text-sm text-muted-foreground">
                    Alternar manualmente entre os temas.
                  </p>
                </div>
                {/* Aqui usamos o componente que criamos antes */}
                <ModeToggle />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}