import {FC} from "react"
import {ProductForm} from "../../../components";
import {useParams} from "react-router-dom";

const UpdateProductPage: FC = () => {
    const {pk} = useParams<string>();
    return (
        <div>
            UpdateProductPage
            <ProductForm idForUpdate={pk}/>
        </div>
    );
};

export {UpdateProductPage};