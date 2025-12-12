import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Calendar, Filter, Download, Info } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { useTheme } from "@/components/theme-provider";

// DADOS MOCKADOS (Simulando uma análise real de 2024)
const cohortData = [
  { month: "Jan 24", users: 120, retention: [100, 94, 88, 85, 82, 80] },
  { month: "Fev 24", users: 145, retention: [100, 92, 86, 83, 80, null] },
  { month: "Mar 24", users: 110, retention: [100, 95, 89, 87, null, null] },
  { month: "Abr 24", users: 160, retention: [100, 91, 85, null, null, null] },
  { month: "Mai 24", users: 135, retention: [100, 93, null, null, null, null] },
  { month: "Jun 24", users: 150, retention: [100, null, null, null, null, null] },
];

// Dados para o Gráfico de Linhas (Curva de Decaimento)
const retentionCurveData = [
  { month: 'Mês 0', jan: 100, fev: 100, mar: 100 },
  { month: 'Mês 1', jan: 94, fev: 92, mar: 95 },
  { month: 'Mês 2', jan: 88, fev: 86, mar: 89 },
  { month: 'Mês 3', jan: 85, fev: 83, mar: 87 },
  { month: 'Mês 4', jan: 82, fev: 80, mar: null },
  { month: 'Mês 5', jan: 80, fev: null, mar: null },
];

export function CohortAnalysis() {
  const { theme } = useTheme();
  const isDark = theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);

  // Função para gerar cor baseada na porcentagem (Verde -> Amarelo -> Vermelho)
  const getCellColor = (value: number | null) => {
    if (value === null) return "bg-transparent"; // Célula vazia (futuro)
    if (value === 100) return "bg-zinc-100 dark:bg-zinc-800 text-foreground"; // Mês 0 (Neutro)
    
    // Gradiente de Opacidade para destacar a queda
    if (value >= 90) return "bg-emerald-500/20 text-emerald-600 dark:text-emerald-400";
    if (value >= 80) return "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400";
    if (value >= 60) return "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400";
    return "bg-red-500/10 text-red-600 dark:text-red-400";
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      
      {/* Cabeçalho */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Análise de Cohort</h1>
          <p className="text-muted-foreground">
            Entenda a retenção de clientes por safra (mês de entrada).
          </p>
        </div>
        <div className="flex items-center gap-2">
           <Select defaultValue="2024">
            <SelectTrigger className="w-[120px]">
              <Calendar className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Ano" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2024">2024</SelectItem>
              <SelectItem value="2023">2023</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" /> Exportar
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* CARD DO HEATMAP (A Tabela Colorida) */}
        <Card className="md:col-span-2 lg:col-span-1 xl:col-span-1">
          <CardHeader>
             <div className="flex items-center justify-between">
              <CardTitle>Retenção por Safra</CardTitle>
              <Filter className="h-4 w-4 text-muted-foreground cursor-pointer hover:text-foreground" />
             </div>
             <CardDescription>Porcentagem de clientes ativos mês a mês.</CardDescription>
          </CardHeader>
          <CardContent className="overflow-x-auto">
            <div className="min-w-[500px]">
              {/* Cabeçalho da Tabela */}
              <div className="grid grid-cols-8 gap-1 mb-2 text-xs font-medium text-muted-foreground text-center">
                <div className="col-span-2 text-left pl-2">Safra</div>
                <div>M0</div>
                <div>M1</div>
                <div>M2</div>
                <div>M3</div>
                <div>M4</div>
                <div>M5</div>
              </div>

              {/* Linhas da Tabela */}
              <div className="space-y-1">
                {cohortData.map((row, i) => (
                  <div key={i} className="grid grid-cols-8 gap-1 text-sm">
                    {/* Coluna da Data/Usuários */}
                    <div className="col-span-2 flex flex-col justify-center px-2 py-1 bg-muted/30 rounded-md">
                      <span className="font-semibold text-foreground">{row.month}</span>
                      <span className="text-xs text-muted-foreground">{row.users} users</span>
                    </div>

                    {/* Células de Porcentagem */}
                    {row.retention.map((value, idx) => (
                      <div 
                        key={idx} 
                        className={`flex items-center justify-center rounded-md font-medium transition-colors ${getCellColor(value)}`}
                      >
                        {value ? `${value}%` : '-'}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
            
            <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
              <Info className="h-3 w-3" />
              <span>Cores mais quentes indicam maior taxa de cancelamento (Churn).</span>
            </div>
          </CardContent>
        </Card>

        {/* CARD DO GRÁFICO (Curvas de Retenção) */}
        <Card className="md:col-span-2 lg:col-span-1 xl:col-span-1">
          <CardHeader>
            <CardTitle>Curva de Decaimento</CardTitle>
            <CardDescription>Comparativo de retenção entre os 3 primeiros meses do ano.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={retentionCurveData}>
                  <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#27272a' : '#e5e7eb'} vertical={false} />
                  <XAxis 
                    dataKey="month" 
                    stroke={isDark ? '#a1a1aa' : '#71717a'} 
                    fontSize={12} 
                    tickLine={false} 
                    axisLine={false} 
                  />
                  <YAxis 
                    stroke={isDark ? '#a1a1aa' : '#71717a'} 
                    fontSize={12} 
                    tickLine={false} 
                    axisLine={false} 
                    tickFormatter={(value) => `${value}%`} 
                    domain={[60, 100]}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: isDark ? '#18181b' : '#ffffff', 
                      borderColor: isDark ? '#27272a' : '#e5e7eb',
                      color: isDark ? '#fff' : '#000'
                    }}
                  />
                  <Legend />
                  <Line type="monotone" dataKey="jan" name="Jan 24" stroke="#6366f1" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                  <Line type="monotone" dataKey="fev" name="Fev 24" stroke="#ec4899" strokeWidth={2} dot={{ r: 4 }} />
                  <Line type="monotone" dataKey="mar" name="Mar 24" stroke="#10b981" strokeWidth={2} dot={{ r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Seção Extra: Insights Rápidos */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="bg-indigo-500/5 border-indigo-500/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-indigo-600 dark:text-indigo-400">Melhor Safra</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">Março 2024</div>
            <p className="text-xs text-muted-foreground">95% de retenção no mês 1</p>
          </CardContent>
        </Card>
        <Card className="bg-orange-500/5 border-orange-500/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-orange-600 dark:text-orange-400">Ponto de Atenção</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">Mês 3</div>
            <p className="text-xs text-muted-foreground">Queda média acentuada (-5%)</p>
          </CardContent>
        </Card>
        <Card>
           <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Retenção Média (Global)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">84.5%</div>
            <p className="text-xs text-muted-foreground">Após 3 meses de uso</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}