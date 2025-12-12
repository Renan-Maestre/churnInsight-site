import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {  ArrowUp, Users, DollarSign, AlertTriangle, Activity } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ModeToggle } from "@/components/mode-toggle";
import { useTheme } from "@/components/theme-provider";

// --- 1. GERAÇÃO DE DADOS (Mesma lógica da página de Clientes) ---
const generateClients = () => {
  return Array.from({ length: 50 }).map((_, i) => {
    const risk = Math.floor(Math.random() * 100);
    let status = "Saudável";
    if (risk >= 80) status = "Crítico";
    else if (risk >= 40) status = "Alerta";

    // Valor de contrato aleatório
    const rawValue = Math.random() * 10000 + 1000;

    return {
      id: i.toString(),
      name: `Empresa ${i + 1} Ltda`,
      status: status,
      risk: risk,
      value: rawValue,
    };
  });
};

const clients = generateClients();

// --- 2. CÁLCULO DOS INDICADORES (KPIs) ---
const totalClients = clients.length;

// Receita em Risco: Soma dos valores de quem está "Crítico" (>80% risco)
const revenueAtRisk = clients
  .filter(c => c.status === 'Crítico')
  .reduce((acc, curr) => acc + curr.value, 0);

// Formatador de Moeda
const formatCurrency = (value: number) => 
  new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);

// Contagem de Clientes em Atenção (Alerta + Crítico)
const clientsInDanger = clients.filter(c => c.risk >= 40).length;

// Churn Projetado (% de clientes Críticos na base)
const criticalClientsCount = clients.filter(c => c.status === 'Crítico').length;
const projectedChurnRate = ((criticalClientsCount / totalClients) * 100).toFixed(1);

// Lista de "Atividade Recente": Os 4 clientes com maior risco
const topRiskyClients = [...clients]
  .sort((a, b) => b.risk - a.risk)
  .slice(0, 4);

// Gráfico (Histórico simulado)
const chartData = [
  { name: 'Jan', churn: 2.4 }, { name: 'Fev', churn: 1.3 }, { name: 'Mar', churn: 3.5 },
  { name: 'Abr', churn: 2.2 }, { name: 'Mai', churn: 1.8 }, { name: 'Jun', churn: projectedChurnRate }, // O último mês reflete o atual
];

export function Dashboard() {
  const { theme } = useTheme();
  
  // Cores dinâmicas para o gráfico
  const isDark = theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
  const chartColor = isDark ? "#6366f1" : "#4f46e5";
  const gridColor = isDark ? "#27272a" : "#e5e7eb";
  const textColor = isDark ? "#a1a1aa" : "#71717a";

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">Monitoramento em tempo real da base de {totalClients} clientes.</p>
        </div>
        <div className="flex items-center gap-2">
           <ModeToggle />
        </div>
      </div>

      {/* --- CARDS DE MÉTRICAS CALCULADAS --- */}
      <div className="grid gap-4 md:grid-cols-3">
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Churn Previsto</CardTitle>
            <Activity className="h-4 w-4 text-indigo-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{projectedChurnRate}%</div>
            <p className="text-xs text-muted-foreground flex items-center mt-1">
              Baseado em {criticalClientsCount} clientes críticos
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Receita em Risco</CardTitle>
            <DollarSign className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{formatCurrency(revenueAtRisk)}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Soma total de contratos críticos
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Clientes em Atenção</CardTitle>
            <AlertTriangle className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{clientsInDanger}</div>
            <p className="text-xs text-orange-500 flex items-center mt-1">
              <ArrowUp className="h-4 w-4 mr-1" /> {((clientsInDanger/totalClients)*100).toFixed(0)}% da base total
            </p>
          </CardContent>
        </Card>
      </div>

      {/* --- GRÁFICO E LISTA DINÂMICA --- */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle className="text-foreground">Tendência de Churn</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <div className="h-[200px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="colorChurn" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={chartColor} stopOpacity={0.3}/>
                      <stop offset="95%" stopColor={chartColor} stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="name" stroke={textColor} fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke={textColor} fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}%`} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: isDark ? '#18181b' : '#ffffff', 
                      borderColor: isDark ? '#27272a' : '#e5e7eb',
                      color: isDark ? '#fff' : '#000'
                    }} 
                  />
                  <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
                  <Area type="monotone" dataKey="churn" stroke={chartColor} strokeWidth={2} fillOpacity={1} fill="url(#colorChurn)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* LISTA DOS PIORES CASOS REAIS */}
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle className="text-foreground">Maiores Riscos Agora</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topRiskyClients.map((client) => (
                <div key={client.id} className="flex items-center">
                  <div className="h-9 w-9 rounded-full bg-red-500/10 flex items-center justify-center border border-red-500/20">
                    <Users className="h-4 w-4 text-red-500" />
                  </div>
                  <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none text-foreground">{client.name}</p>
                    <p className="text-xs text-muted-foreground">
                      Contrato de {formatCurrency(client.value)}
                    </p>
                  </div>
                  <div className="ml-auto font-bold text-red-500 text-sm">
                    {client.risk}%
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}