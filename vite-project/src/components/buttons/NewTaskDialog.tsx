import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog, { type DialogProps } from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import BackspaceIcon from "@mui/icons-material/Backspace";
import AddIcon from "@mui/icons-material/Add";
import type { IToDo } from "../../App";
import { useForm, Controller } from "react-hook-form";
import SendAsIcon from "@mui/icons-material/Send";
import { addDays } from "date-fns";
import dayjs, { Dayjs } from "dayjs";
import toast, { Toaster } from "react-hot-toast";
import { api } from "../../services/api";
interface INewTask {
  titulo: string;
  prazofinal: Dayjs;
}

export const salvarTask = async (data: IToDo) => {
  data.id = undefined;
  const response = await api.post("todos", data);
  console.log(response.data);
  return toast.success("Tarefa criada com sucesso");
};

export const CreateNewTask = () => {
  const [open, setOpen] = React.useState(false);
  const [fullWidth] = React.useState(true);
  const [maxWidth] = React.useState<DialogProps["maxWidth"]>("sm");

  const { control, handleSubmit } = useForm({
    defaultValues: {
      titulo: "",
      prazofinal: dayjs(addDays(new Date(), 1)),
    },
  });

  const handleCriarTask = (data: INewTask) => {
    const hoje = new Date();
    const prazo = data.prazofinal.toDate();

    hoje.setHours(0, 0, 0, 0);
    prazo.setHours(0, 0, 0, 0);

    if (prazo < hoje) {
      toast.error("Essa data já passou");
      return;
    }

    const saveNewTask: IToDo = {
      id: -1,
      titulo: data.titulo,
      criadoem: hoje,
      prazofinal: prazo,
      concluido: false,
    };
    salvarTask(saveNewTask);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <div>
        <Toaster />
      </div>
      <Button
        variant="text"
        size="small"
        sx={{ fontSize: 12, minWidth: "unset", color: "#f67828" }}
        startIcon={<AddIcon />}
        onClick={handleClickOpen}
      >
        Nova Tarefa
      </Button>
      <Dialog
        fullWidth={fullWidth}
        maxWidth={maxWidth}
        open={open}
        onClose={handleClose}
      >
        <div className="flex justify-between">
          <DialogTitle>Nova Tarefa:</DialogTitle>
          <DialogTitle>
            <Button
              onClick={handleClose}
              startIcon={<BackspaceIcon sx={{ color: "#f67828" }} />}
              sx={{ color: "#f67828" }}
            >
              Limpar
            </Button>
          </DialogTitle>
        </div>
        <form onSubmit={handleSubmit(handleCriarTask)}>
          <DialogContent>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                m: "auto",
                width: "100%",
              }}
            >
              <Controller
                name="titulo"
                control={control}
                render={({ field }) => {
                  return (
                    <TextField
                      id="outlined-basic"
                      label="Tarefa"
                      variant="outlined"
                      {...field}
                    />
                  );
                }}
              />
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DatePicker"]}>
                  <Controller
                    name="prazofinal"
                    control={control}
                    render={({ field }) => {
                      return (
                        <DatePicker
                          label="Prazo"
                          slotProps={{ textField: { fullWidth: true } }}
                          {...field}
                        />
                      );
                    }}
                  />
                </DemoContainer>
              </LocalizationProvider>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={handleClose}
              startIcon={<HighlightOffIcon sx={{ color: "#f67828" }} />}
              sx={{ color: "#f67828" }}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              variant="contained"
              size="small"
              sx={{
                fontSize: 12,
                minWidth: "unset",
              }}
              endIcon={<SendAsIcon sx={{ fontSize: 10 }} />}
            >
              Adicionar
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </React.Fragment>
  );
};
