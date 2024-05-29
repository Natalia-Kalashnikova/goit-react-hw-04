import { Grid } from "react-loader-spinner";
import css from './Loader.module.css'

const Loader=()=> {     

    return (
        <div className={css.loader}>
            <Grid
            visible={true}
            height="60"
            width="60"
            color="#4e75ff"
            ariaLabel="grid-loading"
            radius="12.5"
            wrapperStyle={{}}
            wrapperClass="grid-wrapper"
            />
        </div>
    )
}
 
export default Loader;