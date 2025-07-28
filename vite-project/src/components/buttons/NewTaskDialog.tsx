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
import dayjs, { Dayjs } from "dayjs";
import toast, { Toaster } from "react-hot-toast";
export interface INewTask {
  titulo: string;
  prazofinal: Dayjs;
}

export const CreateNewTask = (props: {
  dadosTabelaUnsave: IToDo[];
  setdadosTabelaUnsave: React.Dispatch<React.SetStateAction<IToDo[]>>;
}) => {
  const [open, setOpen] = React.useState(false);
  const [fullWidth] = React.useState(true);
  const [maxWidth] = React.useState<DialogProps["maxWidth"]>("sm");

  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      titulo: "",
      prazofinal: dayjs(new Date()),
    },
  });

  const handleClear = () => {
    reset({
      titulo: "",
      prazofinal: dayjs(new Date()),
    });
  };

  const handleCriarTask = (data: INewTask) => {
    let idNeg = -1;
    const hoje = new Date();
    const prazo = data.prazofinal.toDate();

    hoje.setHours(0, 0, 0, 0);
    prazo.setHours(0, 0, 0, 0);

    if (prazo < hoje) {
      handleClose();
      toast.error("Essa data já passou");
      return;
    }

    props.dadosTabelaUnsave.forEach((element) => {
      if (typeof element.id === "number" && element.id <= idNeg) {
        idNeg = element.id - 1;
      }
    });

    const newTask: IToDo = {
      id: idNeg--,
      titulo: data.titulo,
      criadoem: hoje,
      prazofinal: prazo,
      concluido: false,
    };

    const newArray = [...props.dadosTabelaUnsave, newTask];
    props.setdadosTabelaUnsave(newArray);

    handleClose();
    toast.success("Tarefa criada com sucesso");
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
              onClick={handleClear}
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
