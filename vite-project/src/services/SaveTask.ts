import toast from "react-hot-toast";
import type { IToDo } from "../App";
import { api } from "./api";

export const salvarTask = async (data: IToDo) => {
  data.id = undefined;
  const response = await api.post("todos", data);
  console.log(response.data);
  return toast.success("Tarefa criada com sucesso");
};
