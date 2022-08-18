import {FC, useEffect} from "react"
import {useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../hook";
import {productActions} from "../../redux";

const ProductDetailPage: FC = () => {
    const {pk} = useParams<string>();
    const {chosenProduct} = useAppSelector(({productReducer}) => productReducer);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(productActions.getById(pk))
    }, [dispatch, pk])
    return (
        <div>
            {chosenProduct &&
                <div>
                    <div>title - {chosenProduct.title}</div>
                    <div>description - {chosenProduct.description}</div>
                    <div>price - {chosenProduct.price}</div>
                    <div>color - {chosenProduct.color}</div>
                    <div>size - {chosenProduct.size}</div>
                    <div>gender - {chosenProduct.gender}</div>
                    <div>created_at - {chosenProduct.created_at.slice(0, 10)}</div>
                    <div>category - {chosenProduct.category.title}</div>
                    <div>owner - {chosenProduct.owner.profile.name} {chosenProduct.owner.profile.surname}</div>
                    <div>brand - {chosenProduct.brand.name}</div>
                    {/*todo map comments images slider*/}
                    <div>comments
                        - {chosenProduct.comments[0].id}:{chosenProduct.comments[0].text}:{chosenProduct.comments[0].created_at}</div>
                </div>
            }
        </div>
    );
};

export {ProductDetailPage};