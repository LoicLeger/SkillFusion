export interface ITextArea extends HTMLElement{
        value: string;
}

export interface IInput extends HTMLElement{
        value:string
}

export interface IModal extends HTMLElement{
        close:()=>void
        show:()=>void
}