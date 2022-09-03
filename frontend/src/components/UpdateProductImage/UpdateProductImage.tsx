import {FC, useRef} from "react"
import {BsPlusCircle, BsTrash} from 'react-icons/bs'

import {IProductImage} from "../../interfaces";
import {notFoundImage} from '../../constants'
import {useAppDispatch} from "../../hooks";
import {productActions} from "../../redux";
import css from './UpdateProductImage.module.css'

interface IProps {
    images?: IProductImage[],
    productId: string
}

const UpdateProductImage: FC<IProps> = ({images, productId}) => {
    const defaultImageValue = [{image: notFoundImage, id: ''} as IProductImage]
    const imagesResult = images?.length ? images : defaultImageValue
    const dispatch = useAppDispatch();
    const newImage = useRef<any>();

    const addImageToProduct = () => {
        if (newImage.current.files[0]) {
            dispatch(productActions.addImageToProduct({productId, file: newImage.current.files[0]}))
        }
    }

    return (
        <div>
            {imagesResult.map(item => <div key={item.id}>
                <img src={item.image} width={'100px'} alt='productImage'/>
                {item.id && <BsTrash className={css.cursor}
                                     onClick={() => dispatch(productActions.removeProductImage({pk: item.id}))}/>}
            </div>)}
            <input type="file" name={'newImage'} ref={newImage}/>
            <BsPlusCircle onClick={addImageToProduct} className={css.cursor}/>
        </div>
    );
};

export {UpdateProductImage};