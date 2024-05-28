import { Grid } from "react-loader-spinner";
 import css from './Loader.module.css'

export default function Loader() { 
    

    return (
        <div className={css.loader}>
            <Grid
            visible={true}
            height="60"
            width="60"
            color="blue"
            ariaLabel="grid-loading"
            radius="12.5"
            wrapperStyle={{}}
            wrapperClass="grid-wrapper"
            />
        </div>
    )
 }