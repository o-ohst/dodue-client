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
                <ListItem taskInfo={task.taskInfo}></ListItem>
            ))}
        </div>
        
    )
}


export default List;