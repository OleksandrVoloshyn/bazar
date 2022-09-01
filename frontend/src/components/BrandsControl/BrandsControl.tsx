import {FC, useState} from "react"
import {BsChevronDown, BsChevronUp} from "react-icons/bs";
import {SubmitHandler, useForm} from "react-hook-form";
import {BsFillPencilFill, BsTrash, BsBackspaceFill} from "react-icons/bs";

import {useAppDispatch, useAppSelector} from "../../hooks";
import {productActions} from "../../redux";
import css from './BrandsControl.module.css'
import {IBrand} from "../../interfaces";

const BrandsControl: FC = () => {
    const {brands} = useAppSelector(({productReducer}) => productReducer);
    const {register, handleSubmit, setValue, reset} = useForm<IBrand>();
    const dispatch = useAppDispatch();

    const [isActive, setIsActive] = useState<boolean>(false);
    const [brandForUpdate, setBrandForUpdate] = useState<IBrand | null>(null)

    const brandSubmit: SubmitHandler<IBrand> = async (newBrand) => {
        newBrand.image?.length ? (newBrand.image = newBrand.image[0]) : (newBrand.image = '')
        if (brandForUpdate) {
            await dispatch(productActions.updateBrand({newBrandData: newBrand, pk: brandForUpdate.id}))
            setBrandForUpdate(null)
        } else {
            await dispatch(productActions.createBrand({newBrand}))
        }
        reset()
    }

    const activate = async () => {
        setIsActive(prevState => !prevState)
        !isActive
            ? await dispatch(productActions.getBrands())
            : cancelUpdate()
    }

    const cancelUpdate = () => {
        setBrandForUpdate(null)
        reset()
    }

    const toUpdateBrand = (data: IBrand) => {
        setBrandForUpdate(data)
        setValue('name', data.name)
        setValue('description', data.description)
    }

    return (
        <div>
            <div className={css.brand_header} onClick={activate}>
                <span>Brands</span>
                {isActive ? <BsChevronUp/> : <BsChevronDown/>}
            </div>

            {isActive &&
                <div>
                    <form onSubmit={handleSubmit(brandSubmit)} className={css.create_form}>
                        <div className={css.create_form__line}><label>Brand Name: </label><input{...register('name')}/>
                        </div>
                        <div className={css.create_form__line}><label>Description: </label>
                            <input{...register('description')}/>
                        </div>
                        <div>
                            <label>Image: <input type="file" {...register('image')}/></label>
                            <button>{brandForUpdate ? 'update' : 'create'}</button>
                            {brandForUpdate && <BsBackspaceFill onClick={cancelUpdate}/>}
                            {brandForUpdate?.image && <div>
                                <img src={brandForUpdate.image} alt={brandForUpdate.name} width={'200px'}/>
                            </div>}
                        </div>
                    </form>

                    {brands.map(brand => <div key={brand.id}>{brand.name}
                        <BsFillPencilFill onClick={() => toUpdateBrand(brand)}/>
                        {brand.id !== brandForUpdate?.id &&
                            <BsTrash onClick={() => dispatch(productActions.removeBrand({pk: brand.id}))}/>}
                    </div>)}
                </div>}
        </div>
    );
};

export {BrandsControl};