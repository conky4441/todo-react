import * as React from "react";
import Box from "@mui/material/Box";
import { Button, IconButton } from "@mui/material"; // Importe o IconButton
import Dialog, { type DialogProps } from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import SaveIcon from "@mui/icons-material/Save";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import BackspaceIcon from "@mui/icons-material/Backspace";
import EditSquareIcon from "@mui/icons-material/EditSquare";
import toast from "react-hot-toast";
import { Controller, useForm } from "react-hook-form";
import dayjs from "dayjs";
import type { IToDo } from "../../App";
import type { INewTask } from "./NewTaskDialog";

export const EditTask = (props: {
  id: number;
  dadosTabelaUnsave: IToDo[];
  setdadosTabelaUnsave: React.Dispatch<React.SetStateAction<IToDo[]>>;
}) => {
  const [open, setOpen] = React.useState(false);
  const [fullWidth] = React.useState(true);
  const [maxWidth] = React.useState<DialogProps["maxWidth"]>("sm");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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
  const handleEditarTask = (data: INewTask) => {
    const hoje = new Date();
    const novoPrazo = data.prazofinal.toDate();

    hoje.setHours(0, 0, 0, 0);
    novoPrazo.setHours(0, 0, 0, 0);

    if (novoPrazo < hoje) {
      handleClose();
      toast.error("A data informada já passou");
      return;
    }

    const newArray: IToDo[] = props.dadosTabelaUnsave.map((a) =>
      a.id === props.id
        ? { ...a, titulo: data.titulo, prazofinal: data.prazofinal.toDate() }
        : a
    );

    props.setdadosTabelaUnsave(newArray);

    handleClose();
    toast.success("Tarefa criada com sucesso");
  };

  return (
    <React.Fragment>
      <IconButton
        sx={{ color: "#f67828" }}
        aria-label="edit"
        color="primary"
        onClick={handleClickOpen}
      >
        <EditSquareIcon />
      </IconButton>
      <Dialog
        fullWidth={fullWidth}
        maxWidth={maxWidth}
        open={open}
        onClose={handleClose}
      >
        <div className="flex text-start justify-between">
          <DialogTitle>Editar:</DialogTitle>
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
        <form onSubmit={handleSubmit(handleEditarTask)}>
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
              sx={{ color: "#f67828" }}
              startIcon={<HighlightOffIcon sx={{ color: "#f67828" }} />}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              sx={{
                backgroundColor: "#f67828",
              }}
              variant="contained"
              startIcon={<SaveIcon />}
            >
              Salvar
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </React.Fragment>
  );
};
