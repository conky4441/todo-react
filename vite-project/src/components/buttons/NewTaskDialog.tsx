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
import { SaveTaskButton } from "./SaveTask";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import BackspaceIcon from "@mui/icons-material/Backspace";
import AddIcon from "@mui/icons-material/Add";

export const CreateNewTask = () => {
  const [open, setOpen] = React.useState(false);
  const [fullWidth] = React.useState(true);
  const [maxWidth] = React.useState<DialogProps["maxWidth"]>("sm");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
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
        <DialogContent>
          <Box
            noValidate
            component="form"
            sx={{
              display: "flex",
              flexDirection: "column",
              m: "auto",
              width: "100%",
            }}
          >
            <TextField id="outlined-basic" label="Tarefa" variant="outlined" />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DatePicker"]}>
                <DatePicker
                  label="Prazo"
                  slotProps={{ textField: { fullWidth: true } }}
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
          <Button>
            <SaveTaskButton />
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};
