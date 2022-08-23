import {FC} from "react"
import Carousel from "nuka-carousel";

import {IProductImage} from "../../interfaces";
import {notFoundImage} from '../../constants'

interface IProps {
    items: IProductImage[]
}

const ImageSlider: FC<IProps> = ({items}) => {
    console.log(items.length)
    return (
        <div>
            <Carousel>
                {items.length
                    ? items.map(item => <img src={item.image} alt="Product img" key={item.id}/>)
                    : <img src={notFoundImage} alt="not found images"/>
                }
            </Carousel>
        </div>
    );
};

export {ImageSlider};