import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowDown, ArrowUp, Users, DollarSign, AlertTriangle, Activity } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ModeToggle } from "@/components/mode-toggle";
import { useTheme } from "@/components/theme-provider"; // Importante para o gráfico

// Dados (iguais)
const data = [
  { name: 'Jan', churn: 4 }, { name: 'Fev', churn: 3 }, { name: 'Mar', churn: 5 },
  { name: 'Abr', churn: 2 }, { name: 'Mai', churn: 3 }, { name: 'Jun', churn: 1 },
];

export function Dashboard() {
  const { theme } = useTheme(); // Para saber se é dark ou light

  // Configuração dinâmica do gráfico
  const isDark = theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
  const chartColor = isDark ? "#6366f1" : "#4f46e5"; // Roxo mais forte no light
  const gridColor = isDark ? "#27272a" : "#e5e7eb"; // Linhas da grade
  const textColor = isDark ? "#a1a1aa" : "#71717a"; // Texto dos eixos

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          {/* MUDANÇA: text-foreground em vez de text-white */}
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">Visão geral da saúde da sua base de clientes.</p>
        </div>
      </div>

      {/* CARDS DE MÉTRICAS */}
      <div className="grid gap-4 md:grid-cols-3">
        {/* MUDANÇA: Removemos bg-zinc-900. O componente Card já tem bg-card padrão */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Churn Rate (Mensal)</CardTitle>
            <Activity className="h-4 w-4 text-indigo-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">1.2%</div>
            <p className="text-xs text-green-500 flex items-center mt-1">
              <ArrowDown className="h-4 w-4 mr-1" /> -0.4% mês passado
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Receita em Risco</CardTitle>
            <DollarSign className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">R$ 12.450</div>
            <p className="text-xs text-muted-foreground mt-1">Baseado na saúde de uso</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Clientes em Alerta</CardTitle>
            <AlertTriangle className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">14</div>
            <p className="text-xs text-red-500 flex items-center mt-1">
              <ArrowUp className="h-4 w-4 mr-1" /> +2 novos hoje
            </p>
          </CardContent>
        </Card>
      </div>

      {/* GRÁFICO E LISTA */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle className="text-foreground">Tendência de Churn</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <div className="h-[200px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data}>
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
                    itemStyle={{ color: isDark ? '#fff' : '#000' }}
                  />
                  <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
                  <Area type="monotone" dataKey="churn" stroke={chartColor} strokeWidth={2} fillOpacity={1} fill="url(#colorChurn)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-3">
          <CardHeader>
            <CardTitle className="text-foreground">Atividade Recente</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {['Empresa X', 'Startup Y', 'Tech Z'].map((empresa, i) => (
                <div key={i} className="flex items-center">
                  {/* Avatar adaptativo */}
                  <div className="h-9 w-9 rounded-full bg-muted flex items-center justify-center border border-border">
                    <Users className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none text-foreground">{empresa}</p>
                    <p className="text-xs text-muted-foreground">Risco de Churn aumentou</p>
                  </div>
                  <div className="ml-auto font-medium text-red-500 text-sm">-12%</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}