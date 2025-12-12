import { useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Calendar, Download, Info, ArrowUp, ArrowDown } from "lucide-react"; 
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { useTheme } from "@/components/theme-provider";

// --- 1. GERADOR DE DADOS HISTÓRICOS ---
const generateCohortData = () => {
  const months = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun"];
  
  return months.map((month, index) => {
    const users = Math.floor(Math.random() * 100) + 100;
    const retention: (number | null)[] = [100]; 
    let current = 100;
    
    for (let i = 1; i < months.length - index; i++) {
      const drop = Math.random() * 6 + 2; 
      current = Math.max(0, current - drop);
      retention.push(Number(current.toFixed(1)));
    }

    while (retention.length < 6) {
      retention.push(null);
    }

    return { month: `${month} 24`, users, retention };
  });
};

export function CohortAnalysis() {
  const { theme } = useTheme();
  const isDark = theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);

  const cohortData = useMemo(() => generateCohortData(), []);

  const chartData = useMemo(() => {
    return Array.from({ length: 6 }).map((_, monthIndex) => {
      
      const point: any = { name: `Mês ${monthIndex}` };
      cohortData.slice(0, 3).forEach((cohort) => {
        point[cohort.month] = cohort.retention[monthIndex];
      });
      return point;
    });
  }, [cohortData]);

  const bestCohort = useMemo(() => {
    return [...cohortData].sort((a, b) => (b.retention[1] || 0) - (a.retention[1] || 0))[0];
  }, [cohortData]);

  const avgRetentionM3 = useMemo(() => {
    const validCohorts = cohortData.filter(c => c.retention[3] !== null);
    if (validCohorts.length === 0) return 0;
    const sum = validCohorts.reduce((acc, c) => acc + (c.retention[3] as number), 0);
    return (sum / validCohorts.length).toFixed(1);
  }, [cohortData]);

  const getCellColor = (value: number | null) => {
    if (value === null) return "bg-transparent"; 
    if (value === 100) return "bg-muted text-muted-foreground font-normal";
    if (value >= 90) return "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 font-medium";
    if (value >= 80) return "bg-emerald-500/5 text-emerald-600 dark:text-emerald-500";
    if (value >= 60) return "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400";
    return "bg-red-500/10 text-red-600 dark:text-red-400 font-bold";
  };

  return (
   
    <div className="space-y-4 animate-in fade-in duration-500">
      
      {/* Cabeçalho */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Análise de Cohort</h1>
          <p className="text-sm text-muted-foreground">
            Acompanhe a retenção das safras de 2024.
          </p>
        </div>
        <div className="flex items-center gap-2">
           <Select defaultValue="2024">
            <SelectTrigger className="w-[100px] h-8 text-xs">
              <Calendar className="mr-2 h-3 w-3" />
              <SelectValue placeholder="Ano" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2024">2024</SelectItem>
              <SelectItem value="2023">2023</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm" className="h-8 text-xs">
            <Download className="mr-2 h-3 w-3" /> Exportar
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
       
        <Card className="md:col-span-2 lg:col-span-1 xl:col-span-1 border-border bg-card">
          <CardHeader className="pb-2">
             <div className="flex items-center justify-between">
              <CardTitle className="text-base">Retenção por Safra</CardTitle>
             </div>
             <CardDescription className="text-xs">Visualização matricial da perda de clientes.</CardDescription>
          </CardHeader>
          
         
          <CardContent>
            <div className="w-full">
              {/* Header Tabela */}
              <div className="grid grid-cols-8 gap-1 mb-2 text-[10px] font-medium text-muted-foreground text-center uppercase tracking-wider">
                <div className="col-span-2 text-left pl-1">Safra</div>
                <div>M0</div>
                <div>M1</div>
                <div>M2</div>
                <div>M3</div>
                <div>M4</div>
                <div>M5</div>
              </div>

              {/* Linhas */}
              <div className="space-y-1">
                {cohortData.map((row, i) => (
                  <div key={i} className="grid grid-cols-8 gap-1 text-xs">
                    {/* Safra */}
                    <div className="col-span-2 flex flex-col justify-center px-2 py-1 bg-muted/40 rounded-md border border-transparent">
                      <span className="font-semibold text-foreground truncate">{row.month}</span>
                      <span className="text-[9px] text-muted-foreground">{row.users} users</span>
                    </div>

                    {/* Células */}
                    {row.retention.map((value, idx) => (
                      <div 
                        key={idx} 
                        className={`flex items-center justify-center rounded-md text-[11px] transition-colors cursor-default ${getCellColor(value)}`}
                        title={value ? `${value}%` : ''}
                      >
                        {value ? `${value}%` : ''}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
            
            <div className="mt-3 flex items-center gap-2 text-[10px] text-muted-foreground bg-muted/20 p-1.5 rounded-md">
              <Info className="h-3 w-3" />
              <span>Cores quentes indicam churn alto.</span>
            </div>
          </CardContent>
        </Card>

        {/* --- GRÁFICO (ALTURA REDUZIDA) --- */}
        <Card className="md:col-span-2 lg:col-span-1 xl:col-span-1">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Curva de Decaimento</CardTitle>
            <CardDescription className="text-xs">Comparativo entre as 3 primeiras safras.</CardDescription>
          </CardHeader>
          <CardContent>
            {/* Altura reduzida para 250px */}
            <div className="h-[250px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#27272a' : '#e5e7eb'} vertical={false} />
                  <XAxis 
                    dataKey="name" 
                    stroke={isDark ? '#a1a1aa' : '#71717a'} 
                    fontSize={10} 
                    tickLine={false} 
                    axisLine={false} 
                  />
                  <YAxis 
                    stroke={isDark ? '#a1a1aa' : '#71717a'} 
                    fontSize={10} 
                    tickLine={false} 
                    axisLine={false} 
                    tickFormatter={(value) => `${value}%`} 
                    domain={[50, 100]}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: isDark ? '#18181b' : '#ffffff', 
                      borderColor: isDark ? '#27272a' : '#e5e7eb', 
                      color: isDark ? '#fff' : '#000',
                      borderRadius: '8px',
                      fontSize: '12px'
                    }}
                  />
                  <Legend wrapperStyle={{ fontSize: '12px', marginTop: '10px' }}/>
                  <Line type="monotone" dataKey={cohortData[0].month} stroke="#6366f1" strokeWidth={2} dot={{r: 3}} activeDot={{r: 5}} />
                  <Line type="monotone" dataKey={cohortData[1].month} stroke="#ec4899" strokeWidth={2} dot={false} />
                  <Line type="monotone" dataKey={cohortData[2].month} stroke="#10b981" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* --- INSIGHTS (MAIS COMPACTOS) --- */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="bg-indigo-500/5 border-indigo-500/20 shadow-none">
          <CardHeader className="pb-2 pt-4">
            <CardTitle className="text-sm font-medium text-indigo-600 dark:text-indigo-400 flex items-center gap-2">
              <ArrowUp className="h-4 w-4" /> Melhor Performance
            </CardTitle>
          </CardHeader>
          <CardContent className="pb-4">
            <div className="text-xl font-bold text-foreground">{bestCohort.month}</div>
            <p className="text-[10px] text-muted-foreground">
              {bestCohort.retention[1]}% retidos após 1 mês
            </p>
          </CardContent>
        </Card>

        <Card className="bg-orange-500/5 border-orange-500/20 shadow-none">
          <CardHeader className="pb-2 pt-4">
            <CardTitle className="text-sm font-medium text-orange-600 dark:text-orange-400 flex items-center gap-2">
              <ArrowDown className="h-4 w-4" /> Ponto de Fricção
            </CardTitle>
          </CardHeader>
          <CardContent className="pb-4">
            <div className="text-xl font-bold text-foreground">Mês 1</div>
            <p className="text-[10px] text-muted-foreground">
              Maior queda média da base.
            </p>
          </CardContent>
        </Card>
        
        <Card className="shadow-none">
           <CardHeader className="pb-2 pt-4">
            <CardTitle className="text-sm font-medium text-muted-foreground">Retenção (Mês 3)</CardTitle>
          </CardHeader>
          <CardContent className="pb-4">
            <div className="text-xl font-bold text-foreground">{avgRetentionM3}%</div>
            <p className="text-[10px] text-muted-foreground">Média global em 2024</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}