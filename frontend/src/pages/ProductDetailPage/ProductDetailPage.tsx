import {FC, useEffect, useState} from "react"
import {useParams} from "react-router-dom";

import {useAppDispatch, useAppSelector} from "../../hooks";
import {productActions} from "../../redux";
import {AddComment, Comments, ImageSlider} from "../../components";
import css from './ProductDetailPage.module.css'

const ProductDetailPage: FC = () => {
    const {productReducer: {chosenProduct}, userReducer: {user}} = useAppSelector((state) => state)
    const [addComment, setAddComment] = useState<boolean>(false);
    const {pk} = useParams<string>();
    const dispatch = useAppDispatch();
    const isAuth = user || localStorage.getItem('access')

    useEffect(() => {
        if (pk) {
            dispatch(productActions.getProductById({pk}))
        }
        return () => {
            dispatch(productActions.removeChosenProductFromState())
        }
    }, [dispatch, pk])

    return (
        <div className={css.wrap}>
            {chosenProduct &&
                <div>
                    <div className={css.main}>
                        <div>{chosenProduct.images && <ImageSlider items={chosenProduct.images}/>}</div>
                        <div>
                            <div>title - {chosenProduct.title}</div>
                            <div>price - {chosenProduct.price}</div>
                            <div>color - {chosenProduct.color}</div>
                            <div>size - {chosenProduct.size}</div>
                            <div>gender - {chosenProduct.gender}</div>
                            <div>created_at - {chosenProduct.created_at.slice(0, 10)}</div>
                            {chosenProduct.category && <div>category - {chosenProduct.category.title}</div>}
                            <div>owner - {chosenProduct.owner.profile.name} {chosenProduct.owner.profile.surname}</div>
                            {chosenProduct.brand && <div>brand - {chosenProduct.brand.name}</div>}
                        </div>
                    </div>
                    {chosenProduct.description && <div>description - {chosenProduct.description}</div>}
                    {/*{user && (user.id !== chosenProduct.owner.id) &&*/}
                    {isAuth &&
                        <div onClick={e => setAddComment(prevState => !prevState)} className={css.add_comment_btn}>add
                            comments</div>}
                    {addComment && <AddComment pk={chosenProduct.id} setAddComment={setAddComment}/>}

                    {chosenProduct.comments && <Comments comments={chosenProduct.comments}/>}
                </div>
            }
        </div>
    );
};

export {ProductDetailPage};