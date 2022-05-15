import { MouseEventHandler } from "react";

import { Button } from "./Button";

export interface PopUpProps {
    open: boolean;
    title: string;
    primaryBtnText: string;
    onPrimaryBtnClick?: MouseEventHandler;
    secondaryBtnText?: string;
    onSecondaryBtnClick?: MouseEventHandler;
    onClickBackground?: MouseEventHandler;
}

export function PopUp({
    open,
    title,
    primaryBtnText,
    onPrimaryBtnClick,
    secondaryBtnText,
    onSecondaryBtnClick,
    onClickBackground,
    children,
}: React.PropsWithChildren<PopUpProps>) {
    return (
        <div
            className={
                "transition ease-in-out fixed top-0 left-0 w-screen h-screen z-40 " +
                (open ? "" : "hidden opacity-0 pointer-events-none")
            }
        >
            <div onClick={onClickBackground} className={"modal-bg bg-neutral-900 opacity-70 w-full h-full"}></div>
            <div
                className={
                    "modal fixed top-12 left-[8.33333%] w-10/12 md:left-1/4 md:w-1/2 xl:left-1/3 xl:w-1/3 overflow-x-hidden overflow-y-hidden text-black"
                }
            >
                <div
                    className={
                        "modal-paper relative flex flex-col w-full bg-white bg-clip-padding border-none shadow-lg rounded-md"
                    }
                >
                    <div
                        className={
                            "modal-header flex flex-shrink-0 items-center justify-between border-b px-4 py-3 border-gray-200"
                        }
                    >
                        <h1 className={"text-2xl font-medium leading-normal"}>{title}</h1>
                    </div>
                    <div className={"modal-body p-4"}>{children}</div>
                    <div
                        className={
                            "modal-footer flex flex-shrink-0 flex-row-reverse items-center justify-start px-4 py-3 border-t border-gray-200"
                        }
                    >
                        <Button variant={"contained"} text={primaryBtnText} onClick={onPrimaryBtnClick} />
                        {secondaryBtnText ? (
                            <Button variant={"outlined"} text={secondaryBtnText} onClick={onSecondaryBtnClick} />
                        ) : null}
                    </div>
                </div>
            </div>
        </div>
    );
}
