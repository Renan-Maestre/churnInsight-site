import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { MoreHorizontal, ArrowUpDown, Search, Filter, Download, AlertCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

// Dados simulados com foco em Risco
const clients = [
  { id: "1", name: "Tech Solutions Ltd", email: "contact@techsol.com", status: "Crítico", risk: 92, value: "R$ 1.200", lastAccess: "há 12 dias", logo: "TS" },
  { id: "2", name: "Acme Corp", email: "admin@acme.com", status: "Alerta", risk: 65, value: "R$ 3.500", lastAccess: "há 2 dias", logo: "AC" },
  { id: "3", name: "Globex Inc", email: "suporte@globex.com", status: "Saudável", risk: 12, value: "R$ 890", lastAccess: "há 3 horas", logo: "GL" },
  { id: "4", name: "Stark Industries", email: "tony@stark.com", status: "Saudável", risk: 5, value: "R$ 12.000", lastAccess: "agora", logo: "SI" },
  { id: "5", name: "Umbrella Corp", email: "wesker@umbrella.com", status: "Crítico", risk: 88, value: "R$ 5.600", lastAccess: "há 25 dias", logo: "UC" },
  { id: "6", name: "Cyberdyne Systems", email: "skynet@cyber.com", status: "Alerta", risk: 45, value: "R$ 9.100", lastAccess: "há 5 dias", logo: "CS" },
];

export function Customers() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      
      {/* Cabeçalho */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Clientes em Risco</h1>
          <p className="text-muted-foreground">
            Monitore a saúde da sua base e aja antes do cancelamento.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" /> Exportar
          </Button>
          <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
            <AlertCircle className="mr-2 h-4 w-4" /> Ver Críticos
          </Button>
        </div>
      </div>

      {/* Card da Tabela */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <CardTitle>Base de Clientes</CardTitle>
              <CardDescription>
                Gerencie {clients.length} clientes monitorados.
              </CardDescription>
            </div>
            {/* Filtros */}
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Buscar empresa..." 
                  className="pl-9 w-[200px] lg:w-[300px]" 
                />
              </div>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[300px]">Cliente</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>
                  <div className="flex items-center gap-2 cursor-pointer hover:text-foreground">
                    Risco de Churn <ArrowUpDown className="h-4 w-4" />
                  </div>
                </TableHead>
                <TableHead>Receita (ARR)</TableHead>
                <TableHead>Último Acesso</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {clients.map((client) => (
                <TableRow key={client.id}>
                  {/* Coluna: Cliente */}
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-9 w-9 border">
                        <AvatarImage src={`https://ui-avatars.com/api/?name=${client.name}&background=random`} />
                        <AvatarFallback>{client.logo}</AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <span className="font-medium text-foreground">{client.name}</span>
                        <span className="text-xs text-muted-foreground">{client.email}</span>
                      </div>
                    </div>
                  </TableCell>

                  {/* Coluna: Status (Badge Dinâmica) */}
                  <TableCell>
                    <Badge 
                      variant="outline" 
                      className={`
                        ${client.status === 'Crítico' ? 'border-red-500 text-red-500 bg-red-500/10' : ''}
                        ${client.status === 'Alerta' ? 'border-orange-500 text-orange-500 bg-orange-500/10' : ''}
                        ${client.status === 'Saudável' ? 'border-emerald-500 text-emerald-500 bg-emerald-500/10' : ''}
                      `}
                    >
                      {client.status}
                    </Badge>
                  </TableCell>

                  {/* Coluna: Barra de Risco */}
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="h-2 w-24 rounded-full bg-secondary overflow-hidden">
                        <div 
                          className={`h-full rounded-full transition-all ${
                            client.risk > 80 ? 'bg-red-500' : 
                            client.risk > 40 ? 'bg-orange-500' : 'bg-emerald-500'
                          }`} 
                          style={{ width: `${client.risk}%` }} 
                        />
                      </div>
                      <span className="text-xs font-medium text-muted-foreground">{client.risk}%</span>
                    </div>
                  </TableCell>

                  {/* Outras Colunas */}
                  <TableCell className="font-mono text-sm">{client.value}</TableCell>
                  <TableCell className="text-muted-foreground text-sm">{client.lastAccess}</TableCell>

                  {/* Menu de Ações */}
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Abrir menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Ações</DropdownMenuLabel>
                        <DropdownMenuItem>Ver Detalhes do Risco</DropdownMenuItem>
                        <DropdownMenuItem>Enviar Email de Retenção</DropdownMenuItem>
                        <DropdownMenuItem className="text-red-500 focus:text-red-500">
                          Marcar como Perdido
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}