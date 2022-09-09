import {FC} from "react"
import {useParams} from "react-router-dom";

import {ProductForm} from "../../components";

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