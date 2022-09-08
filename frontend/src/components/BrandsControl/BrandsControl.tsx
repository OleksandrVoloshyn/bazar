import {FC, useState} from "react"
import {BsChevronDown, BsChevronUp} from "react-icons/bs";
import {SubmitHandler, useForm} from "react-hook-form";
import {joiResolver} from "@hookform/resolvers/joi";
import {BsFillPencilFill, BsTrash, BsBackspaceFill} from "react-icons/bs";

import {useAppDispatch, useAppSelector} from "../../hooks";
import {brandActions} from "../../redux";
import {IBrand} from "../../interfaces";
import {BrandValidator} from "../../validators";
import {InputError} from "../InputError/InputError";
import css from './BrandsControl.module.css'

const BrandsControl: FC = () => {
    const {brands} = useAppSelector(({brandReducer}) => brandReducer);
    const dispatch = useAppDispatch();
    const {register, handleSubmit, setValue, reset, formState: {errors}} = useForm<IBrand>({
        resolver: joiResolver(BrandValidator),
        mode: "onTouched"
    });

    const [isActive, setIsActive] = useState<boolean>(false);
    const [brandForUpdate, setBrandForUpdate] = useState<IBrand | null>(null)

    const brandSubmit: SubmitHandler<IBrand> = async (newBrand) => {
        newBrand.image?.length ? (newBrand.image = newBrand.image[0]) : (newBrand.image = '')
        if (brandForUpdate) {
            await dispatch(brandActions.updateBrand({newBrandData: newBrand, pk: brandForUpdate.id}))
            setBrandForUpdate(null)
        } else {
            await dispatch(brandActions.createBrand({brand: newBrand}))
        }
        reset()
    }

    const activate = async () => {
        setIsActive(prevState => !prevState)
        !isActive ? await dispatch(brandActions.getBrands()) : cancelUpdate()
    }

    const cancelUpdate = (): void => {
        setBrandForUpdate(null)
        reset()
    }

    const toUpdateBrand = (data: IBrand): void => {
        setBrandForUpdate(data)
        setValue('name', data.name)
        setValue('description', data.description)
    }

    const removeBrand = async (pk: string) => await dispatch(brandActions.removeBrand({pk}))

    return (
        <div className={css.wrap}>
            <div className={css.brand_header} onClick={activate}>
                <span>Brands</span>
                {isActive ? <BsChevronUp/> : <BsChevronDown/>}
            </div>

            {isActive &&
                <div>
                    <form onSubmit={handleSubmit(brandSubmit)} className={css.create_form}>
                        {brandForUpdate && <div className={css.cancel}><BsBackspaceFill onClick={cancelUpdate}/></div>}

                        <div className={css.input_line}>
                            <label>Brand Name: </label>
                            <input {...register('name')}/>
                        </div>
                        {errors.name?.message && <InputError errorMsg={errors.name.message}/>}

                        <div className={css.input_line}>
                            <label>Description: </label>
                            <textarea {...register('description')}/>
                        </div>
                        {errors.description?.message && <InputError errorMsg={errors.description.message}/>}

                        <div>
                            <label>Image: </label>
                            <input type="file" {...register('image')}/>
                            <div className={css.btn}>
                                <button>{brandForUpdate ? 'update' : 'create'}</button>
                            </div>
                        </div>
                    </form>
                    {brandForUpdate?.image &&
                        <div className={css.img_div}><img src={brandForUpdate.image} alt={brandForUpdate.name}/></div>}

                    {brands.map(brand => <div key={brand.id} className={css.icons}>{brand.name}
                        <BsFillPencilFill onClick={() => toUpdateBrand(brand)}/>
                        {brand.id !== brandForUpdate?.id && <BsTrash onClick={() => removeBrand(brand.id)}/>}
                    </div>)}
                </div>}
        </div>
    );
};

export {BrandsControl};