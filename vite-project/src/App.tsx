import { EditTask } from "./components/buttons/EditDialog";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import { CreateNewTask } from "./components/buttons/NewTaskDialog";
import { Checkboxes } from "./components/Checkbox";
import { SaveTaskButton } from "./components/buttons/SaveTask";
import DeleteIcon from "@mui/icons-material/Delete";
import "tailwindcss";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { api } from "./services/api";

interface IToDo {
  id: number;
  titulo: string;
  criadoem: Date;
  prazofinal: Date;
  concluido: boolean;
}

export const App = () => {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      titulo: "",
      criadoem: new Date(),
    },
  });

  const carregarDados = async () => {
    const response = await api.get<IToDo[]>("todos");
    console.log(response.data);
    return setdadosTabela(response.data);
  };

  useEffect(() => {
    carregarDados();
  }, []);

  const [dadosTabela, setdadosTabela] = useState<IToDo[]>([]);

  const columns: GridColDef[] = [
    {
      field: "titulo",
      headerName: "Atividade",
      width: 130,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "criadoem",
      headerName: "Criado em",
      width: 130,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "prazofinal",
      headerName: "Prazo final ",
      width: 130,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "concluido",
      headerName: "Concluído",
      type: "singleSelect",
      width: 130,
      align: "center",
      headerAlign: "center",
      renderCell: () => <Checkboxes />,
    },

    {
      field: "editar",
      headerName: "Editar",
      description: "Edite suas tarefas",
      sortable: false,
      width: 160,
      align: "center",
      headerAlign: "center",
      renderCell: () => <EditTask />,
    },
  ];
  const rows = dadosTabela.map((dado) => ({
    id: dado.id,
    titulo: dado.titulo,
    criadoem: dado.criadoem,
    prazofinal: dado.prazofinal,
  }));

  const paginationModel = { page: 0, pageSize: 5 };

  return (
    <div className="flex justify-center items-center min-h-screen min-w-screen bg-[#eafcfb] ">
      <div className="flex items-center flex-col w-5/12 shadow-md">
        <div className="bg-[#f67828] w-full h-25 flex items-center justify-start">
          <h1 className="font-bold text-4xl text-[#fff] p-3">NL</h1>
        </div>
        <div className="flex justify-end w-3/4 max-w-800 relative top-6">
          <Button
            variant="text"
            size="small"
            disabled
            startIcon={<DeleteIcon />}
          >
            Excluir
          </Button>
        </div>
        <div className="flex justify-center h-full w-full p-8 bg-[#fff]">
          <div className="flex flex-col items-center justify-center min-w-3/4">
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
                checkboxSelection
                sx={{
                  "& .MuiDataGrid-cell": {
                    justifyContent: "center",
                    display: "flex",
                    alignItems: "center",
                    textAlign: "center",
                  },
                  "& .MuiDataGrid-columnHeader": {
                    justifyContent: "center",
                    display: "flex",
                    alignItems: "center",
                  },
                }}
              />
            </Paper>
          </div>
        </div>
        <div className="flex justify-end w-full p-5 gap-2">
          <CreateNewTask />
          <SaveTaskButton />
        </div>
      </div>
    </div>
  );
};
