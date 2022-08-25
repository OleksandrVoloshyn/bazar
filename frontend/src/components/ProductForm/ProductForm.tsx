import {FC, useEffect} from "react"
import {useAppDispatch, useAppSelector} from "../../hook";
import {productActions} from "../../redux";
import {useForm} from "react-hook-form";
import {UpdateProductImage} from "../UpdateProductImage/UpdateProductImage";

interface IProps {
    productIdForUpdate?: string,
    setProductIdForUpdate?: CallableFunction
}

const ProductForm: FC<IProps> = ({productIdForUpdate, setProductIdForUpdate}) => {
    const {brands, categories, chosenProduct} = useAppSelector(({productReducer}) => productReducer);
    const dispatch = useAppDispatch();
    const {register, handleSubmit, setValue} = useForm();

    useEffect(() => {
        dispatch(productActions.getBrands())
        dispatch(productActions.getCategories())
        if (productIdForUpdate) {
            dispatch(productActions.getById({pk: productIdForUpdate}))

        }
    }, [dispatch, productIdForUpdate, setValue])

    useEffect(() => {
        if (chosenProduct && productIdForUpdate) {
            setValue('title', chosenProduct.title)
            setValue('description', chosenProduct.description)
            setValue('price', chosenProduct.price)
            setValue('color', chosenProduct.color)
            setValue('size', chosenProduct.size)
            setValue('gender', chosenProduct.gender)
            setValue('brand', chosenProduct.brand.name)
            setValue('category', chosenProduct.category.title)
        }
    }, [setValue, chosenProduct, productIdForUpdate])

    const submit = async (product: any) => {
        if (productIdForUpdate && chosenProduct) {
            product['id'] = productIdForUpdate
            console.log(product)
            await dispatch(productActions.update(product))
            if (setProductIdForUpdate) {
                setProductIdForUpdate('')
            }
        } else {
            console.log(product, 'create')
            dispatch(productActions.create({product}))
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit(submit)}>
                <div><label>Title: <input type="text" {...register('title')}/></label></div>
                <div><label>Description: <textarea maxLength={1000} {...register('description')}/></label></div>
                <div><label>Price: <input type="number" {...register('price', {valueAsNumber: true})}/></label></div>
                <div><label>Color: <input type="text" {...register('color')}/></label></div>

                <div><label>Size:
                    <select {...register('size')}>
                        <option></option>
                        <option value="S">S</option>
                        <option value="M">M</option>
                        <option value="L">L</option>
                        <option value="XL">XL</option>
                    </select>
                </label></div>

                <div>
                    <label>Gender:
                        <select {...register('gender')}>
                            <option></option>
                            <option value="Male">Man</option>
                            <option value="Female">Woman</option>
                        </select>
                    </label>
                </div>

                <div>
                    <label>Brand:
                        <select {...register('brand')}>
                            <option></option>
                            {brands && brands.map(brand => <option key={brand.id}
                                                                   value={brand.name}>{brand.name}</option>)}
                        </select>
                    </label>
                </div>

                <div>
                    <label>Category:
                        <select {...register('category')}>
                            <option></option>
                            {categories && categories.map(category => <option key={category.id}
                                                                              value={category.title}>{category.title}</option>)}
                        </select>
                    </label>
                </div>
                {(chosenProduct && productIdForUpdate)
                    ? <UpdateProductImage images={chosenProduct.images} productId={chosenProduct.id}/>
                    : <div><label>Images: <input type="file" multiple {...register('images')}/></label></div>
                }
                <button>{(productIdForUpdate && chosenProduct) ? 'update' : 'create'}</button>
            </form>
        </div>
    );
};

export {ProductForm};