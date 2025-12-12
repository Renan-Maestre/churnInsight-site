import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MoreHorizontal, Search, Download, X } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
 
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

// --- GERADOR DE DADOS COERENTES ---
const generateClients = () => {
  return Array.from({ length: 50 }).map((_, i) => {
   
    const risk = Math.floor(Math.random() * 100);
    
    // 2. O Status é derivado do risco (Coerência garantida)
    let status = "Saudável";
    if (risk >= 80) status = "Crítico";
    else if (risk >= 40) status = "Alerta";

    return {
      id: i.toString(),
      name: `Empresa ${i + 1} Ltda`,
      email: `contato@empresa${i + 1}.com`,
      status: status,
      risk: risk,
      value: `R$ ${(Math.random() * 10000 + 1000).toFixed(2)}`, 
      lastAccess: `há ${Math.floor(Math.random() * 30)} dias`,
      logo: `E${i + 1}`
    };
  });
};

const allClients = generateClients();

export function Customers() {
  // --- ESTADOS ---
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [riskFilter, setRiskFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;

  // --- LÓGICA DE FILTRAGEM ---
  const filteredClients = allClients.filter(client => {
    const matchesSearch = 
      client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || client.status === statusFilter;

    // Filtro de risco coerente com a nova lógica
    let matchesRisk = true;
    if (riskFilter === "high") matchesRisk = client.risk >= 80;
    if (riskFilter === "medium") matchesRisk = client.risk >= 40 && client.risk < 80;
    if (riskFilter === "low") matchesRisk = client.risk < 40;

    return matchesSearch && matchesStatus && matchesRisk;
  });

  // --- PAGINAÇÃO ---
  const totalPages = Math.ceil(filteredClients.length / itemsPerPage);
  
  if (currentPage > totalPages && totalPages > 0) {
    setCurrentPage(1);
  }

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentClients = filteredClients.slice(startIndex, endIndex);

  const clearFilters = () => {
    setSearchTerm("");
    setStatusFilter("all");
    setRiskFilter("all");
    setCurrentPage(1);
  };

  const hasActiveFilters = searchTerm !== "" || statusFilter !== "all" || riskFilter !== "all";

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Clientes</h1>
          <p className="text-muted-foreground">
            Gerencie sua base de clientes e monitore sinais vitais.
          </p>
        </div>
        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" /> Exportar CSV
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <CardTitle>Lista de Clientes</CardTitle>
                <CardDescription>
                  Mostrando <strong>{filteredClients.length}</strong> resultados.
                </CardDescription>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                <div className="relative flex-1 sm:w-[250px]">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input 
                    placeholder="Buscar cliente..." 
                    className="pl-9"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>

                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-full sm:w-[140px]">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos Status</SelectItem>
                    <SelectItem value="Saudável">Saudável</SelectItem>
                    <SelectItem value="Alerta">Alerta</SelectItem>
                    <SelectItem value="Crítico">Crítico</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={riskFilter} onValueChange={setRiskFilter}>
                  <SelectTrigger className="w-full sm:w-[140px]">
                    <SelectValue placeholder="Risco" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todo Risco</SelectItem>
                    <SelectItem value="high">Alto (&gt;80%)</SelectItem>
                    <SelectItem value="medium">Médio (40-80%)</SelectItem>
                    <SelectItem value="low">Baixo (&lt;40%)</SelectItem>
                  </SelectContent>
                </Select>

                {hasActiveFilters && (
                  <Button variant="ghost" size="icon" onClick={clearFilters} title="Limpar Filtros">
                    <X className="h-4 w-4 text-muted-foreground" />
                  </Button>
                )}
              </div>
            </div>
          </div>
        </CardHeader>
        
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Cliente</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Risco Calculado</TableHead>
                <TableHead>Receita</TableHead>
                <TableHead className="hidden md:table-cell">Acesso</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentClients.length > 0 ? (
                currentClients.map((client) => (
                  <TableRow key={client.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-9 w-9 border hidden sm:flex">
                          <AvatarFallback>{client.logo}</AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col">
                          <span className="font-medium text-foreground">{client.name}</span>
                          <span className="text-xs text-muted-foreground">{client.email}</span>
                        </div>
                      </div>
                    </TableCell>

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

                    <TableCell>
                      <div className="flex flex-col gap-1 w-[80px]">
                        <span className="text-xs font-medium text-muted-foreground">{client.risk}%</span>
                        <div className="h-1.5 w-full rounded-full bg-secondary overflow-hidden">
                          <div 
                            className={`h-full rounded-full ${
                              client.risk >= 80 ? 'bg-red-500' : 
                              client.risk >= 40 ? 'bg-orange-500' : 'bg-emerald-500'
                            }`} 
                            style={{ width: `${client.risk}%` }} 
                          />
                        </div>
                      </div>
                    </TableCell>

                    <TableCell className="font-mono text-sm">{client.value}</TableCell>
                    <TableCell className="hidden md:table-cell text-muted-foreground text-sm">{client.lastAccess}</TableCell>

                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Ações</DropdownMenuLabel>
                          <DropdownMenuItem>Ver Perfil</DropdownMenuItem>
                          <DropdownMenuItem className="text-red-500">Alertar Gerente</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="h-24 text-center text-muted-foreground">
                    Nenhum cliente encontrado.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>

        <CardFooter className="flex justify-center border-t p-4">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious 
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))} 
                  className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                />
              </PaginationItem>
              
              <div className="flex items-center gap-1 mx-2 text-sm text-muted-foreground">
                Página {currentPage} de {Math.max(1, totalPages)}
              </div>

              <PaginationItem>
                <PaginationNext 
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  className={currentPage >= totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </CardFooter>
      </Card>
    </div>
  );
}