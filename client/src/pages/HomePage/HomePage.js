import { Component } from "react";
import { storeName } from "../../common/config/store.config";
import { createUrl } from "../../common/createUrl";

export default class HomePage extends Component{
    // constructor(props){
        // super(props);

        // this.state = [3];
    // }

    render(){
        return (
            <>
                <div>
                    <h2>Witaj w {storeName}</h2>
                    <p>Znajdź najlepsze produkty w atrakcyjnych cenach.</p>
                    
                        <a href={createUrl('/store')} class="">
                            <button className="btn btn-success">
                                Zobacz nasze produkty
                            </button>
                        </a>
                    
                </div>
            </>
        )
    }
}