import { EditTask } from "./components/EditDialog";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import { CreateNewTask } from "./components/NewTaskDialog";
import "tailwindcss";

export const App = () => {
  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "ID",
      width: 70,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "firstName",
      headerName: "First name",
      width: 130,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "lastName",
      headerName: "Last name",
      width: 130,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "age",
      headerName: "Age",
      type: "number",
      width: 90,
      align: "center",
      headerAlign: "center",
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

  const rows = [
    { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
    { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
    { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
    { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
    { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
    { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
    { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
    { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
    { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
  ];

  const paginationModel = { page: 0, pageSize: 5 };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Paper
        sx={{
          height: 400,
          width: "100%",
          maxWidth: 600,
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
              backgroundColor: "#f67828",
            },
            "& .MuiDataGrid-root": {
              minWidth: "100%",
            },
          }}
        />
      </Paper>
      <CreateNewTask />
    </div>
  );
};
