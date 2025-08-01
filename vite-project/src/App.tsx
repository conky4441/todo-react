import { EditTask } from "./components/buttons/EditDialog";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import { CreateNewTask } from "./components/buttons/NewTaskDialog";
import Checkbox from "@mui/material/Checkbox";
import "tailwindcss";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { api } from "./services/api";
import SaveAsIcon from "@mui/icons-material/SaveAs";
import toast, { Toaster } from "react-hot-toast";
import { AlertExclude } from "./components/buttons/DeleteTask";

export interface IToDo {
  id?: number;
  titulo: string;
  criadoem: Date;
  prazofinal: Date;
  concluido: boolean;
}

export const App = () => {
  const carregarDados = async () => {
    const response = await api.get<IToDo[]>("/todos");

    setdadosTabelaUnsave(response.data);
    setdadosTabela(response.data);
  };

  const salvarTask = async () => {
    const tasksUnsave: IToDo[] = [];
    const newElements = dadosTabelaUnsave.filter(
      (a) => typeof a.id === "number" && a.id <= -1
    );

    //Salvar nova Task
    if (newElements.length !== 0) {
      newElements.forEach((element) => {
        element.id = undefined;
        tasksUnsave.push(element);
      });

      try {
        await Promise.all(tasksUnsave.map((task) => api.post("/todos", task)));
        sessionStorage.setItem("saveSuccess", "true");
      } catch (e) {
        toast.error(`Houve o seguinte erro: ${e}`);
      }
    }

    //Salvar se alterada
    try {
      await Promise.all(
        dadosTabelaUnsave.map((task) => api.put(`/todos/${task.id}`, task))
      );
      sessionStorage.setItem("saveSuccess", "true");
    } catch (e) {
      toast.error(`Houve o seguinte erro ${e}`);
    }
  };

  const [dadosTabela, setdadosTabela] = useState<IToDo[]>([]);
  const [dadosTabelaUnsave, setdadosTabelaUnsave] = useState<IToDo[]>([]);

  const canSave = (id: number, concluido: boolean) => {
    const novaLista = dadosTabelaUnsave.map((a: IToDo) =>
      a.id === id ? { ...a, concluido } : a
    );
    setdadosTabelaUnsave(novaLista);
  };

  const rows = dadosTabelaUnsave.map((dado) => ({
    id: dado.id,
    titulo: dado.titulo,
    criadoem: dado.criadoem.toLocaleDateString("pt-BR"),
    prazofinal: dado.prazofinal.toLocaleDateString("pt-BR"),
    concluido: dado.concluido,
  }));

  useEffect(() => {
    const saveSuccess = sessionStorage.getItem("saveSuccess");
    const saveFail = sessionStorage.getItem("saveFail");
    const saveDelete = sessionStorage.getItem("saveDelete");

    carregarDados();
    if (saveSuccess === "true") {
      toast.success("Lista de tarefas salva com sucesso");
      sessionStorage.removeItem("saveSuccess");
    }
    if (saveFail === "true") {
      toast.error("Houve um erro ao atualizar a lista");
      sessionStorage.removeItem("saveFail");
    }

    if (saveDelete === "true") {
      toast.success("Tarefa excluída com sucesso");
      sessionStorage.removeItem("saveDelete");
    }
  }, []);

  const columns: GridColDef[] = [
    {
      field: "titulo",
      headerName: "Atividade",
      flex: 1,
      minWidth: 180,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "criadoem",
      headerName: "Criado em",
      width: 160,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "prazofinal",
      headerName: "Prazo final",
      width: 160,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "concluido",
      headerName: "Concluído",
      width: 130,
      align: "center",
      headerAlign: "center",
      renderCell: ({ row }) => {
        return (
          <Checkbox
            checked={row.concluido}
            onChange={(e) => {
              canSave(row.id, e.target.checked);
            }}
            inputProps={{ "aria-label": "controlled" }}
          />
        );
      },
    },

    {
      field: "editar",
      headerName: "Editar",
      description: "Edite suas tarefas",
      sortable: false,
      width: 120,
      align: "center",
      headerAlign: "center",
      renderCell: ({ row }) => {
        return (
          <EditTask
            id={row.id}
            dadosTabelaUnsave={dadosTabelaUnsave}
            setdadosTabelaUnsave={setdadosTabelaUnsave}
          />
        );
      },
    },
    {
      field: "excluir",
      headerName: "Excluir",
      description: "Exclua uma tarefa",
      sortable: false,
      width: 70,
      align: "center",
      headerAlign: "center",
      renderCell: ({ row }) => {
        return (
          <AlertExclude
            id={row.id}
            dadosTabela={dadosTabela}
            dadosTabelaUnsave={dadosTabelaUnsave}
            setdadosTabelaUnsave={setdadosTabelaUnsave}
          />
        );
      },
    },
  ];

  const paginationModel = { page: 0, pageSize: 5 };

  return (
    <>
      <div>
        <Toaster />
      </div>
      <div className="flex justify-center items-center min-h-screen min-w-screen bg-[#eafcfb] ">
        <div className="flex items-center flex-col w-full max-w-[900px] shadow-md">
          <div className="bg-[#f67828] w-full h-25 flex items-center justify-start">
            <h1 className="font-bold text-4xl text-[#fff] p-3">NL</h1>
          </div>
          <div className="flex justify-end w-full max-w-800 mr-15 relative top-6"></div>
          <div className="flex justify-center h-full w-full p-8 bg-[#fff]">
            <div className="flex flex-col items-center justify-center w-full">
              <Paper
                sx={{
                  height: 400,
                  width: "100%",
                  maxWidth: 900,
                }}
              >
                <DataGrid
                  rows={rows}
                  columns={columns}
                  initialState={{ pagination: { paginationModel } }}
                  pageSizeOptions={[5, 10]}
                  sx={{
                    "& .MuiDataGrid-cell": {
                      justifyContent: "center",
                      alignItems: "center",
                      textAlign: "center",
                      whiteSpace: "normal",
                      wordWrap: "break-word",
                    },
                    "& .MuiDataGrid-columnHeader": {
                      justifyContent: "center",
                      alignItems: "center",
                      textAlign: "center",
                    },
                  }}
                />
              </Paper>
            </div>
          </div>
          <div className="flex justify-end w-full gap-2">
            <CreateNewTask
              dadosTabelaUnsave={dadosTabelaUnsave}
              setdadosTabelaUnsave={setdadosTabelaUnsave}
            />
            <Button
              onClick={salvarTask}
              variant="contained"
              disabled={
                JSON.stringify(dadosTabela) ===
                JSON.stringify(dadosTabelaUnsave)
              }
              size="small"
              sx={{
                fontSize: 12,
                minWidth: "unset",
              }}
              startIcon={<SaveAsIcon sx={{ fontSize: 10 }} />}
            >
              Salvar
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};
