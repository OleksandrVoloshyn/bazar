import {FC} from "react"
import {Products, Sidebar} from "../../components";

const HomePage: FC = () => {
    return (
        <div style={{'display': "flex"}}>
            <Sidebar/>
            <Products/>
        </div>
    );
};

export {HomePage};