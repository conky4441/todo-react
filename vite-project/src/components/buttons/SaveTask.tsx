import SaveAsIcon from "@mui/icons-material/SaveAs";
import { Button } from "@mui/material";
export const SaveTaskButton = () => {
  return (
    <Button
      variant="contained"
      disabled
      size="small"
      sx={{
        fontSize: 12,
        minWidth: "unset",
      }}
      startIcon={<SaveAsIcon sx={{ fontSize: 10 }} />}
    >
      Salvar
    </Button>
  );
};
