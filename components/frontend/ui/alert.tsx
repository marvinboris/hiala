import { classNames } from "../../../app/helpers/utils"

type AlertProps = React.ComponentProps<'div'> & {
    color?: 'info' | 'danger' | 'success' | 'warning'
}

export default function Alert({ color = 'info', ...rest }: AlertProps) {
    return <div {...rest} className={classNames(
        color === 'info' ? "bg-cyan-100 text-cyan-600" :
            color === 'danger' ? "bg-rose-100 text-rose-600" :
                color === 'success' ? "bg-lime-100 text-lime-600" :
                    color === 'warning' ? "bg-yellow-100 text-yellow-600" : "",
        'py-2 px-4 font-medium rounded', rest.className || '')}>{rest.children}</div>
}