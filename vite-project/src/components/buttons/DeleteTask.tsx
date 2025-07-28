import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import DeleteIcon from "@mui/icons-material/Delete";
import type { TransitionProps } from "@mui/material/transitions";
import { IconButton } from "@mui/material";
import type { IToDo } from "../../App";
import { api } from "../../services/api";
import toast from "react-hot-toast";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const AlertExclude = (props: {
  id: number;
  dadosTabela: IToDo[];
  dadosTabelaUnsave: IToDo[];
  setdadosTabelaUnsave: React.Dispatch<React.SetStateAction<IToDo[]>>;
}) => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = async () => {
    if (props.dadosTabela.find((a) => a.id === props.id) !== undefined) {
      try {
        await api.delete(`/todos/${props.id}`);
        sessionStorage.setItem("saveDelete", "true");
      } catch (e) {
        sessionStorage.setItem("saveFail", "true");
      }
    } else {
      const newArray = props.dadosTabelaUnsave.filter((a) => a.id !== props.id);
      props.setdadosTabelaUnsave(newArray);
      toast.success("Tarefa excluída com sucesso");
    }
  };

  return (
    <React.Fragment>
      <IconButton aria-label="delete" onClick={handleClickOpen}>
        <DeleteIcon />
      </IconButton>
      <Dialog
        open={open}
        slots={{
          transition: Transition,
        }}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Realmente deseja excluir essa tarefa?"}</DialogTitle>

        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={handleDelete}>Excluir</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};
