import { ListItemButton, ListItemText } from "@mui/material";
import type { Task } from "../Store/tasks/tasksReducer";
import { useNavigate } from "react-router-dom";

export default function TaskButton({ data, id }: { data: Task, id: number }) {
  let navigate = useNavigate()
  return (
    <ListItemButton onClick={()=>navigate("/task/" + data.id)}>
      <ListItemText primary={id + 1} sx={{flexGrow: 0, minWidth: "2rem"}}/>
      <ListItemText primary={data.title} secondary={data.content} />
      <ListItemText
        primary={new Date(data.datetime).toLocaleDateString()}
        secondary={new Date(data.datetime).toLocaleTimeString()}
        sx={{
          flexGrow: 0
        }}
      />
    </ListItemButton>
  )
}
