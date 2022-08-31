import {ElementRef, FC, useRef} from "react"
import {IProductImage} from "../../interfaces";
import {notFoundImage} from '../../constants'
import {useAppDispatch} from "../../hooks";
import {productActions} from "../../redux";

interface IProps {
    images?: IProductImage[],
    productId: string
}

const UpdateProductImage: FC<IProps> = ({images, productId}) => {
    const defaultImageValue = [{image: notFoundImage, id: '-1'} as IProductImage]
    const imagesResult = images?.length ? images : defaultImageValue
    const dispatch = useAppDispatch();
    const newImage = useRef<any>();

    const addImage = () => {
        if (newImage.current.files[0]) {
            dispatch(productActions.addProductImage({productId, file: newImage.current.files[0]}))
        }
    }

    const removeProductImage = (pk: string) => {
        dispatch(productActions.removeProductImage({pk}))
    }
    return (
        <div>
            {imagesResult.map(item => <div key={item.id}><img src={item.image} alt='productImage'/>
                {(item.id !== '-1') && <span onClick={() => removeProductImage(item.id)}>X</span>}
            </div>)}
            <input type="file" name={'newImage'} ref={newImage}/>
            <div onClick={addImage}>add image</div>
        </div>
    );
};

export {UpdateProductImage};