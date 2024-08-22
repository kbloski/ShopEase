
export default function ListItem(props){

    return(
        <a href="#" target="_blank" className="text-decoration-none text-body">
            <li className="row p-2 mt-2 bg-light justify-content-between">
                <div className="col-3 ">
                    <img src={props.pictureSrc} alt="Product picture"/>
                </div>
                <div className="col-4" >
                    <h2>{props.name}</h2>
                    <h4>{props.price} zł</h4>
                </div>
            </li>
        </a>
    )
} 