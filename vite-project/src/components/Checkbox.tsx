import Checkbox from "@mui/material/Checkbox";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

export const Checkboxes = () => {
  return (
    <div>
      <Checkbox {...label} defaultChecked />
    </div>
  );
};
