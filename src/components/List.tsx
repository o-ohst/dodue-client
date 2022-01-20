import ListItem from "./ListItem";

interface Task {
    taskInfo: string,
    taskId: number,
}

interface Tasks{
    tasks: Task[],
}

function List(props:Tasks) {

    return (
        <div>
            {props.tasks.map(task => (
                <ListItem taskInfo={task.taskInfo} taskId={task.taskId}></ListItem>
            ))}
        </div>
        
    )
}


export default List;