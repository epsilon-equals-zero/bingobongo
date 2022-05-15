import { CSSProperties, HTMLAttributes, useEffect, useState } from "react"
import { MdCancel, MdDone, MdEdit as EditIcon } from "react-icons/md";

export type EditableTextVariant = "h1" | "p"

export interface EditableTextProps extends HTMLAttributes<HTMLDivElement> {
    text: string,
    onTextChange?: (newText: string) => void,
    variant?: EditableTextVariant,
    style?: CSSProperties
}

function textComp(text: string, variant: EditableTextVariant) {
    if (variant == "h1") {
        return <h1>{text}</h1>
    } else { // variant == "p"
        return <p>{text}</p>
    }
} 

export function EditableText({text, onTextChange = (() => {}), variant = "p", ...htmlProps}: EditableTextProps) {
    const [editMode, setEditMode] = useState<boolean>(false)
    const [internalText, setInternalText] = useState<string>("")

    useEffect(() => {
        setInternalText(text)
    }, [text])

    return (
        <div {...htmlProps}>
            <div className={"relative"}>
                <div className={"absolute top-0, left-0 px-1 border border-transparent flex flex-row items-center gap-1 " + (editMode ? "invisible" : "")}>
                    {textComp(text, variant)}
                    <EditIcon onClick={() => setEditMode(true)} />
                </div>
                <div className={"relative top-0 left-0 flex flex-row items-center gap-1 " + (!editMode ? "invisible" : "")}>
                    <input className={"bg-transparent text-black outline-none border border-black rounded-md px-1 focus:bg-opacity-20 focus:bg-white "} type="text" value={internalText} onChange={e => setInternalText(e.target.value)} />
                    <MdDone onClick={() => {
                        onTextChange(internalText)
                        setEditMode(false)
                    }} />
                    <MdCancel onClick={() => {
                        setInternalText(text)
                        setEditMode(false)
                    }} />
                </div>
            </div>
        </div>
    )
}