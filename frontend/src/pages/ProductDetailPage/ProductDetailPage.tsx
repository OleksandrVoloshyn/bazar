import {FC, useEffect, useState} from "react"
import {useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../hook";
import {productActions} from "../../redux";
import {AddComment, Comments, ImageSlider} from "../../components";


const ProductDetailPage: FC = () => {
    const {chosenProduct} = useAppSelector(({productReducer}) => productReducer);
    const [addComment, setAddComment] = useState<boolean>(false);
    const {pk} = useParams<string>();
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (pk) {
            dispatch(productActions.getById({pk}))
        }
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
                    {chosenProduct.comments && <Comments comments={chosenProduct.comments}/>}
                    {chosenProduct.images && <ImageSlider items={chosenProduct.images}/>}
                    <div onClick={e => setAddComment(true)}>add comments</div>
                    {addComment && <AddComment pk={chosenProduct.id} setAddComment={setAddComment}/>}
                </div>
            }
        </div>
    );
};

export {ProductDetailPage};