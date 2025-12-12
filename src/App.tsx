import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from "./pages/auth/Login";
import { AppLayout } from "./components/layout/AppLayout";
import { Dashboard } from "./pages/app/Dashboard";
import { Customers } from "./pages/app/Customers";
import { CohortAnalysis } from "./pages/app/CohortAnalysis";
import { Settings } from "./pages/app/Settings"; // <--- 1. Importar

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route path="/" element={<AppLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="clientes" element={<Customers />} />
          <Route path="analises" element={<CohortAnalysis />} />
          {/* 2. Atualizar a rota */}
          <Route path="configuracoes" element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}