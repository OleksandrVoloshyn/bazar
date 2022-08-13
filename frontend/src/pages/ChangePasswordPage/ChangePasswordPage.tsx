import {FC, useEffect, useState} from "react"
import {useParams} from "react-router-dom";

import {ChangePasswordForm, Info} from "../../components";


const ChangePasswordPage: FC = () => {
    const [changed, setChanged] = useState<boolean>(false);
    const [isCrash, setIsCrash] = useState<boolean>(false)

    const {token} = useParams<string>();

    useEffect(() => {
    }, [changed, isCrash])

    return (
        <div>
            {changed
                ? isCrash
                    ? <Info data={'Шо за мамкин хацкер тут сидить'}/>
                    : <Info data={'your password was changed'}/>
                : <ChangePasswordForm setIsCrash={setIsCrash} setChanged={setChanged} token={token as string}/>
            }
        </div>
    );
};

export {ChangePasswordPage};