import colors from "../common/colors";

interface Props{
    name: string,
    color: number
}

function Label(props:Props) {
    return (
        <div className='drop-shadow-md rounded-full py-1 px-3 mr-2 w-fit' style={{background : colors[props.color]}}>
            <p className="drop-shadow-md text-lg text-white select-none">{props.name}</p>
        </div>
    );
}
export default Label;